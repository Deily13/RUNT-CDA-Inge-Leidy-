
# Arquitectura De Interfaces

## VISTA 1 — Pantalla de inicio de sesión

La vista de **login** constituye el punto de entrada al sistema, diseñada para cumplir la función de validación de credenciales y control de acceso.  
Su objetivo principal es garantizar que únicamente usuarios autorizados puedan interactuar con las funcionalidades internas.

### Funciones técnicas

- **Autenticación:** Responsable de iniciar el proceso de validación de identidad mediante los campos de correo electrónico y contraseña.
- **Control de acceso:** Impide el ingreso de usuarios no autorizados, mostrando mensajes de error en caso de credenciales inválidas.
- **Registro de eventos:** Cada intento de acceso puede ser auditado y registrado para fines de seguridad.

### Interfaz estructurada

La pantalla se divide en dos secciones principales:

- **Panel informativo:**  
  Incluye mensaje de bienvenida y advertencia de autenticación.  
  Fondo: 0B0E14-100%  
  Texto: Baskervville SC, 80 puntos, FFFFFF-100%

- **Formulario de acceso:**  
  Campos de correo electrónico y contraseña para la validación de credenciales.  
  Fondo: 191C22-10%  
  Botón: degradado 39FF14-100% / 00DBE9-100%  
  Título: Space Grotesk, 36 puntos, FFFFFF-100%

---

## VISTA 2 — Pantalla principal del sistema

La vista de **inicio** constituye el tablero central del sistema, diseñada para facilitar la navegación hacia las funciones clave de gestión de registros y reportes.  
Su objetivo principal es ofrecer un acceso rápido y organizado a las operaciones más frecuentes, garantizando eficiencia en la interacción del usuario con el sistema.

### Funciones técnicas

- **Navegación principal:** Proporciona botones destacados para acceder a las funciones críticas: búsqueda, creación de registros, visualización de reportes mensuales y gestión de registros pendientes.
- **Menú desplegable:** Ofrece un listado completo de opciones adicionales como inicio, guardado rápido y cierre de sesión, asegurando redundancia en la navegación.
- **Gestión de sesión:** Incluye un botón de cierre de sesión en la esquina superior derecha, reforzando el control de acceso y la seguridad.
- **Jerarquía visual:** Los elementos están organizados en un esquema que prioriza las acciones más utilizadas mediante botones centrales grandes y accesibles.

### Interfaz estructurada

La pantalla se organiza en tres secciones principales:

- **Barra superior:**
  - Menú desplegable (ícono de tres líneas) con opciones: Inicio, Buscar, Nuevo Registro, Guardado Rápido, Ver Reporte de Mes, Registros Pendientes y Cerrar Sesión.
  - Botón de **Cerrar Sesión** con ícono de flecha en la esquina superior derecha.  
    Fondo: degradado azul oscuro (#0B0E14 → #191C22).  
    Texto: tipografía clara, FFFFFF-100%.

- **Panel central de acciones:**  
  Cuatro botones rectangulares con íconos y etiquetas:
  - **Buscar:** ícono de lupa con documento - Redirecciona a vista de busqueda.
  - **Nuevo Registro:** ícono de documento con signo “+” - Redirecciona a vista de Nuevo Registro.
  - **Ver Reporte Mensual:** ícono de carpeta con ojo - Redirecciona a vista de Reportes mensuales.
  - **Registros Pendientes:** ícono de documento con reloj - Redirecciona a vista de registros pendientes por actualizar.  
    Fondo de botones: azul intermedio (#1A2A40 aprox.).  
    Íconos: estilo lineal blanco.  
    Texto: tipografía Space Grotesk, 24 puntos, FFFFFF-100%.

- **Fondo general:**  
  Degradado azul oscuro con transición suave, aportando contraste y jerarquía visual.  
  Paleta: 0B0E14-100% / 191C22-80%.
---


## VISTA 3 — Panel principal (Búsqueda y Filtros)

Esta vista permitirá realizar búsquedas y consultar registros específicos existentes, además de acceder a funciones individuales sobre cada registro.

### Funciones técnicas

- **Consulta de registros:** En el formulario llamado filtros de búsqueda se pueden seleccionar los parámetros con los que se desea que los datos mostrados coincidan.
- **Limpiar filtro:** Permite borrar el contenido de varios campos a la vez.
- **Seleccionar acciones individuales para cada registro:** Cada fila de la tabla de resultados tiene opciones de respuesta individuales (editar, gestionar, eliminar).
  - **Actualizar registro:** Redirige a la vista para actualizar un registro existente.
  - **Gestionar registro:** Redirige a la vista para gestionar el registro específico.
  - **Eliminar registro:** Elimina el registro específico, después de confirmar la acción.
- **Ingresar un nuevo registro:** Redirige a la vista para crear un nuevo registro.
- **Ver vista previa del reporte mensual:** Redirige a la vista previa del reporte mensual antes de ser descargado.

### Interfaz estructurada

La pantalla se divide en tres secciones principales:

- **Botones de acción (esquina superior derecha):**
  - "Nuevo Registro" → botón 10B981-100%, texto blanco, bordes redondeados 8 puntos
  - "Vista Previa de Reporte" → botón 2563EB-100%, texto blanco, bordes redondeados 8 puntos
  - "Cerrar sesión" → botón sin relleno, texto blanco, borde blanco sólido, redondeado 8 puntos

- **Sección superior panel de criterios de búsqueda:**

| Filtro               | Control          | Restricciones                          |
|----------------------|-----------------|----------------------------------------|
| **Fecha específica** | Calendario       | Selección de un día puntual.           |
| **Mes y año**        | Menús desplegables | Selección independiente de mes y año. |
| **Categoría de vehículo** | Menú desplegable | Una categoría por consulta.          |
| **Número de documento** | Campo numérico | Solo acepta valores numéricos.        |
| **Placa**            | Campo alfanumérico | Máximo 6 caracteres.                  |
| **Tipo de documento** | Menú desplegable | Cédula de ciudadanía o NIT.           |
| **Estado**           | Menú con checkboxes | Permite seleccionar múltiples estados.|

- **Sección inferior resultado de búsqueda:**
  - Tabla vacía sobre tarjeta blanca con encabezado negro.
  - Columnas: Fecha inicio vigencia, Fecha fin vigencia, Placa, Estado, Documento, Tipo de documento, Categoría, Línea, Nombre del propietario, Teléfono 1, Acciones.
  - Columna de acciones con íconos:  
    ✏️ Actualizar → ícono verde  
    🔄 Gestionar → ícono azul  
    🗑️ Eliminar → ícono rojo (única excepción en la paleta)
  - En la esquina inferior derecha de la tabla debe estar el paginador para navegar entre los resultados.

---
## VISTA 4 — Formulario de nuevo registro

La vista de **nuevo registro** permite ingresar datos completos de un vehículo y su propietario en el sistema.

### Funciones técnicas
- **Validación de placa:** Evita registros duplicados.
- **Registro completo:** Captura de todos los campos obligatorios.

### Interfaz estructurada
La pantalla se divide en tres secciones principales:

- **Botones de acción (esquina superior derecha):**  
  Igual que en la Vista 2.

- **Sección superior panel de criterios de búsqueda:**  
  Antes de ingresar cualquier nuevo registro se validará mediante la placa si este ya existe, para evitar duplicados.

- **Sección inferior formulario para nuevo registro:**  
  Página blanca con formulario centrado en una tarjeta con barra de título negra e indicadores de campo obligatorio (*).  
  Todos los campos son obligatorios:
  - Fecha inicio vigencia → selector de fecha (no puede superar la fecha actual).
  - Fecha fin vigencia → calculada automáticamente (inicio + 365 días).
  - Placa → 6 caracteres alfanuméricos, se guarda en mayúsculas.
  - Estado → menú desplegable: Inédito, Actualizado, Vencido, Reportado, Ingresado, Declinado.
  - Documento → solo numérico.
  - Tipo de documento → desplegable: "Cédula de ciudadanía" / "NIT".
  - Categoría → menú desplegable.
  - Línea → alfanumérico en mayúsculas, formato [Marca]línea.
  - Nombre del propietario → solo caracteres alfabéticos, en mayúsculas.
  - Teléfono 1 → exactamente 10 dígitos numéricos.
  - Teléfono 2 → exactamente 10 dígitos numéricos.

Pie de formulario:
+ Botón verde sólido "Guardar" (alineado a la derecha), degradado 00DBE9 y 39FF14.
+ Botón con borde negro "Cancelar".
+ Botón provisional, borde 00DBE9 sin relleno.

---

## VISTA 5 — Guardado rápido

La vista de **guardado rápido** permite almacenar registros incompletos de manera provisional para completarlos después.

### Funciones técnicas
- **Registro mínimo:** Captura de datos esenciales para guardar temporalmente.

### Interfaz estructurada
Formulario con 4 campos obligatorios:
- Fotografía de la tarjeta de propiedad.
- Placa del vehículo.
- Número de teléfono.
- Estado.

---

## VISTA 6 — Formulario de actualización

La vista de **actualización** permite editar registros existentes con campos modificables.

### Funciones técnicas
- **Actualización de datos:** Modificación de campos editables.
- **Recalculo automático:** Fechas ajustadas automáticamente.

### Interfaz estructurada
  Mismo diseño que la Vista 3.  
- **Campos editables:** Resaltados con borde verde.
- **Campos de solo lectura:** Fondo gris claro (#F3F4F6).
- **Pie de formulario:** Botón Guardar cambios (relleno degradado #00DBE9 y #39FF14.) y Cancelar (borde blanco).
---

## VISTA 7 — Formulario de actualización de registro incompleto

### Descripción General
La vista de **actualización incompleta** permite completar información faltante en registros vehiculares.

### Funciones técnicas
- **Validación de campos obligatorios.**
- **Integración con persistencia de datos.**

### Interfaz estructurada
La pantalla se divide en dos columnas principales:
- **Formulario de datos (izquierda):** Campos de vehículo y propietario.
- **Sección gráfica (derecha):** Tarjeta de propiedad del vehículo.
- **Botón principal:** “Actualizar” en degradado 00DBE9 y 39FF14.

---

## VISTA 8 — Panel de gestionar placas
La vista de **gestión de placas** permite enviar recordatorios y administrar reportes asociados a vehículos.

### Funciones técnicas
- **Mensajes informativos:** Recordatorios estilo chat.
- **Registro de información:** Datos completos del vehículo.
- **Reportes:** Placa e ingreso con selector de fecha.
- **Acciones de declinado:** Conservar, comentar o eliminar.  

### Interfaz estructurada
Tres secciones claramente separadas:

1. **Mensaje** — Burbuja estilo WhatsApp (fondo oscuro #0F172A 60%, texto blanco, esquinas redondeadas).  
   Contenido dinámico según el registro.  
   Botón "Copiar mensaje" → borde verde, fondo blanco.

2. **Información de registro** — Tarjeta compacta con listado de datos del vehículo.

3. **Acciones de reportar registro e ingreso** — Tarjeta compacta:
  - Reportar placa: selector de fecha, menú desplegable (Tipo de cliente).
  - Reportar ingreso: selector de fecha.
  - Botón "Guardar reporte".

- **Declinado** — Tarjeta de confirmación con 3 botones:
  - "Conservar" → botón degradado #00DBE9  #39FF14 
  - "Comentario" → boton amarillo FFCD29 88%
  - "Eliminar" → botón rojo #FFB4AB 89%
---


### VISTA 9 — Panel de vista previa de reporte mensual antes de descarga

La vista de **reporte mensual** muestra resultados antes de la descarga.
### Funciones técnicas
- **Selección de mes y año.**
- **Visualización de tabla con datos del reporte.**  

### Interfaz estructurad
2 secciones claramente separadas:

1. **Selector de mes y año**
2. **Tabla de resultado de la seleccion**

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


----

## Requisitos generales de diseño:

### Paleta de colores
- **Verde (#39FF14, #10B981):** usado en botones principales y acciones positivas.
- **Azul (#2563EB, #00DBE9):** aplicado en botones secundarios y acciones de gestión.
- **Rojo (#FFB4AB):** reservado para acciones críticas como eliminar.
- **Amarillo (#FFCD29):** usado en botones de comentario o advertencia.
- **Negro y gris (#0B0E14, #191C22, #F3F4F6):** fondos, encabezados y estados de solo lectura.
- **Blanco (#FFFFFF):** texto y fondos de tarjetas.

---

### Elementos comunes
- **Botones:** con degradados, bordes redondeados y variantes sólidas o con borde.
- **Formularios:** con validaciones claras (verde para enfoque, rojo para error).
- **Tablas:** con acciones individuales por fila (editar, gestionar, eliminar).
- **Mensajes informativos:** estilo burbuja tipo chat.
- **Tarjetas compactas:** para agrupar información y acciones.
- **Iconografía:** con colores asociados a la acción (verde, azul, rojo).
- **Paginadores:** en tablas para navegación.

---

### Idioma
- Toda la interfaz está en **español**.  

