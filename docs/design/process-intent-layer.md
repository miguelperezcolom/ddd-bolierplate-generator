# Capa de intención: `processes`

> Estado: **implementado** (v1). Sigue el mismo principio que `flows` (ver
> `flows-intent-layer.md`): declarar la intención, inferir el mecanismo.

## 1. El problema

`flows` declara una arista (evento → reacción). Pero un sistema de información empresarial
se organiza en **procesos de negocio** completos: order-to-cash, el check-in de principio a
fin. Un proceso dura horas o días, mezcla pasos automáticos con **pasos humanos** (alguien
tiene que verificar la documentación), tiene **plazos** con escalado, y compensación si algo
falla a mitad.

Hoy eso se cablea a mano: una saga + subscriptions + triggers programados + un read model
de tareas + eventos de proceso. Seis piezas para una intención — el mismo problema que
motivó `flows`, un peldaño más arriba.

## 2. El concepto

```yaml
processes:
  - name: CheckIn
    when: Reservas.Reserva ReservaCreada     # triggerAggregateId + triggerEvent
    owner: FrontOffice                        # bounded context que orquesta
    sla: P1D                                  # SLA extremo a extremo (ISO-8601)
    steps:
      - name: VerificarDocumentacion
        type: HUMAN
        role: recepcionista                   # a qué worklist llega la tarea
        deadline: PT2H                        # plazo del paso
        escalationRole: jefeRecepcion         # a quién escala si vence
      - name: AsignarHabitacion
        type: AUTOMATED
        useCase: uc-asignarHabitacion
        compensation: uc-liberarHabitacion    # cómo deshacerlo si el proceso falla después
      - name: CobrarDeposito
        type: AUTOMATED
        useCase: uc-cobrarDeposito
    onCompletion: CheckInCompleted            # evento publicado al terminar (default <Name>Completed)
```

## 3. Qué se infiere (`ProcessExpander`)

| Pieza | Convención |
|---|---|
| Subscription | consume el evento disparador (topic `<proyecto>.<servicio>.<evento>`), idempotente + DLQ, acción `StartSaga` |
| Saga | paso AUTOMATED → `CallUseCase` (+ paso de compensación enlazado por `compensatingStepId`); paso HUMAN → paso de espera (`await:<paso>`); timeout = SLA |
| Worklist | si hay pasos HUMAN: Model `<Name>Task` (taskId, stepId, assigneeRole, status, dueAt…) + ReadModel `<Name>Tasks` en el contexto owner |
| Deadline watch | un ScheduledTrigger por paso con `deadline`, que vigila tareas vencidas y escala |
| Evento de fin | DomainEvent `<Name>Completed` publicado como integration event |

## 4. Validación (linter)

- `process-human-role` (WARNING): paso HUMAN sin rol — la tarea no llega a ninguna bandeja.
- `process-deadline-escalation` (INFO): plazo sin rol de escalado.
- La integridad referencial cubre useCaseIds/aggregateIds colgantes.

## 5. Pendiente (v2)

- Generación runtime completa del ciclo de tareas humanas (crear tarea al llegar al paso,
  evento `TaskCompleted` reanudando la saga). La v1 genera las piezas estructurales; el
  motor de tareas es trabajo del generador de código.
- Gateways como pasos (`type: EXTERNAL` llamando a un gateway con circuit breaker).
- Bifurcaciones (`when`/`if` por paso) y paralelismo (`parallel: [...]`).
- UI de seguimiento de instancias del proceso (dónde está cada expediente).
