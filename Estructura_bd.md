# Estructura de la Base de datos

- Las fechas tendran formato DD/MM/AAA

- Estados =  Inedito, Llamado, Reservado, Declinado, Revisado, Aprobado, Rechazado


- Tablas = Vehiculo, Propietario, Estado, Vehiculo_RTM
- Tabla Vehiculo= Columnas: placa, marca, linea, modelo, clase
- Tabla Propietario= Columnas: documento, tipo_documento, nombre, telefono1, telefono2
- Tabla Vehiculo_RTM= Columnas: id, vehiculo_placa, estado_id, inicio_rtm, fin_rtm,
- Tabla Estado= Columnas:id, nombre, descripcion 


- Clase de de ser tipo ENUM, con los valores:  Motocicleta, Automóvil, Campero, Motocarguero, Camioneta, Camión, Bus, Microbús, Tractocamión, Volqueta.
- modelo es CHAR(4) porque siempre es un año de 4 dígitos, es equivalente a año.
- placa es CHAR(6) porque siempre tiene exactamente 6 caracteres de combinacion alfanumérica.
- Un propietario puede tener multiples vehiculos
- Un vehiculo unicamente puede tener un propietario
- 
