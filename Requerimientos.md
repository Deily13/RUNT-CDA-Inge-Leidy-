# 📜 Reglas del Sistema – Gestor CDA

## 🔐 Acceso y Autenticación
- Solo el **ingeniero** puede ingresar al sistema.
- Se debe usar **JWT** para la autenticación al entrar al sistema.

---

## 📊 Gestión de Registros
- Debe permitir **crear, actualizar y eliminar registros**.
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
- Si los registros de un mes están en estado **Inédito** y la fecha cambia al mes siguiente, y no se encuentran en otro estado diferente, deben pasar automáticamente a **Vencido**.
- Si un registro está en estado **Reportado**, se debe registrar la fecha en el momento en que se reportó.
- Los registros cuyo **Fin_Vigencia_RTM** sea **2027** deben permanecer en estado **Actualizado**.

*(Se usará **cron** para las tareas automáticas basadas en parametros cronologicos.)*

---

## 📝 Mensajes Dinámicos
- Los mensajes deben mostrar:
  - `Fin_Vigencia_RTM`
  - `Placa` (en mayúsculas)
  - `Tipo de vehículo`
  - **Precio correspondiente** según el tipo de vehículo y su proveniencia.
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
  - `Categoría`
  - `Marca`
  - `Tipo_Cliente`
  - `Nombre`
  - `Documento`
  - `Teléfono`
  - `Descuento`

---

## 💰 Precios y Descuentos
- **Precio normal de la revisión técnico-mecánica:**
  - Vehículo particular: 320.000
  - Vehículo público: 317.500
  - Motocicleta: 220.000

- **Descuento por agendamiento previo:**
  - Carro: 295.000
  - Moto: 190.000
  - Equivale al **7.81 % de descuento**.

- **Descuento por vehículo remitido desde taller:**
  - Carro: 295.000
  - Moto: 190.000

---

## 🔍 Validación de Placas
- Antes de ingresar una nueva placa, se debe validar si ya existe en la base de datos.
  - Si **no existe**, se mostrará un mensaje y la vista para ingresar un nuevo registro.
  - Si **ya existe**, se mostrará un mensaje indicando que el registro existe y se preguntará si desea actualizarlo.

---

## 🧾 Nomenclatura y Campos
- Al ingresar el campo **Línea**, se debe guardar en la base de datos con la siguiente nomenclatura: `[CATEGORIA]linea`.

---

## 🧩 Formulario para Ingresar un Nuevo Registro

| Campo | Tipo                           | Restricciones |
|--------|--------------------------------|---------------|
| **Fecha inicio vigencia** | Selector de fecha (calendario) | No puede ser superior a la fecha actual. |
| **Fecha fin vigencia** | Se calcula automaticamente     | No puede ser inferior a la fecha actual. |
| **Placa** | Texto                          | Solo 6 caracteres alfanuméricos. Se guarda en mayúsculas. |
| **Documento** | Numérico                       | Solo valores numéricos. |
| **Tipo de documento** | Select                         | Opciones: *Cédula de ciudadanía* o *NIT*. |
| **Categoría** | Select                         | Solo una opción (tipo de vehículo). |
| **Marca** | Select con búsqueda            | Permite escribir para agilizar la selección. |
| **Línea** | Texto                          | Valores alfanuméricos, se guarda en mayúsculas. |
| **Modelo** | Select                         | Solo 4 caracteres numéricos, generado dinámicamente. |
| **Nombre del propietario** | Texto                          | Solo caracteres alfabéticos, se guarda en mayúsculas. |
| **Teléfono 1** | Numérico                       | Solo 10 caracteres. |
| **Teléfono 2** | Numérico                       | Solo 10 caracteres. |

---

## 📤 Formulario de Reporte Posterior
- Al finalizar la inserción de un nuevo registro, se debe mostrar un mensaje indicando que el registro se realizó correctamente y preguntar si el usuario desea **reportarlo**.
- Si el usuario acepta, se mostrará un formulario con el campo **Fecha de reporte**, el cual:
- Debe ser un **selector de fecha (calendario)**. 
- No puede ser superior a la fecha actual.
---
