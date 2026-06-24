# Especificación — Check-in de huéspedes en un hotel

## Propósito

El sistema gestiona el check-in de huéspedes en un hotel.

## Actores

- **Recepcionista** — personal de recepción que atiende el check-in.
- **Jefe de Recepción** — responsable de la recepción.

El sistema lo usan directamente los actores de **recepción**. El resto del personal de
la empresa no opera el módulo de recepción, sino que **alimenta otras bases de datos**
que lo nutren de información.

## Contexto / arquitectura

El módulo de recepción se llama **frontoffice**. Es un consumidor: se apoya en datos que
otros módulos/áreas de la empresa van alimentando en sus propias bases de datos y que
contribuyen al frontoffice.

### Bounded contexts

El sistema se compone de varios bounded contexts:

| Bounded context | Responsabilidad |
|---|---|
| **frontoffice** | Recepción / check-in de huéspedes (módulo que operan los actores). |
| **reservas** | Gestión de reservas. |
| **producción** | Cargos al cliente. |
| **folios** | Cuenta del huésped (folio): cargos + anticipos/pagos → saldo. |
| **facturación** | Datos de facturación de la reserva (datos de empresa para la factura). |
| **pagos** | Cobros / pagos *(alcance por concretar tras separar folios)*. |
| **housekeeping** | Limpieza y estado de habitaciones. |
| **servicio técnico** | Averías / mantenimiento. |
| **rack** | Estado de **ocupación** de las habitaciones (libre / ocupada). |
| **master data** | Datos maestros. |
| **cardex** | Almacena y gestiona los datos del cliente/pasajero. |

## Agregados por bounded context

### master data
- **Hotel** — un hotel. *(campos por detallar)*
- **Habitación** — catálogo de habitaciones físicas. Las habitaciones son **por hotel**.

  | Campo | Tipo |
  |---|---|
  | numero | string |
  | camasIndividuales | integer |
  | camasDobles | integer |
  | hotel | ref → **Hotel** (master data) |

  - **Evento**: al **crear una `Habitación`** en master data se publica **`HabitacionCreada`**.
    En base a ese evento, **se crean las habitaciones en el resto de módulos** que tienen
    su propio agregado `Habitación`: **rack**, **housekeeping** y **servicio técnico**.
    - Modux: **DomainEvent** `HabitacionCreada` (master data) → **IntegrationEvent** →
      **Subscription** en rack, housekeeping y servicio técnico (⭐ **fan-out**: 1 → 3 consumidores).

- **Agencia**
- **TipoRégimen** (tipo de régimen, p.ej. alojamiento, media pensión…)
- **TipoHabitación** (tipo de habitación)
- **País** (`{ codigo, nombre }`)
- **TipoDocumento** (`{ codigo, nombre }`)
- **Nacionalidad** (`{ codigo, nombre }`)
- **Idioma** (`{ codigo, nombre }`)
- **Divisa** (`{ codigo, nombre }`)
- **TipoTarjeta** (`{ codigo, nombre }`)
- **TipoRiuClass** (`{ codigo, nombre }`)
- **FormaPago** (`{ codigo, nombre }`)

> Los catálogos `{ codigo, nombre }` (País, TipoDocumento, Nacionalidad, Idioma) son
> agregados de master data; otros contextos (p.ej. cardex) los **referencian** por código.

### cardex
- **Cardex** — datos del cliente/pasajero.

  | Campo | Tipo |
  |---|---|
  | apellidos | string |
  | nombre | string |
  | email | string |
  | dirección | string |
  | población | string |
  | cp | string |
  | provincia | string |
  | nºRiuClass | string |
  | fechaNacimiento | date |
  | sexo | enum `Sexo` |
  | ciudadNacimiento | string |
  | paisResidencia | ref → **País** (master data) |
  | tipoDocumento | ref → **TipoDocumento** (master data) |
  | nºDocumento | string |
  | expedido | date (fecha de expedición) |
  | expira | date |
  | teléfono | string |
  | fax | string |
  | acompañante | bool (check) |
  | cardexProvisional | bool (check) |
  | aceptaPublicidad | enum `AceptaPublicidad` (P, N) |
  | nacionalidad | ref → **Nacionalidad** (master data) |
  | idioma | ref → **Idioma** (master data) |

  Enums del Cardex:
  - `Sexo`: **H**, **M**
  - `AceptaPublicidad`: **P**, **N**

### frontoffice
El módulo de recepción gestiona **estancias**.

- **Estancia** — una estancia, que **se corresponde con una línea de reserva**
  (una habitación de la reserva).

  | Campo | Tipo |
  |---|---|
  | líneaReserva | ref → **Habitación reservada** (línea de la Reserva, reservas) |
  | habitaciónAsignada | ref → **Habitación** (master data) |
  | estado | enum `EstadoEstancia` (`PENDIENTE`, `CHECK_IN`; resto de valores por definir) |
  | clienteEsperando | bool — el cliente ha llegado y espera en recepción |
  | checkinCompletado | bool — si se ha completado el check-in |

  > **A decidir**: `estado` podría **absorber** a `clienteEsperando`/`checkinCompletado`
  > (p.ej. estados Esperando → CheckIn → Confirmada…) en lugar de convivir con ellos.
  > De momento se mantienen los tres; lo consolidamos cuando definas los valores del enum.

  > Relación: cada `Estancia` (frontoffice) ↔ una **Habitación reservada** (línea) de
  > la `Reserva` (reservas).

- **Suscripción**: frontoffice **escucha `ReservaCreada`/`ReservaModificada`** (publicados por
  **reservas**) y **crea/actualiza una `Estancia` por cada línea/habitación** de la reserva.
  - Modux: **Subscription** + **UseCase** que crea/actualiza las estancias.
  - ⭐ Flujo **IntegrationEvent + Subscription** (**reservas → frontoffice**).
    Así se alimenta el frontoffice (era el "PENDIENTE" del contexto inicial).

- **HistorialCliente** — historial/perfil del cliente (vive en frontoffice).

  | Campo | Tipo |
  |---|---|
  | tipoRiuClass | ref → **TipoRiuClass** (master data) |
  | ultimoHotel | ref → **Hotel** (master data) |
  | preferencias | string (texto largo) |
  | rpc | *Riu Partner Club (tipo ??)* |
  | repetido | integer |
  | tipoCliente | enum `TipoCliente` (ej. VIP) |
  | nºAtencionesHabitacion | integer |
  | ultimaHabitacion | integer |

### reservas
- **Reserva** — la reserva. Estructura anidada:
  - tiene una colección de **habitaciones** (líneas de habitación de la reserva),
  - y cada habitación tiene una colección de **Pax** (huéspedes).

  ```
  Reserva
   └── Habitaciones (colección)
        └── Pax (colección)
  ```

  **Reserva (cabecera):**

  | Campo | Tipo |
  |---|---|
  | agencia | ref → **Agencia** (master data) |
  | fechaLlegada | date |
  | noches | integer |
  | fechaSalida | date |
  | regimenAlimenticio | ref → **TipoRégimen** (master data) |
  | adultos | integer |
  | niños | integer |
  | bebes | integer |
  | hotel | ref → **Hotel** (master data) |
  | tipoCobro | enum `TipoCobro` (PagoEnFront, Crédito, …) |
  | terceros | bool (check) — *significado ??* |
  | pdteInt | bool (check) — *¿pendiente de integrar? ??* |
  | localizador | string |
  | requiere | *?? (tipo y significado por confirmar)* |
  | estado | enum `EstadoReserva` (CNF = Confirmada, …) |
  | exp | bool (check) — *significado ??* |
  | multiple | bool (check) — *significado ??* |
  | grupoRes | *?? (Grupo res.)* |
  | grupoOp | *?? (Grupo Op.)* |
  | garantizada | bool (check) |
  | refTarifa | string |
  | tipoTarifa | enum `TipoTarifa` (p.ej. B2C2) |

  **Habitación reservada** (línea de la reserva — entidad hija, colección):

  | Campo | Tipo |
  |---|---|
  | nºHabitación | string *(¿ref → Habitación de master data?)* |
  | espera | bool (check) |
  | tipoHabitaciónFísica | ref → **TipoHabitación** (master data) *(confirmar)* |
  | tipoHabitaciónContratada | ref → **TipoHabitación** (master data) *(confirmar)* |
  | upgrade | bool (check) |
  | deseos | string (texto largo) |
  | observacionesInternas | string (texto largo) |
  | avisos | string (texto largo) |

  **Pax** (huésped — entidad hija dentro de cada habitación reservada):

  | Campo | Tipo |
  |---|---|
  | apellidos | string |
  | nombre | string |
  | tipoPax | enum `TipoPax` (AD=Adulto, CH=Children, BB=Bebé) |
  | regimen | ref → **TipoRégimen** (master data) (ej. MP, PC, SA) |
  | nacionalidad | ref → **Nacionalidad** (master data) (ej. ES, US) |
  | estadoHabitación | enum `EstadoHabitación` (Limpia, Pendiente, …) |
  | tieneCardex | bool (check) |
  | int | bool (check) — *significado ?? (¿inter-hotel?)* |
  | aviso | bool (check) |
  | observacionesHotel | string |

- **Eventos**: al **crear o modificar una `Reserva`**, reservas publica **`ReservaCreada`** /
  **`ReservaModificada`** (con la reserva y sus líneas/habitaciones). Los consume **frontoffice**
  para **crear/actualizar** las estancias (ver §frontoffice).
  - Modux: **DomainEvent** `ReservaCreada`/`ReservaModificada` → **IntegrationEvent**.

### housekeeping
Las **limpiadoras** actualizan el estado de limpieza de las habitaciones.

- **Habitación** (de housekeeping — **distinto** del agregado `Habitación` de master data):
  guarda y permite cambiar el estado de limpieza.

  | Campo | Tipo |
  |---|---|
  | habitación | ref → **Habitación** (master data) |
  | estadoLimpieza | enum `EstadoHabitación` (Limpia, Pendiente, …) |
  | observaciones | string |

  - **Suscripción** (`HabitacionCreada`): al crear una habitación en master data,
    housekeeping **crea su registro** de limpieza para esa habitación.

### rack
Gestiona el **estado de ocupación** de las habitaciones **por día** (de dónde sale que una
habitación esté "libre"). El rack guarda el estado de **cada habitación para cada día**
(rejilla de disponibilidad).

- **Habitación** (de rack — otro agregado distinto): **un agregado por (habitación, día)**.

  | Campo | Tipo |
  |---|---|
  | habitación | ref → **Habitación** (master data) — identifica habitación **dentro de un hotel** |
  | fecha | date |
  | estadoOcupacion | enum `EstadoOcupacion` (Libre, Ocupada, …) |

  > Granularidad confirmada: **un agregado por (habitación, día)**.
  > **Identidad por hotel**: el nº de habitación **no** es único globalmente (puede existir la
  > 101 en el hotel 1 y la 101 en el hotel 2). La habitación se identifica por **(hotel, número)**;
  > la referencia a `Habitación` de master data debe llevar implícito el hotel.
  > ⇒ La clave efectiva del rack es **(hotel, número, fecha)**.

- **Suscripción** (`HabitacionCreada`): rack escucha el alta de habitaciones en master data
  y **crea su registro de ocupación** para esa habitación.
- **Suscripción** (`HabitacionPreasignada`): rack escucha el evento (publicado por
  frontoffice al pre-asignar) y **marca esa habitación como Ocupada en las fechas de la
  estancia** (de `fechaLlegada` a `fechaSalida`).
  - Modux: **Subscription** al evento de integración + **UseCase** que actualiza el rango de días.

### servicio técnico
El personal de **servicio técnico** gestiona observaciones de mantenimiento sobre la habitación.

- **Habitación** (de servicio técnico — otro agregado distinto):

  | Campo | Tipo |
  |---|---|
  | habitación | ref → **Habitación** (master data) |
  | observaciones | string |

  - **Suscripción** (`HabitacionCreada`): al crear una habitación en master data,
    servicio técnico **crea su registro** para esa habitación.

> Nota: existen **cuatro agregados `Habitación`** en bounded contexts distintos:
> master data (catálogo), rack (estado de ocupación), housekeeping (estado de limpieza)
> y servicio técnico (observaciones de mantenimiento). Mismo concepto de negocio, modelos
> separados por contexto — buen caso para validar que la generación los aísla por módulo.

### folios
Gestiona la **cuenta del huésped** (folio): cargos + anticipos/pagos → saldo.

- **Folio** — cuenta asociada a una reserva.

  | Campo | Tipo |
  |---|---|
  | reserva | ref → **Reserva** (reservas) |
  | limiteCredito | number |
  | anticipoEntregado | number |
  | saldoPendiente | number |
  | datosTarjeta.tipoTarjeta | ref → **TipoTarjeta** (master data) |
  | datosTarjeta.ultimos4Digitos | string |

  > `datosTarjeta` = value object `{ tipoTarjeta (ref → TipoTarjeta), ultimos4Digitos }`.
  > **Cardinalidad: un folio por reserva (1:1)** de momento.
  > Pendiente: ¿el folio **contiene líneas** (cargos + abonos) con saldo = cargos − anticipos,
  > o es solo un **resumen** de importes (los cargos viven en producción)? ¿importes con divisa?

- **Suscripción**: folios **escucha `PagoRegistrado`** (publicado por **pagos** al crear un
  `Pago`) y **actualiza el saldo** del folio (sube `anticipoEntregado`, baja `saldoPendiente`).
  - Modux: **Subscription** + **UseCase** que actualiza `Folio`.

### facturación
Datos de **facturación** de la reserva (los "Datos Empresa": razón social, CIF/NIF,
dirección fiscal… para emitir la factura).

- **DatosFacturacion** — datos fiscales asociados a una reserva.

  | Campo | Tipo |
  |---|---|
  | reserva | ref → **Reserva** (reservas) |
  | razonSocial | string |
  | cifNif | string |
  | direccionFiscal | string |
  | poblacion | string |
  | cp | string |
  | provincia | string |
  | pais | ref → **País** (master data) |
  | email | string |

### pagos
Registra los **pagos** de las reservas (un agregado por pago).

- **Pago** — un pago asociado a un **folio**.

  | Campo | Tipo |
  |---|---|
  | folio | ref → **Folio** (folios) |
  | importe | number |
  | divisa | ref → **Divisa** (master data) |
  | fecha | date |
  | formaPago | ref → **FormaPago** (master data) |

- **Evento**: al crear un `Pago`, pagos **publica `PagoRegistrado`** `{ folio, importe, divisa }`.
  - Modux: **DomainEvent** `PagoRegistrado` → **IntegrationEvent** (consumido por folios).

### producción
Guarda **cargos a la reserva** (líneas de cargo).

- **Cargo** — una línea de cargo asociada a una reserva.

  | Campo | Tipo |
  |---|---|
  | reserva | ref → **Reserva** (reservas) |
  | concepto | string |
  | importe | number |
  | divisa | ref → **Divisa** (master data) |
  | tipoPrecio | enum `TipoPrecio` (P=Pax, H=Habitación) |


## UI por módulo

**Todos los módulos exponen una UI**, con un **menú** para acceder a los **CRUD** de los
agregados que poseen. (En frontoffice, además, está la pantalla específica de check-in
descrita más abajo.)

Esas UIs se **agregan en una shell** (**UiShell**) que las reúne en una sola aplicación.

## Patrones de integración event-driven

Hay **dos patrones** para reaccionar a un evento publicado por otro bounded
context. La diferencia clave está en el **destino** de la escritura.

### Patrón A — Subscription + UseCase → Aggregate

El evento llega y dispara un **comando** sobre un agregado local. Pasa por el
lado de **escritura**: hay invariantes, identidad de agregado, posibilidad de
publicar nuevos eventos. El destino es un **Aggregate** con su propio ciclo de
vida.

```
DomainEvent (origen)
   → IntegrationEvent
      → Subscription (destino)
         → UseCase
            → Aggregate  ← creado/actualizado
```

**Cuándo:** el destino tiene **comandos propios**. P.ej. la `Habitación` de
rack tiene comando "marcar Ocupada" cuando llega `HabitacionPreasignada` — es
un agregado con comportamiento, no una vista.

#### Completar el payload cuando no basta

El payload del IntegrationEvent rara vez trae **toda** la información que el
agregado local necesita. El UseCase tiene dos palancas, combinables:

- **ModelMapping** (lado de mapeo): traduce los campos del payload al *shape*
  del command del UseCase (renombrados, transformaciones de tipo, valores
  derivados). Resuelve el mismatch nominal/estructural.
- **Gateway callback al BC origen** (lado de enriquecimiento): el UseCase llama
  vía **Gateway** a una API del BC publicador para obtener los campos que
  faltan. Resuelve el déficit de datos.

> **Ejemplo — `ReservaCreada` (reservas → frontoffice).** El payload publicado
> es `{ reserva, localizador, hotel }`, pero crear una `Estancia` requiere
> también la **Habitación reservada** y la lista de **Pax**. El UseCase
> `CrearEstancia` consume el evento, mapea la cabecera con un ModelMapping, y
> **llama vía Gateway** a `reservas.getReserva(reserva)` para obtener líneas
> y pax. La `Estancia` se materializa con los datos combinados.

### Patrón B — Projection → ReadModel

El evento llega y se **escribe directamente** en una tabla/documento
denormalizado. Sin comandos, sin invariantes. El destino es un **ReadModel**
que solo existe para ser leído por la UI vía QueryService.

```
DomainEvent (origen)
   → IntegrationEvent
      → Projection (destino)
         → ReadModel  ← escrito
            → QueryService → Page
```

**Cuándo:** el destino **no tiene comandos**, solo se lee. P.ej. el read model
del check-in que cruza cardex/producción/folios/… para alimentar la pantalla
— nadie ejecuta comandos contra él.

### Regla de decisión

Para cada flujo event-driven, pregunta: **¿el destino tiene comandos propios?**

- **Sí** → Patrón A (`Subscription + UseCase → Aggregate`)
- **No, solo se lee** → Patrón B (`Projection → ReadModel`)

> En modux, *Projection* se reserva para el Patrón B. Llamar "proyección" al
> Patrón A es informal y confunde dos patrones distintos.

## Integración entre módulos (resumen)

1. **Eventos de master data → crean entidades en otros módulos.** Al dar de alta datos
   maestros (p.ej. una `Habitación`), el evento correspondiente (`HabitacionCreada`) hace
   que **rack, housekeeping y servicio técnico** creen su propia habitación.
2. **Crear/modificar una `Reserva` → crea/actualiza las `Estancia`s.** El evento
   `ReservaCreada`/`ReservaModificada` (reservas) lo consume **frontoffice**, que crea o
   actualiza una estancia por cada línea/habitación.
3. **La pantalla de check-in (frontoffice) consume información de otros módulos.** Muestra
   datos de **producción** (cargos), **folios**, **pagos**, **servicio técnico**, **rack** y
   **housekeeping** (además de master data y cardex).

   **Mecanismo (decidido):** **Patrón B** (ver §"Patrones de integración event-driven").
   Frontoffice mantiene **ReadModels** propios alimentados por **Projections** que se
   suscriben a los eventos de esos módulos; la **Page** de check-in se sirve de ellos
   vía **QueryService**.

### Tabla de flujos event-driven

| Evento | Origen | Consumidor(es) | Patrón | Efecto |
|---|---|---|---|---|
| `HabitacionCreada` | master data | rack, housekeeping, servicio técnico | A | crean su `Habitación` (fan-out) |
| `ReservaCreada` / `ReservaModificada` | reservas | frontoffice | A | crea/actualiza `Estancia`s |
| `HabitacionPreasignada` | frontoffice | rack | A | ocupa los días del rango |
| `PagoRegistrado` | pagos | folios | A | actualiza el saldo del `Folio` |
| eventos de producción/folios/pagos/housekeeping/serviciotécnico/rack | varios | frontoffice | B | mantienen el read model de la pantalla de check-in |

## Proceso de check-in

Lo opera el **Recepcionista** desde una UI del frontoffice.

1. **Consultar llegadas**. El recepcionista accede a una **UI** donde consulta el
   **listado de llegadas** (huéspedes que llegan / estancias del día).
   - Modux: **Page** (UI del frontoffice) + **QueryService** con la consulta de llegadas.
   - **Filtros** del listado:
     - **texto** (busca en nombre y apellidos),
     - **fecha de llegada**,
     - **hotel**.
   - **Columnas** del listado: localizador, agencia, nombre y apellidos, hotel,
     habitación, estado.
   - Modelo de salida (read): `LlegadaResumen { localizador, agencia, nombre, apellidos,
     hotel, habitación, estado }`.

   > El listado es una **lectura que cruza varios agregados**: localizador/agencia/hotel/estado
   > de `Reserva`, nombre/apellidos de `Pax`, habitación de la línea/`Estancia`.
   > A modelar como **QueryService** cuya salida es `LlegadaResumen` (cardinalidad Page).

2. **Abrir detalle del check-in**. Al **seleccionar una llegada** del listado se abre el
   **detalle del check-in** (UI).
   - Modux: **Page** de detalle (navegación desde la fila seleccionada del listado).

### Detalle del check-in (composición de pantalla)

Pantalla compleja compuesta por varios paneles, cada uno ligado a un agregado/contexto.
A modelar con **Page + Components**. Los **botones** son acciones (casos de uso/operaciones).

> Los campos de cada panel ya están definidos en §"Agregados por bounded context";
> aquí se indica el **binding** (a qué agregado se liga) y se resaltan los elementos NUEVOS.

#### Columna izquierda
- **Información general de la reserva** → `Reserva` (cabecera). *(solo lectura)*
- **Check-in** → línea de reserva (**Habitación reservada**).
  - Botones: **Check in**, **Pre asignar**.
  - Campos: los de la Habitación reservada (nº habitación, espera, tipos físico/contratado,
    upgrade, deseos, observaciones internas, avisos).
- **Información detalle estancia** → tabla de **Pax** de la línea.
  - Botones: **Confirmar checkin**, **No show**, **Lector documento**, **Tarjeta welcome**,
    **Deshacer checkin**, **Código WIFI**.
- **Información cliente** → varias pestañas:
  - **Info Cardex** → `Cardex` (ligado al Pax). Botones: **Nuevo**, **Doc. id**, **Borrar Cardex**.
  - **Datos Empresa** → `DatosFacturacion` (módulo **facturación**), ligado a la `Reserva`.
  - **Datos tarjeta** → ligado a la `Reserva` *(¿o a FoliosAnticipos?)*.
  - **Histórico cliente** → ligado al Pax *(ver «Historial cliente» abajo)*.
  - **Preferencias** → ligado al Pax.

#### Columna derecha
- **Importes** → tabla de **Cargo** (producción): tipo habitación, precio estancia,
  moneda, P/H. Botones: **Confirmar**, **Habitaciones**.
- **Información habitación** → combina los **tres** agregados `Habitación`:
  nº + camas dobles/individuales (master data), estado + checkout + observaciones
  (housekeeping), averías (servicio técnico). *(buen caso de lectura cross-contexto)*
- **Historial cliente** → agregado **`HistorialCliente`** (frontoffice; ver §frontoffice).
- **Folios / Anticipos** → `FoliosAnticipos` (pagos): crédito cancelado (check),
  imprimir recibo (check), límite crédito, tipo tarjeta + 4 últimos dígitos,
  entrega a cuenta, saldo pendiente (importe + divisa). Botón: **Manual/Pinpad**.
  - <!-- NUEVO respecto a §pagos: creditoCancelado, imprimirRecibo. saldoPendiente lleva divisa. -->

#### Barra inferior (acciones globales)
Botones: Detalle, Editor, Estado reserva, Prev. Ocup, Recibo, Huéspedes,
Envío confirmación reserva, Auditoría reserva, New Key.

> **Nota de alcance**: la pantalla real tiene **muchos** botones/acciones. Para el PoC
> implementaremos solo el **núcleo del check-in** (pre-asignar, check-in, confirmar,
> deshacer); el resto queda documentado pero fuera del primer corte de generación.

### Acciones del check-in (casos de uso)

- **Check-in** (botón *Check in*): cambia el **estado de la `Estancia`** a `CHECK_IN`.
  - Modux: **UseCase** que opera sobre `Estancia` (operación que fija el estado).

  > Esto implica que `Estancia` tiene un campo **`estado`** (enum). Hasta ahora la
  > modelamos con dos booleanos (`clienteEsperando`, `checkinCompletado`). **A decidir**:
  > ¿sustituimos esos bool por un enum `EstadoEstancia` (p.ej. Esperando → CheckIn →
  > Confirmado…), o el "estado check-in" convive con ellos? Pendiente de tus próximos pasos.

- **Pre-asignar** (botón *Pre asignar*): abre una **pantalla de selección de habitación**
  que lista las habitaciones **del mismo tipo que la contratada**; al seleccionar una,
  **cambia la habitación asignada de la `Estancia`** (`habitaciónAsignada`).
  - Modux:
    - **QueryService**: habitaciones **del tipo contratado** (de la línea de reserva)
      y **solo las libres** (no ocupadas). El listado **muestra el estado de limpieza**
      de cada habitación.
    - Salida (read): `HabitacionDisponible { numero, tipo, estadoLimpieza }`.
    - **Page** de selección (diálogo).
    - **UseCase**: pre-asignar → fija `Estancia.habitaciónAsignada` con la seleccionada
      y **publica el evento `HabitacionPreasignada`**.

  **Integración (event-driven)** ⭐:
  - Al pre-asignar, frontoffice **publica** un evento de integración **`HabitacionPreasignada`**
    con payload `{ habitación, fechaLlegada, fechaSalida }` (las fechas de la estancia).
  - **rack lo consume** (Subscription) y marca esa habitación como **Ocupada** en todos los
    días del rango `[fechaLlegada, fechaSalida]`.
  - Modux: **DomainEvent** `HabitacionPreasignada` (frontoffice) → **IntegrationEvent**
    homónimo → **Subscription** en rack.

  > Este es el caso estrella del test: **IntegrationEvent + Subscription** entre dos módulos.

- **Deshacer check-in** (botón *Deshacer checkin*): cambia el **estado de la `Estancia`**
  a `PENDIENTE`.
  - Modux: **UseCase** sobre `Estancia` (fija `estado = PENDIENTE`).

- **Registrar pago a cuenta**: el recepcionista abre un **diálogo** (`importe`, `divisa`).
  Al registrarlo, se **crea un `Pago` en el módulo pagos**, lo que **lanza un evento** que
  llega a **folios**, que **actualiza el saldo** del folio.
  - Flujo:
    1. **pagos** crea un `Pago` (contra el `Folio`) → publica **`PagoRegistrado`**
       `{ folio, importe, divisa }`.
    2. **folios** lo consume (Subscription) y actualiza el saldo del `Folio`
       (sube `anticipoEntregado`, baja `saldoPendiente`).
  - Modux: **UseCase** crear Pago (pagos) → **DomainEvent/IntegrationEvent** `PagoRegistrado`
    → **Subscription** en folios + UseCase que actualiza el `Folio`.
  - ⭐ Segundo flujo **IntegrationEvent + Subscription** (**pagos → folios**).

  > A confirmar: ¿`saldoPendiente`/`anticipoEntregado` llevan divisa? ¿folios recalcula el
  > saldo o el importe ya viene aplicado en el evento?

    > "Libre" sale del agregado `Habitación` de **rack** (`estadoOcupacion = Libre`).
    > El estado de **limpieza** viene del agregado `Habitación` de **housekeeping**.
    > ⇒ La consulta de pre-asignación **cruza tres contextos**: master data (tipo),
    > rack (libre) y housekeeping (estado de limpieza).

## Plan de validación de esta especificación

Para verificar que esta especificación es completa y no ambigua se aplica un ciclo
de **dogfooding sobre modux**:

1. **Producir el modelo del sistema.** Un agente (Claude) lee únicamente este
   documento y produce el modelo del sistema en `.dev/data/model-driven-store.yaml`,
   conforme al esquema de modux (`.dev/data/model-driven-store-schema.json`).
   - Si el agente tiene que inventarse algo, preguntar o elegir arbitrariamente,
     eso es síntoma de **hueco** o **ambigüedad** en esta especificación → se
     anota y se corrige aquí.
2. **Generar el código.** Se ejecuta modux sobre el YAML resultante para generar
   el proyecto.
3. **Compilar y arrancar.** Se compila el proyecto generado y se levanta la app.
   Si arranca y los flujos descritos en §"Proceso de check-in" funcionan, el
   ciclo *spec → modelo → código → app* queda demostrado de extremo a extremo.

El ciclo cumple dos objetivos: **valida esta especificación** (hace explícitas
las ambigüedades) y **valida modux** (ejercita su pipeline sobre un caso real).

### Hallazgos del primer ciclo

Una primera versión del YAML modeló `LlegadasReadModel` con una `Projection`
consumiendo `ReservaCreada` directamente. Esto **no encaja** con la dicotomía
A/B: la consecuencia de `ReservaCreada` en frontoffice es la **creación de un
agregado `Estancia`** (Patrón A), no la escritura de un ReadModel. La ReadModel
de llegadas debe alimentarse de **eventos locales** del agregado `Estancia`
(`EstanciaCreada`, `EstanciaActualizada`), no del cross-BC.

Cadena correcta:

```
reservas: ReservaCreada (IntegrationEvent)
   → frontoffice.Subscription (cross-BC entry point)
      → action: CallUseCase → uc-crearEstancia
         → ModelMapping del payload + Gateway a reservas para completar líneas/pax
         → Estancia (agregado) emite EstanciaCreada (DomainEvent local)
            → frontoffice.LlegadasProjection consume EstanciaCreada (in-module)
               → LlegadasReadModel
```

Preserva la regla: **cross-BC siempre entra vía Subscription + UseCase →
Aggregate**; los **ReadModels se alimentan de eventos locales** (in-module).
Una Projection que consume un evento cross-BC directamente es síntoma de salto
de capa.

## Escenarios de aceptación

Escenarios que el sistema generado debe cumplir. Se añaden de forma incremental
y sirven a la vez como contrato adicional de la spec y como tests automatizables
(Cucumber) sobre el código que emite modux.

### E1 — Alta de habitación se propaga a rack, housekeeping y servicio técnico

**Dado** que el usuario opera la UI de **master data**,
**cuando** da de alta una `Habitación`,
**entonces**:

1. master data persiste la nueva `Habitación` y publica `HabitacionCreada` como
   **evento de integración**.
2. **rack**, **housekeeping** y **servicio técnico** consumen el evento (cada uno
   vía **Subscription + UseCase**) y **materializan en su propia BD** su
   correspondiente agregado `Habitación`.

Es el escenario estrella de **fan-out 1 → 3** anticipado en §master data.

> **Nota terminológica:** los `Habitación` de rack/housekeeping/servicio técnico
> son **agregados**, no ReadModels. Por tanto la materialización aquí **no** es
> una *Projection* (Projection se reserva para alimentar **ReadModels**, ver
> §"Integración entre módulos"); es **Subscription + UseCase → Aggregate**.

<!-- spec en construcción — dictada por el usuario, redactada incrementalmente -->
<!-- Cómo se alimenta el frontoffice: PARCIALMENTE resuelto — las estancias se crean por
     suscripción a `ReservaCreada` (reservas → frontoffice). PENDIENTE: cómo lee la pantalla
     de check-in los datos de master data / rack / housekeeping / cardex / producción / folios. -->

