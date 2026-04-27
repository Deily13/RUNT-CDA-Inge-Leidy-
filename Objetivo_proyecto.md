
El objetivo es craer un aplicativo web que funcione de manera local.
De esta manera la Ingeniera pueda gestionar las reviciones tecnicomecanicas del CDA donde este trabajando,
mediando un crud lo mas completo posible que le permita hacer consultas complejas, gestionar el estado de los diferentes vehiculos que ingresen al CDA
y generar un informe final.

El proyecto se pretende desarrollar haciendo uso de Spring, Springboot, el lenguaje de programación Java 
y como gestor de base de datos postgres, se desea usar la arquitectura de capas, para tema de seguridad y
autenticación de quiere usar JWT, de momento se plantea que el sistema unicamente tenga un solo usuario, 
por lo que no procederemos a considerar la creacion de roles y permisos de momento, pero se debe de 
desarrollar de manera que en caso que el sistema se expanda sea posible integrar estas caracteristicas.

El sistema debe de tener una interfaz amigable con el usuario de manera que sea intuitiva y 


Para mayor seguridad y haciendo uso de las buensas practicas se priorizara el uso de variables de entorno 
para datos que no deberian ser vistos ya que son sencibles como lo son: contraseñas, usuarios, puertos, host, nombre de la base de datos y tokens de acceso. 
