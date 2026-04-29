# Gestor CDA — Reglas del Sistema

> **Documento:** Especificación de Reglas de Negocio y Funcionales  
> **Versión:** 1.0  
> **Clasificación:** Uso interno · Confidencial

---


## 1. Acceso y Autenticación

El sistema restringe el acceso exclusivamente al ingeniero autorizado. La autenticación se gestiona mediante un mecanismo seguro de tokens.

| Campo | Detalle |
|---|---|
| **Usuario autorizado** | Ingeniero (único perfil de acceso) |
| **Método de autenticación** | JWT (JSON Web Token) |
| **Alcance** | Acceso total al sistema de gestión |

> **Nota:** El token JWT debe presentarse en cada solicitud al sistema. No existe un rol de acceso público ni de solo lectura.

---

## 2. Gestión de Registros

El sistema permite la administración completa del ciclo de vida de los registros vehiculares.

### 2.1 Operaciones CRUD

| Operación            | Descripción                                                              |
|----------------------|--------------------------------------------------------------------------|
| **Crear**            | Ingresar nuevos registros vehiculares con todos los campos requeridos.   |
| **Actualizar**       | Modificar campos permitidos de un registro existente, previa validación. |
| **Eliminar**         | Dar de baja un registro con confirmación previa obligatoria.             |
| **Generar reportes** | Generar un reporte de vehiculos mensualmente.                            |

### 2.2 Filtros Disponibles

El sistema soporta **consultas múltiples simultáneas** (por ejemplo: registros vencidos en un mes determinado). Los filtros disponibles son:

- Fecha específica — selector de calendario.
- Mes y año — menús desplegables independientes.
- Categoría de vehículo — menú desplegable.
- Número de documento — solo acepta valores numéricos.
- Placa — máximo 6 caracteres alfanuméricos.
- Tipo de documento — Cédula de ciudadanía o NIT.
- Estado — menú con checkboxes para selección múltiple simultánea.

---

## 3. Estados de los Registros

Cada registro vehicular atraviesa un ciclo de estados definido. Las transiciones se producen de forma manual por el ingeniero o automáticamente mediante tareas programadas (`cron`).

### 3.1 Catálogo de Estados

| Estado | Origen de la transición | Descripción |
|---|---|---|
| **Inédito** | Automático (por defecto) | Estado inicial de todo registro al momento de creación. |
| **Aprobado-Actualizado** | Manual | El registro fue revisado y aprobado. Al cambio de año regresa a Inédito automáticamente. |
| **Vencido** | Automático (cron) | Registros en estado Inédito que no avanzaron antes del cambio de mes. |
| **Actualizado** | Manual | Registros con `Fin_Vigencia_RTM` en 2027; permanecen en este estado. |
| **Reportado** | Manual | Se registra la fecha exacta en que se efectuó el reporte. |

### 3.2 Reglas de Transición Automática

- **Al cambio de año:** todos los registros en estado `Aprobado-Actualizado` pasan automáticamente a `Inédito`.
- **Al cambio de mes:** si los registros de ese mes permanecen en `Inédito` y su fecha Fin_Vigencia era se supero y no pasaron a otro estado, se marcan automáticamente como `Vencido`.

> Todas las transiciones automáticas son gestionadas por tareas `cron` configuradas con parámetros cronológicos del sistema.

### 3.3 Regla de Actualización de Registro Vencido

Cuando se actualiza un registro en estado `Vencido`, el sistema recalcula automáticamente su vigencia:

- `Inicio_Vigencia` = fecha de aprobación de la RTM.
- `Fin_Vigencia` = `Inicio_Vigencia` + 365 días exactos.

---

## 4. Mensajes Dinámicos

Los mensajes informativos se generan de forma dinámica según el estado del registro y la fecha actual.

### 4.1 Datos que muestra el mensaje

- `Fin_Vigencia_RTM` — fecha de vencimiento de la revisión técnico-mecánica.
- `Placa` — siempre en mayúsculas.
- Tipo de vehículo — categoría del vehículo registrado.
- Precio correspondiente — según el tipo de vehículo y su procedencia.

> El precio puede ser modificado en cualquier momento por el ingeniero desde el panel de configuración.

### 4.2 Lógica del mensaje según estado y fecha

| Estado del registro | Condición | Mensaje |
|---|---|---|
| Inédito | `Fin_Vigencia_RTM` < fecha actual | **"Venció"** |
| Inédito | `Fin_Vigencia_RTM` > fecha actual | **"Vence"** |

---

## 5. Validación de Placas

Antes de crear cualquier registro nuevo, el sistema obliga a verificar si la placa ya existe en la base de datos. Este paso es **obligatorio** y no puede omitirse.

| Resultado | Comportamiento del sistema |
|---|---|
| ✅ **Placa NO existe** | Se muestra un mensaje informativo y se habilita la vista para ingresar un nuevo registro. |
| ⚠️ **Placa YA existe** | Se muestra un mensaje indicando que el registro existe y se pregunta al ingeniero si desea actualizarlo. |

---

## 6. Formulario de Nuevo Registro

Todos los campos son **obligatorios**. El sistema valida en tiempo real que cada campo cumpla con las restricciones definidas antes de permitir el envío.

| Campo | Tipo de control | Restricciones y observaciones                                                                     |
|---|---|---------------------------------------------------------------------------------------------------|
| **Fecha inicio vigencia** | Selector de fecha (calendario) | No puede ser superior a la fecha actual.                                                          |
| **Fecha fin vigencia** | Calculado automáticamente | No puede ser inferior a la fecha actual.                                                          |
| **Placa** | Texto | Exactamente 6 caracteres alfanuméricos. Se guarda en mayúsculas.                                  |
| **Documento** | Numérico | Solo valores numéricos.                                                                           |
| **Tipo de documento** | Select | Opciones: Cédula de ciudadanía · NIT                                                              |
| **Categoría** | Select (una opción) | Define el tipo de vehículo.                                                                       |
| **Marca** | Select con búsqueda | Permite escribir para agilizar la selección.                                                      |
| **Línea** | Texto | Alfanumérico. Se guarda en mayúsculas con nomenclatura `[CATEGORÍA]linea`. indexando la caregoria |
| **Modelo** | Select (dinámico) | Solo 4 caracteres numéricos. Se genera dinámicamente.                                             |
| **Nombre del propietario** | Texto | Solo caracteres alfabéticos. Se guarda en mayúsculas.                                             |
| **Teléfono 1** | Numérico | Exactamente 10 caracteres.                                                                        |
| **Teléfono 2** | Numérico | Exactamente 10 caracteres.                                                                        |

> **Nomenclatura del campo Línea:** al guardarse en base de datos, el valor se almacena como `[CATEGORÍA]linea`. Ejemplo: si la categoría es `MOTO` y la línea es `CB190`, se guarda como `MOTOcb190`.

---

## 7. Formulario de Actualización de Registro

En la vista de actualización se muestran todos los campos del registro, pero únicamente los siguientes pueden ser **modificados**:

| Campo editable | Observaciones                                               |
|---|-------------------------------------------------------------|
| **Inicio_Vigencia** | Fecha de aprobación de la RTM.                              |
| **Fin_Vigencia** | Se recalcula automáticamente: `Inicio_Vigencia` + 365 días. |
| **Documento del propietario** | Solo valores numéricos.                                     |
| **Nombre del propietario** | Solo caracteres alfabéticos, que se guardan en mayúsculas.  |
| **Teléfono 1 y Teléfono 2** | Máximo 10 caracteres numéricos cada uno.                    |
| **Estado** | Seleccionable mediante menú desplegable.                    |

> Antes de enviar la actualización, el sistema valida que todos los campos editables estén correctamente diligenciados.

---

## 8. Documentación y Respaldo Fotográfico

Cuando no se dispone de tiempo suficiente para transcribir los datos de la licencia de conducción, el sistema permite adjuntar una **fotografía de esta como respaldo temporal**.

### 8.1 Condiciones para el respaldo fotográfico

- Subir la fotografía de la licencia de conducción es una opción temporal, no permanente.
- Al hacer uso de esta opción, el **número de teléfono del propietario se vuelve obligatorio**.
- Si no se proporciona el número de teléfono junto con la fotografía, **el registro no podrá guardarse**.

> ⛔ **Restricción crítica:** fotografía de licencia y teléfono del propietario deben proporcionarse juntos. Sin teléfono, el sistema bloquea el guardado del registro.

### 8.2 Flujo posterior a la inserción

Al finalizar correctamente la inserción de un nuevo registro, el sistema:

1. Muestra un mensaje confirmando que el registro fue creado exitosamente.
2. Pregunta al ingeniero si desea reportar el registro en ese momento.
3. Si acepta, presenta el formulario de reporte con el campo **Fecha de reporte** (selector de calendario, sin superar la fecha actual).

---

## 9. Reportes y Exportación

El sistema genera reportes en formato `.xlsx` con los registros actualizados durante el mes seleccionado. El ingeniero puede **previsualizar el contenido** antes de descargar el archivo.

### 9.1 Columnas del reporte

| #  | Columna         | Contenido                                            |
|----|-----------------|------------------------------------------------------|
| 1  | `Fecha_Reporte` | Fecha en que se efectuó el reporte del registro.     |
| 2  | `Fecha_Ingreso` | Fecha en que el registro fue creado en el sistema.   |
| 3  | `Placa`         | Placa del vehículo (en mayúsculas).                  |
| 4  | `Categoría`     | Tipo de vehículo (particular, público, motocicleta). |
| 5  | `Marca`         | Marca del vehículo.                                  |
| 6  | `Tipo_Cliente`  | Persona natural (cédula) o empresa (NIT).            |
| 7  | `Nombre`        | Nombre completo del propietario (en mayúsculas).     |
| 8  | `Proveniencia`  | De taller o directo.                                 |
| 9  | `Documento`     | Número de documento del propietario.                 |
| 10 | `Teléfono`      | Teléfono de contacto registrado.                     |
| 11 | `Descuento`     | Descuento aplicado, si corresponde.                  |

---

## 10. Precios y Descuentos

Los precios varían según la categoría del vehículo y la modalidad de agendamiento. El ingeniero puede modificarlos en cualquier momento desde el sistema.

### 10.1 Precio normal (sin descuento)

| Categoría de vehículo | Precio (COP) |
|---|---|
| Vehículo particular | $ 320.000 |
| Vehículo público | $ 317.500 |
| Motocicleta | $ 220.000 |

### 10.2 Precio con descuento 

Aplica un descuento equivalente al **7.81%** sobre el precio normal. Se aplica por **agendamiento previo** o por **remisión desde taller**.

| Categoría | Por agendamiento | Remitido desde taller |
|---|---|---|
| Carro (particular / público) | $ 295.000 | $ 295.000 |
| Motocicleta | $ 190.000 | $ 190.000 |

---

## 11. Vistas del Sistema

El sistema cuenta con cinco vistas diferenciadas, cada una diseñada para una función específica dentro del flujo de trabajo del ingeniero.

### 11.1 Vista Principal

Pantalla de inicio del sistema. Muestra las opciones de filtrado disponibles y las tablas vacías listas para ser completadas con los resultados de una búsqueda.

### 11.2 Vista de Filtrado

Se activa después de seleccionar los parámetros de búsqueda. Presenta las filas que coinciden con los criterios, organizadas con **paginación** para facilitar la navegación.

### 11.3 Vista de Actualización de Registro

Muestra todos los campos del registro, pero solo permite editar: `Inicio_Vigencia`, `Fin_Vigencia`, documento del propietario, nombre del propietario, teléfonos y estado. Valida los datos antes del envío.

### 11.4 Vista de Nuevo Registro

Formulario completo para crear un registro. Todos los campos son obligatorios. El sistema valida que cada campo cumpla sus restricciones antes de habilitar el envío.

### 11.5 Vista Previa de Reporte Mensual

Permite al ingeniero revisar y verificar la información del reporte antes de descargarlo en formato `.xlsx`.

---

## 12. Mensajes Emergentes

El sistema utiliza mensajes emergentes (modales) para comunicar acciones, solicitar confirmaciones y notificar validaciones.

| Tipo | Cuándo se muestra |
|---|---|
| **Confirmación de acción** | Antes de ejecutar una eliminación de registro. |
| **Confirmación de ejecución** | Después de guardar o actualizar un registro exitosamente. |
| **Selección de acción** | Cuando el flujo implica una decisión relacionada con estados. |
| **Validación previa** | Antes de ingresar un nuevo registro: solicita la placa para verificar si ya existe. |
| **Invalidación de formulario** | Cuando hay campos obligatorios vacíos o con datos incorrectos. |
| **Informativo de vencimiento** | Al iniciar un trámite, si el registro tiene una fecha de vencimiento relevante. |

---

## 13. Opciones de Filtrado

El sistema soporta **consultas múltiples simultáneas**. Los filtros pueden combinarse para obtener resultados precisos.

| Filtro | Control | Restricciones |
|---|---|---|
| **Fecha específica** | Calendario | Selección de un día puntual. |
| **Mes y año** | Menús desplegables | Selección independiente de mes y año. |
| **Categoría de vehículo** | Menú desplegable | Una categoría por consulta. |
| **Número de documento** | Campo numérico | Solo acepta valores numéricos. |
| **Placa** | Campo alfanumérico | Máximo 6 caracteres. |
| **Tipo de documento** | Menú desplegable | Cédula de ciudadanía o NIT. |
| **Estado** | Menú con checkboxes | Permite seleccionar múltiples estados en una sola consulta. |

---


