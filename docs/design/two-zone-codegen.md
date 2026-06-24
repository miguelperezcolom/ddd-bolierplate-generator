# Dos zonas: código generado (bloqueado) vs. implementación del desarrollador

> Estado: **implementado y cerrado** (Fases 1-3 + doc). El módulo `{service}-custom`, la protección
> por manifest y los seis hooks de lógica de negocio —**invariantes** (create+update),
> **operaciones de agregado**, **pasos custom de saga**, **pasos custom de use case**,
> **lógica de business rules** y **parte custom de model mappings**— están en
> producción y verificados por el e2e. Ver §8.
> Relacionado: [`flows-intent-layer.md`](./flows-intent-layer.md).

## 1. El problema

El generador hoy hace `createFile` → **sobrescribe todos los ficheros en cada
regeneración**. No hay modos `NEVER`/`IF_CHANGED` (la tabla "Overwrite behaviour" de la
doc es aspiracional). Pero los huecos de negocio (cuerpos de invariantes, pasos de use
case/saga, handlers de proyección, mapeos de gateway) se generan **como `// TODO` dentro de
ficheros regenerables**. Resultado: rellenas la lógica → cambias el modelo → **regeneras →
se borra tu lógica**. El ciclo iterativo —que es el caso de uso real— pierde el trabajo humano.

## 2. El objetivo

Que se cumpla siempre el invariante: **"puedo regenerar cuantas veces quiera y solo cambia
lo estructural; mi lógica de negocio nunca se toca"**.

## 3. La arquitectura: dos zonas

| Zona | Quién la posee | Regeneración | Dónde vive |
|---|---|---|---|
| **Generada** | Modux | Se **sobrescribe siempre**; protegida por hash | módulos estructurales (`domain`, `application`, `infra`, `app`…) |
| **Custom** | El desarrollador | Se **anda una sola vez** (scaffold); nunca se sobrescribe | un módulo aparte `{service}-custom` |

- El código generado **no contiene `// TODO` de lógica**: cada hueco de negocio se convierte
  en un **hook** = un método de una **interfaz** (puerto) declarada en la zona generada.
- El módulo **custom** contiene una **implementación por defecto** de cada hook (stub editable)
  que el desarrollador rellena. Spring la descubre como bean (mismo base package, en el classpath
  de la app).
- En regeneración: la zona generada se reescribe entera; en la zona custom **se crean los hooks
  nuevos que falten** (p.ej. un agregado nuevo) pero **nunca se tocan los existentes**.

```
{service}/
├── {module}/                 # GENERADO (bloqueado): aggregates, use cases, infra, puertos (hooks)
├── {service}-custom/         # CUSTOM (del dev): implementaciones por defecto de los hooks
└── {service}-app/            # GENERADO: arranque; depende de ambos
```

## 4. Hooks y contexto

Un **hook** es la firma de un hueco de negocio. Sus métodos reciben un **contexto** que da acceso
controlado al estado necesario — empezando por **el interior del agregado**.

Ejemplo (piloto, invariantes):

```java
// zona GENERADA — puerto
public interface ReservaInvariants {
    void check(ReservaContext ctx);   // lanza si se viola un invariante
}
// zona GENERADA — contexto (acceso de lectura al agregado)
public record ReservaContext(Reserva reserva) { /* + repos/servicios según haga falta */ }

// zona CUSTOM — implementación por defecto (editable, nunca regenerada)
@Component
class DefaultReservaInvariants implements ReservaInvariants {
    public void check(ReservaContext ctx) {
        // TODO: el desarrollador implementa los invariantes de Reserva
    }
}
```

El **use case generado** (bean, bloqueado) invoca el hook tras mutar el agregado:
`reservaInvariants.check(new ReservaContext(reserva));`. (Los agregados son POJOs creados con
`of`/`load`, no beans; por eso el enforcement se cablea en la capa de use case, que sí es bean.)

Hooks previstos (cada uno = interfaz en generado + impl por defecto en custom):

| Hueco de negocio actual (`// TODO`) | Hook |
|---|---|
| Cuerpo de invariantes del agregado | `{Aggregate}Invariants.check(ctx)` |
| Precondición / cuerpo de operación | `{Aggregate}Operations` (método por operación) |
| Pasos de use case sin lógica derivable | `{UseCase}Logic` |
| Pasos de saga | `{Saga}Steps` |
| Handlers de proyección | `{Projection}Handler` |
| Mapeo/efecto del cuerpo de gateway | (ya es impl; puede quedar como hook custom) |

El **contexto** crece según el hook: invariantes → el agregado; use case → input + repos/gateways;
saga → variables del proceso; proyección → el evento + el read model.

## 5. Protección de la zona generada (hash)

Cada fichero generado lleva una cabecera con un **hash de su contenido**:

```java
// modux:generated v1 sha256=ab12…  — DO NOT EDIT. Implement business logic in {service}-custom.
```

- En regeneración, antes de sobrescribir, si el fichero existe y su hash **no coincide** con el de
  la cabecera (fue editado a mano), se **avisa** (y se sobrescribe, recuperando el estado generado).
  Opción configurable: fallar en vez de avisar.
- Se mantiene un **manifest** (`.modux/generated-manifest.json`) con la lista de ficheros generados
  y su hash, para detectar también ficheros generados **borrados** o renombrados.
- Los ficheros del módulo **custom no llevan hash** y nunca se validan: son del desarrollador.

## 6. Semántica de regeneración

1. Generar zona generada → sobrescribir siempre; escribir hash + manifest.
2. Scaffold zona custom → por cada hook, si **no existe** su impl por defecto, crearla; si existe,
   **no tocarla**.
3. Avisar de ficheros generados manipulados (hash mismatch) y de hooks huérfanos (impl custom cuyo
   puerto ya no existe en el modelo).

## 7. Decisiones tomadas

1. **Módulo custom único por servicio** (`{service}-custom`), no por agregado — menos módulos,
   un solo sitio donde mirar. (Revisable a per-módulo si crece.)
2. **Impl por defecto generada (stub), no interfaz a medias** — el proyecto compila y arranca de
   día cero; el dev rellena cuerpos, no crea ficheros.
3. **Enforcement de invariantes en la capa de use case**, no dentro del agregado POJO.
4. **El contexto empieza por el agregado** (con sus getters) y se amplía por hook según necesidad.
5. **Hash por fichero + manifest**; en mismatch, avisar y regenerar (no fallar por defecto).

## 8. Plan por fases

1. **Fase 0 — este RFC.**
2. **Fase 1 — Infra de dos zonas + piloto invariantes.** Generar el módulo `{service}-custom`
   cableado; mover invariantes a `{Aggregate}Invariants` + `{Aggregate}Context` (generado) e impl
   por defecto (custom, never-overwrite); cabecera de hash en ficheros generados. Verificar con el
   e2e (compila + arranca; el módulo custom existe y la app depende de él).
3. **Fase 2 — Resto de hooks** (operaciones, use cases, sagas, proyecciones), uno a uno.
4. **Fase 3 — Manifest + validación de tamper** (aviso de generado editado / hook huérfano).
5. **Fase 4 — Doc**: reemplazar la tabla "Overwrite behaviour" por el modelo de dos zonas.
