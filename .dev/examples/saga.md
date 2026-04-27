ok. te explico: 

- al sistema acceden 3 perfiles de usuario:
  - cliente 
  - empleado departamento booking (operador) 
  - empleado contabilidad (contable) 
- el flujo es el siguiente: 
  - el cliente hace una reserva, utilizando una UI 
  - el operador ve que hay una reserva, pero que no está pagada
  - el contable ve que hay un pago pendiente de cobro
- con el paso del tiempo, pueden pasar 2 cosas:
  - el cliente paga:
    - el contable recibe la confirmación del pago, y marca el pago como ok
    - la reserva se actualiza con el estado "cobrado"
    - la reserva se manda al hotel
    - el operador ve que la reserva está ok, y mandada al proveedor
  - el cliente no paga:
    - al cabo de un tiempo determinado, el pago se marca como "expirado"
    - la reserva se cancela
    - el operador ve la reserva como cancelada