# Requerimientos del Sistema — Gestor CDA

> **Documento:** Especificación de Requerimientos de Software  
> **Versión:** 1.0  
> **Clasificación:** Uso interno · Confidencial  
> **Basado en:** Reglas del Sistema v1.0

## Tabla de Contenidos

- [1. Requerimientos Funcionales](#1-requerimientos-funcionales)
  - [RF-01 Autenticación y Acceso](#rf-01-autenticación-y-acceso)
  - [RF-02 Gestión de Registros (CRUD)](#rf-02-gestión-de-registros-crud)
  - [RF-03 Estados de Completitud](#rf-03-estados-de-completitud)
  - [RF-04 Estados de Tramitación](#rf-04-estados-de-tramitación)
  - [RF-05 Transiciones Automáticas de Estado](#rf-05-transiciones-automáticas-de-estado)
  - [RF-06 Mensajes Dinámicos](#rf-06-mensajes-dinámicos)
  - [RF-07 Validación de Placas](#rf-07-validación-de-placas)
  - [RF-08 Formulario de Nuevo Registro](#rf-08-formulario-de-nuevo-registro)
  - [RF-09 Formulario de Actualización de Registro](#rf-09-formulario-de-actualización-de-registro)
  - [RF-10 Documentación y Respaldo Fotográfico](#rf-10-documentación-y-respaldo-fotográfico)
  - [RF-11 Reportes y Exportación](#rf-11-reportes-y-exportación)
  - [RF-12 Precios y Descuentos](#rf-12-precios-y-descuentos)
  - [RF-13 Filtros y Búsqueda](#rf-13-filtros-y-búsqueda)
  - [RF-14 Mensajes Emergentes (Modales)](#rf-14-mensajes-emergentes-modales)
  - [RF-15 Vistas del Sistema](#rf-15-vistas-del-sistema)


## 1. Requerimientos Funcionales

Los requerimientos funcionales describen las capacidades y comportamientos específicos que el sistema debe proveer.

---

### RF-01 Autenticación y Acceso

| ID | Requerimiento |
|----|---------------|
| RF-01.1 | El sistema debe restringir el acceso a un único perfil autorizado: el **ingeniero**. |
| RF-01.2 | La autenticación debe realizarse mediante **JWT (JSON Web Token)**. |
| RF-01.3 | El token JWT debe presentarse en **cada solicitud** realizada al sistema. |
| RF-01.4 | El sistema **no debe** exponer un rol de acceso público ni de solo lectura. |
| RF-01.5 | La vista de inicio de sesión debe mostrar mensajes claros cuando las credenciales sean inválidas. |
| RF-01.6 | Todo intento de acceso debe ser registrado en un log de auditoría. |

---

### RF-02 Gestión de Registros (CRUD)

| ID | Requerimiento |
|----|---------------|
| RF-02.1 | El sistema debe permitir **crear** nuevos registros vehiculares con todos los campos requeridos. |
| RF-02.2 | El sistema debe permitir **actualizar** los campos permitidos de un registro existente, previa validación. |
| RF-02.3 | El sistema debe permitir **eliminar** un registro, solicitando confirmación previa obligatoria antes de ejecutar la acción. |
| RF-02.4 | El sistema debe permitir **generar reportes** de vehículos con periodicidad mensual. |
| RF-02.5 | El sistema debe permitir un **guardado rápido provisional** (Vista 5), con validación mínima y respaldo fotográfico. |

---

### RF-03 Estados de Completitud

| ID | Requerimiento |
|----|---------------|
| RF-03.1 | Todo registro nuevo creado mediante la opción provisional debe tener por defecto el estado de completitud **Incompleto (`FALSE`)**. |
| RF-03.2 | El ingeniero debe poder cambiar manualmente el estado de completitud a **Completo (`TRUE`)** desde la vista de actualización, una vez diligenciados todos los datos fundamentales. |
| RF-03.3 | Un registro en estado **Completo** no puede revertirse a estado **Incompleto**. |
| RF-03.4 | Un registro con estado de completitud **Incompleto** no puede transicionar al estado de tramitación **Actualizado**. |

---

### RF-04 Estados de Tramitación

El sistema debe gestionar el siguiente ciclo de vida de estados para cada registro vehicular:

| ID | Requerimiento |
|----|---------------|
| RF-04.1 | Al crear un registro, el estado inicial debe ser **Inédito** (asignado automáticamente). |
| RF-04.2 | El ingeniero debe poder cambiar manualmente el estado a **Reportado**, registrando la fecha exacta del reporte. |
| RF-04.3 | El ingeniero debe poder cambiar manualmente el estado a **Ingresado**, registrando la fecha exacta en que el vehículo asistió al CDA. |
| RF-04.4 | El ingeniero debe poder cambiar manualmente el estado a **Actualizado**, indicando que el registro fue revisado y aprobado. |
| RF-04.5 | El ingeniero debe poder cambiar manualmente el estado a **Declinado**, agregando un comentario que explique la gestión fallida. |
| RF-04.6 | Un registro en estado **Ingresado** no puede regresar a estado **Reportado**. |
| RF-04.7 | Un registro no puede transicionar a estado **Ingresado** sin haber pasado previamente por el estado **Reportado**. |

---

### RF-05 Transiciones Automáticas de Estado

| ID | Requerimiento |
|----|---------------|
| RF-05.1 | Al **cambio de año**, todos los registros en estado `Actualizado` deben transicionar automáticamente a estado `Inédito`. |
| RF-05.2 | **Excepción a RF-05.1:** Los registros `Actualizados` con `Fin_Vigencia_RTM` en el año 2027 permanecen en ese estado y retornan a `Inédito` al cambio del año correspondiente. |
| RF-05.3 | Al **cambio de mes**, los registros que permanezcan en estado `Inédito` y cuya `Fin_Vigencia_RTM` ya haya sido superada deben marcarse automáticamente como `Vencido`. |
| RF-05.4 | Cuando se actualiza un registro en estado `Vencido`, el sistema debe recalcular automáticamente su vigencia: `Inicio_Vigencia` = fecha de aprobación; `Fin_Vigencia` = `Inicio_Vigencia` + 365 días exactos. |

---

### RF-06 Mensajes Dinámicos

| ID | Requerimiento |
|----|---------------|
| RF-06.1 | El sistema debe generar mensajes informativos dinámicos según el estado del registro y la fecha actual. |
| RF-06.2 | El mensaje debe incluir: `Fin_Vigencia_RTM`, placa del vehículo (en mayúsculas), categoría del vehículo y precio correspondiente. |
| RF-06.3 | Si el registro está en estado `Inédito` y `Fin_Vigencia_RTM` es **anterior** a la fecha actual, el mensaje debe indicar **"Venció"**. |
| RF-06.4 | Si el registro está en estado `Inédito` y `Fin_Vigencia_RTM` es **posterior** a la fecha actual, el mensaje debe indicar **"Vence"**. |

---

### RF-07 Validación de Placas

| ID | Requerimiento |
|----|---------------|
| RF-07.1 | Antes de crear cualquier registro nuevo, el sistema debe **obligar** al ingeniero a verificar si la placa ya existe en la base de datos. Este paso no puede omitirse. |
| RF-07.2 | Si la placa **no existe**, el sistema debe habilitar la vista para ingresar un nuevo registro. |
| RF-07.3 | Si la placa **ya existe**, el sistema debe mostrar un mensaje informativo indicando que el registro existe y no debe permitir la creación de un duplicado. |

---

### RF-08 Formulario de Nuevo Registro

Todos los campos son obligatorios. El sistema debe validar en tiempo real que cada campo cumpla sus restricciones antes de habilitar el envío.

| ID | Campo | Requerimiento |
|----|-------|---------------|
| RF-08.1 | **Fecha inicio vigencia** | Control de calendario. No puede ser superior a la fecha actual. |
| RF-08.2 | **Fecha fin vigencia** | Calculada automáticamente (`Inicio_Vigencia` + 365 días). No puede ser inferior a la fecha actual. |
| RF-08.3 | **Placa** | Exactamente 6 caracteres alfanuméricos. Se guarda en mayúsculas. |
| RF-08.4 | **Estado** | Selector de una opción. El valor por defecto debe ser `Inédito`. |
| RF-08.5 | **Estado — fechas de evento** | Si el usuario selecciona `Reportado` o `Ingresado`, debe proporcionar la fecha exacta del evento. |
| RF-08.6 | **Documento** | Solo valores numéricos. |
| RF-08.7 | **Tipo de documento** | Selector con opciones: `Cédula de ciudadanía` o `NIT`. |
| RF-08.8 | **Categoría** | Selector de una opción. Define el tipo de vehículo. |
| RF-08.9 | **Marca** | Selector con búsqueda de texto para agilizar la selección. |
| RF-08.10 | **Línea** | Texto alfanumérico. Se guarda en mayúsculas con nomenclatura `[CATEGORÍA]linea`. Ejemplo: categoría `MOTO`, línea `CB190` → se guarda como `[MOTO]cb190`. |
| RF-08.11 | **Modelo** | Solo 4 caracteres numéricos. Generado dinámicamente mediante selector. |
| RF-08.12 | **Nombre del propietario** | Solo caracteres alfabéticos. Se guarda en mayúsculas. |
| RF-08.13 | **Teléfono 1** | Numérico. Exactamente 10 dígitos. |
| RF-08.14 | **Teléfono 2** | Numérico. Exactamente 10 dígitos. |
| RF-08.15 | Validación previa obligatoria de placa antes de ingreso. |
| RF-08.16 | Botón adicional “Rectificar en RUNT” para verificación externa. |

---

### RF-09 Formulario de Actualización de Registro

La vista de actualización muestra todos los campos del registro, pero únicamente los siguientes pueden ser modificados:

| ID | Campo editable | Requerimiento |
|----|----------------|---------------|
| RF-09.1 | **Inicio_Vigencia** | Fecha de aprobación de la RTM. |
| RF-09.2 | **Fin_Vigencia** | Recalculada automáticamente: `Inicio_Vigencia` + 365 días. |
| RF-09.3 | **Documento del propietario** | Solo valores numéricos. |
| RF-09.4 | **Nombre del propietario** | Solo caracteres alfabéticos. Se guarda en mayúsculas. |
| RF-09.5 | **Teléfono 1 y Teléfono 2** | Máximo 10 caracteres numéricos cada uno. |
| RF-09.6 | **Estado** | Seleccionable mediante menú desplegable, respetando las reglas de transición definidas en RF-04. |
| RF-09.7 | **Validación previa al envío** | El sistema debe validar que todos los campos editables estén correctamente diligenciados antes de permitir el envío. |
| RF-09.8 | En Vista 7, la placa debe ser campo bloqueado. |
| RF-09.9 | Validación dinámica en tiempo real con mensajes informativos. |

---

### RF-10 Documentación y Respaldo Fotográfico

| ID | Requerimiento |
|----|---------------|
| RF-10.1 | El sistema debe permitir adjuntar una fotografía de la licencia de conducción como respaldo temporal cuando no se dispone de tiempo para transcribir los datos. |
| RF-10.2 | Al usar la opción de respaldo fotográfico, el **teléfono del propietario se vuelve obligatorio**. |
| RF-10.3 | El sistema debe requerir y validar conjuntamente: fotografía de la licencia, placa y teléfono del propietario. Si alguno falta, debe bloquear el guardado del registro. |
| RF-10.4 | Al finalizar exitosamente la inserción de un nuevo registro, el sistema debe mostrar un mensaje de confirmación de creación. |
| RF-10.5 | Tras la confirmación, el sistema debe preguntar al ingeniero si desea reportar el registro en ese momento. |
| RF-10.6 | Si el ingeniero acepta reportar, el sistema debe presentar el formulario de reporte con el campo **Fecha de reporte** (calendario, sin superar la fecha actual). |
| RF-10.7 | La fotografía debe mostrarse en la interfaz como respaldo documental (Vista 7). |

---

### RF-11 Reportes y Exportación

| ID | Requerimiento |
|----|---------------|
| RF-11.1 | El sistema debe generar reportes en formato `.xlsx` con los registros del mes seleccionado. |
| RF-11.2 | El ingeniero debe poder previsualizar el contenido del reporte antes de descargarlo. |
| RF-11.3 | Un registro en estado `Ingresado` con estado de completitud `Incompleto` **no debe aparecer** en el reporte mensual. |
| RF-11.4 | El reporte debe contener las siguientes columnas en el orden definido: `Fecha_Reporte`, `Fecha_Ingreso`, `Placa`, `Categoría`, `Marca`, `Tipo_Cliente`, `Nombre`, `Proveniencia`, `Documento`, `Teléfono`, `Descuento`. |
| RF-11.5 | Mostrar vista previa del reporte mensual (Vista 9). |
| RF-11.6 | Si no existe reporte, mostrar modal informativo. |

---

### RF-12 Precios y Descuentos

| ID | Requerimiento |
|----|---------------|
| RF-12.1 | El sistema debe manejar precios diferenciados por categoría de vehículo: **Particular** `$320.000`, **Público** `$317.500`, **Motocicleta** `$220.000`. |
| RF-12.2 | El sistema debe aplicar un descuento del **7.81%** sobre el precio normal para vehículos agendados previamente o remitidos desde taller: **Carro** `$295.000`, **Motocicleta** `$190.000`. |
| RF-12.3 | El ingeniero debe poder modificar los precios en cualquier momento desde el panel de configuración. |

---

### RF-13 Filtros y Búsqueda

| ID | Requerimiento |
|----|---------------|
| RF-13.1 | El sistema debe soportar **consultas múltiples simultáneas**, permitiendo combinar varios filtros en una sola búsqueda. |
| RF-13.2 | Filtro por **fecha específica**: selector de calendario para un día puntual. |
| RF-13.3 | Filtro por **mes y año**: menús desplegables independientes. |
| RF-13.4 | Filtro por **categoría de vehículo**: menú desplegable de una opción. |
| RF-13.5 | Filtro por **número de documento**: campo numérico (solo acepta valores numéricos). |
| RF-13.6 | Filtro por **placa**: campo alfanumérico de máximo 6 caracteres. |
| RF-13.7 | Filtro por **tipo de documento**: menú desplegable (`Cédula de ciudadanía` o `NIT`). |
| RF-13.8 | Filtro por **estado**: menú con checkboxes que permite seleccionar múltiples estados simultáneamente. |
| RF-13.9 | El sistema debe incluir un botón para **reiniciar y limpiar** todos los filtros y resultados de búsqueda anteriores. |

---

### RF-14 Mensajes Emergentes (Modales)

| ID | Tipo | Requerimiento |
|----|------|---------------|
| RF-14.1 | **Confirmación de acción** | Debe mostrarse antes de ejecutar la eliminación de un registro. |
| RF-14.2 | **Confirmación de ejecución** | Debe mostrarse después de guardar o actualizar un registro exitosamente. |
| RF-14.3 | **Selección de acción** | Debe mostrarse cuando el flujo implica una decisión relacionada con cambios de estado. |
| RF-14.4 | **Validación previa** | Debe mostrarse antes de ingresar un nuevo registro: solicita la placa para verificar si ya existe. |
| RF-14.5 | **Invalidación de formulario** | Debe mostrarse cuando hay campos obligatorios vacíos o con datos incorrectos. |
| RF-14.6 | **Informativo de vencimiento** | Debe mostrarse al iniciar un trámite si el registro tiene una fecha de vencimiento relevante. |

---

### RF-15 Vistas del Sistema

El sistema debe contar con las siguientes vistas diferenciadas:

| ID | Vista | Descripción |
|----|-------|-------------|
| RF-15.1 | **Vista Principal** | Pantalla de inicio con opciones de filtrado y tablas vacías listas para resultados. |
| RF-15.2 | **Vista de Filtrado** | Se activa tras seleccionar parámetros de búsqueda; muestra resultados coincidentes con paginación. |
| RF-15.3 | **Vista de Actualización** | Muestra todos los campos del registro; solo permite editar los campos definidos en RF-09. |
| RF-15.4 | **Vista de Nuevo Registro** | Formulario completo para crear un registro con validación en tiempo real (RF-08). |
| RF-15.5 | **Vista Previa de Reporte Mensual** | Permite revisar y verificar el contenido del reporte antes de descargarlo en `.xlsx`. |

---
