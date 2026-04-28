# 📜 Reglas del Sistema – Gestor CDA

## 🔐 Acceso y Autenticación
- Solo el **ingeniere** puede ingresar al sistema.
- Se debe usar **JWT** para la autenticación al entrar al sistema.

---

## 📊 Gestión de Registros
- Debe permitir **crear y actualizar registros**.
- Debe permitir **filtrar registros por día, mes y año**.
- Debe permitir filtrar por **persona natural** (cédula de ciudadanía) o **empresa** (NIT).
- Se deben poder realizar **consultas múltiples simultáneas** (ejemplo: registros vencidos en abril).

---

## ⚙️ Estados de los Registros
- El **estado por defecto** de todos los registros de vehículos debe ser **Inédito**.
- Al cambiar de año, todos los registros con estado **Aprobado-Actualizado** deben pasar automáticamente a **Inédito**.
- Al actualizar un registro vencido:
  - `Inicio_Vigencia` = fecha de aprobación de la RTM.
  - `Fin_Vigencia` = exactamente 365 días después de `Inicio_Vigencia`.
- Si los registros de un mes están en estado **Inédito** y la fecha cambia al mes siguiente, y no se encuentran en estado **En trámite** u otro diferente, deben pasar automáticamente a **Vencido**.
- Si un registro está en estado **Reportado** se debe de registrar la fecha en el  momento en que se reporto.
- Los registros cuyo **Fin_Vigencia_RTM** sea **2027** deben permanecer en estado **Actualizado**.

*(Se usará **cron** para las tareas automáticas basadas en fechas y tiempos.)*

---

## 📝 Mensajes Dinámicos
- Los mensajes deben mostrar:
  - `Fin_Vigencia_RTM`
  - `Placa` (en mayúsculas)
  - `Tipo de vehículo` 
  - **Precio correspondiente** según el tipo de vehículo.
- El **precio** debe ser modificable por el ingeniero.
- Si un registro está en estado **Inédito** y su `Fin_Vigencia_RTM` es **inferior** a la fecha actual → mensaje: **“Venció”**.
- Si un registro está en estado **Inédito** y su `Fin_Vigencia_RTM` es **superior** a la fecha actual → mensaje: **“Vence”**.

---

## 📂 Documentación y Respaldo
- En caso de no contar con tiempo suficiente para ingresar el campo de la licencia de conducción, se debe permitir **subir la fotografía de la licencia** como respaldo temporal.
- Al realizar esta acción será **obligatorio ingresar también el número de teléfono del propietario**.
- Si no se proporciona el número de teléfono junto con la fotografía, el registro **no podrá ser guardado**.

---

## 📑 Reportes
- El sistema debe generar un informe en archivo **.xlsx** con los registros actualizados durante el mes seleccionado.
- El reporte debe contener las siguientes columnas:
  - `Fecha_Reporte`
  - `Fecha_Ingreso`
  - `Placa`
  - `Categoria`
  - `Marca`
  - `Tipo_Cliente`
  - `Nombre` 
  - `Documento`
  - `Teléfono`
  - `Descuento`  


- El valor del descuento puede variar de acuerdo a la procedencia del vehiculo, por ejemplo si el vehiculo es remitido de un taller 
se le da un descuento mas alto que si viene solito 

el precio normal de la revision tecnicomecanica es:

Vehículo particular:  320.000
Vehículo público:  317.500
Moto:  220.000

los precios de los vehiculos con  descuento si agendan antes de ir son:
Carro: 295.000                  
Moto: 190.000
lo que equivale al 7.81% de descuento

los precios de descuento cuando el vehiculo es remitido de un taller son:
Carro: 295.000                  
Moto: 190.000
 
Antes de ingresar una nueva placa se debe de hacer la validacion si la placa ya se encuentra en la base de datos

en caso tal de que no exista mostrara un mensaje y la vista para ingresar un nuevo registro

en caso tal de que si se mostrara un mensaje que dice que ya existe y pregunta si desea que sea actualizado


Al ingresar el campo linea se debe guardar en base de datos con la siguiente nomenclatura: [CATEGORIA]linea

### formullario para ingresar un nuevo registro:

fecha inicio vigencia: debe ser seleccionable en un calendario, la fecha no puede ser superior a la fecha actual

fecha fin vigencia : deber ser seleccionble en un calendario, la fecha no de ser infereior a la fechas actual

Placa: debe de ser un campo que unicamente acepte 6 caracteres alfanumericos, 
inpendendientemente de lo que escriba el usuario en la base de datos se debe guardar con mayusculas.

Documento: debe de ser un campo que incamente acepte valores numericos, input

Tipo de Documento: debe ser un select con las unicas dos opciones de cedula de ciudadania y Nit

Categoria: debe ser un select para seleccionar el tipo de vehiculo, unicamnete se puede selleccionar una opcion

Marca: debe ser un select de manera que tambien se pueda escribir la marca para agilizar la busqueda

Linea: debe de ser un campo que acepte vallores alfanumericos, independientemente de lo que esciba el usuario 
en base de datos se debe de guardar en mayusculas

Modelo:  debe ser un select que unicamente acepte 4 caracteres numericos, generado dinamicamente para que siempre este actualizado

Nombre de Propietario: Campo que unicamente debe permitir caracteres alfabeticos, en la base de datos debe de quedar guardado en mayusculas

Telefono 1: campo que unicamente debe aceptar 10 caracteres numericos

Telefono 2: campo que unicamente debe aceptar 10 caracteres numericos

