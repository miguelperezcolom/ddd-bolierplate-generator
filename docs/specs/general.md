para definir un sistema empresarial debemos poder soportar los siguientes flujos:

- un usuario busca/crea/modifica/elimina registros (de un agregado) desde la UI
- un usuario llama a un caso de uso desde la UI
- una operación en un agregado genera un evento que acaba generando una llamada a un caso de uso en el mismo o en otro agregado. Si debe llegar a otro bounded context, se debe generar un evento de integración que llegue al otro bounded context.
- los eventos de dominio deben pasar siempre por un outbox para garantizar que no perdemos datos
- debemos poder definir queryservices sobre los datos sin pasar por el agregado
- si necesitamos acceder a las query services, los gateways o a los casos de uso desde otro bounded context, de manera síncrona, debemos exponer una api (rest o grpc) y crear un gateway para acceder a ellas en el bounded context consumidor.
- debemos poder definir mcps que atacan a los casos de uso y a las queries y gateways
- si necesitamos datos de otro bounded context, también podemos crear proyeciones que materializan los datos de los eventos en read models (tablas o documentos) en nuestro bounded context

- un sistema empresarial debe tener un sistema de monitoreo y alertas
- un sistema empresarial debe tener un sistema de logs
- un sistema empresarial debe tener un sistema de métricas
- un sistema empresarial debe tener un sistema de cache
- un sistema empresarial debe tener un sistema de cache distribuido

- un sistema permite:
- guardar y recuperar datos
- mantener invariantes
- ejecutar acciones (casos de uso)
- las acciones deben ser idempotentes
- una acción puede tener efectos laterales (es decir, lanzar eventos que derivan en otras acciones)
- el sistema está compuesto por varios bounded contexts
- un bounded context puede importar datos de otro bounded context con proyecciones a read models
- un bounded context puede consumir datos de otro bounded context con query services
- para consumo síncrono un bounded context puede exponer una api (rest o grpc), un mcp o una UI para acceder a sus casos de uso, queries y gateways
- los casos de uso también pueden ser llamados de manera asíncrona, con eventos
- las transacciones se fijan a nivel de use case, y los eventos de dominio se guardan en un outbox en la misma transacción. Luego un relay se encarga de enviar los eventos al mismo bounded context
- los eventos de dominio pueden salir de un bounded context a travñes de eventos de integración. Para ello, creamos un consumidor de eventos de dominio dentro del mismo bounded context, que llama a un caso de uso que termina grabando un evento de integración en el outbox de integración. Luego otro relay lanza ese evento a un message broker
- cuando un flujo necesita de más de una transacción, se crea un workflow que se ejecuta en un workflow engine. El workflow incluye compensaciones si es necesario



- una forma de utilizar modux es crear un repositorio con un proyecto maven con un plugin para el generador, que lee la definición del sistema (en yaml, según el esquema de modux) y genera los proyectos/módulos/código en el mismo directorio local o como ramas de repositorios según esté configurado en el yaml.
