
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

-En caso de que las credenciales sean incorrectas mostrar un mensaje que indica que estan equivocadas y que las rectifique

---

## VISTA 2 — Pantalla principal del sistema

La vista de **inicio** constituye el tablero central del sistema, diseñada para facilitar la navegación hacia las funciones clave de gestión de registros y reportes.  
Su objetivo principal es ofrecer un acceso rápido y organizado a las operaciones más frecuentes, garantizando eficiencia en la interacción del usuario con el sistema.

### Funciones técnicas

- **Navegación principal:** Proporciona botones destacados para acceder a las funciones críticas: búsqueda, creación de registros, visualización de reportes mensuales y gestión de registros pendientes.
- **Menú desplegable lateral izquirdo:** Ofrece un listado completo de opciones adicionales como inicio, buscar, nuevo registro, guardado rápido, gestionar placa, actualizar placa,  ver reporte de mes, registros pendientes, RUNT, SOAT previsora y cierrar de sesión, asegurando redundancia en la navegación.
- **Gestión de sesión:** Incluye un botón de cierre de sesión en la esquina superior derecha, reforzando el control de acceso y la seguridad.
- **Jerarquía visual:** Los elementos están organizados en un esquema que prioriza las acciones más utilizadas mediante botones centrales grandes y accesibles.

### Interfaz estructurada

La pantalla se organiza en tres secciones principales:

- **Barra superior:**
  - Menú desplegable (ícono de tres líneas - Menu hamburguesa) con opciones: inicio, buscar, nuevo registro, guardado rápido, gestionar placa, actualizar placa,  ver reporte de mes, registros pendientes, RUNT, SOAT previsora y cierrar de sesión.
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
  Paleta: #0B0E14-100% / #191C22-80%.
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

- **Botones de acción:**
  - "Menu" → Icono de menu color blanco ubicado en la esquina superior izquierda
  - "Inicio" → botón sin relleno, texto blanco, borde blanco sólido, redondeado 8 puntos
  - "Cerrar sesión" → botón sin relleno, texto blanco, borde blanco sólido, redondeado 8 puntos
  - Inicio y Cerrar sesion ubicados esquina superior derecha

- **Sección superior panel de criterios de búsqueda:**
- Esta seccion esta contenida en una targeta de bordes redondeados, color 0F172A intensidad 65%, contotno blanco intensidad 12.5%.
- La parte superior de esta seccion se enuncia con un icono de filtrado y un titulo con el siguiente texto Filtros de Búsqueda, en color #39FF14 en negrita, alineados a la izquierda, solo iniciales mayusculas


| Filtro               | Control            | Restricciones                          | Placeholder        |
|----------------------|-------------------|----------------------------------------|--------------------|
| **Fecha específica** | Calendario         | Selección de un día puntual.           | mm/dd/aaa          |
| **Mes y año**        | Menús desplegables | Selección independiente de mes y año.  | mes / año          |
| **Categoría de vehículo** | Menú desplegable | Una categoría por consulta.          | Seleccione categoría |
| **Número de documento** | Campo numérico   | Solo acepta valores numéricos.        | número de documento |
| **Placa**            | Campo alfanumérico | Máximo 6 caracteres.                  | (ej: ABC123)       |
| **Tipo de documento** | Menú desplegable   | Cédula de ciudadanía o NIT.           | Tipo de documento  |
| **Estado**           | Menú con checkboxes| Permite seleccionar múltiples estados.| Seleccione estados |


- **Sección inferior resultado de búsqueda:**
- Esta seccion esta contenida en una targeta de bordes redondeados, color 0F172A intensidad 65%, contotno blanco intensidad 12.5%.
- Tabla vacía sobre tarjeta blanca con encabezado negro.
  - Columnas: Fecha inicio vigencia, Fecha fin vigencia, Placa, Estado, Documento, Tipo de documento, Categoría, Línea, Nombre del propietario, Teléfono 1, Acciones.
  - Columna de acciones con íconos:  
    ✏️ Actualizar → ícono verde  
    🔄 Gestionar → ícono azul  
    🗑️ Eliminar → ícono rojo 
  - En la esquina inferior derecha de la tabla debe estar el paginador para navegar entre los resultados.
  - En paginador mostrar por defecto de a 10 registros por cada consulta, tendra boton de avanzar y retrocederque se activaran de acuerdo a la cantidad de registros.

- En caso tal de que no ayan resultados de la consulta se muestre un mensaje tipo modal indicando que no hay resultado en esa consulta
en texto más pequeño sugerir hacer otra consulta
- En caso tal de que se quiera eliminar un registro se motrara un mensaje tipo modal consultado si esta seguro de eliminar el registro en cuestion,
el fondo debe ser de color #0F172A intensidad 72%, borde blanco intensidad 8%, debe tener un icono de advertencia color rojo, 
debajo un texto que haga la pregunta y en letra mas pequeña un mensaje que indique que los cambios seran permanentes
dejádo de esos mensajes deben de estar dos botones alineado horizontalmenteun debe decir cancelar, de color blanco con bordes redondeados, texto negro en negrita,
el otro boton debe ser color rojo degradado lineal vertical, #4B0606 - #FA0000, bordes redondeados, texto color blanco en negrita
---
## VISTA 4 — Formulario de nuevo registro

La vista de **nuevo registro** permite ingresar datos completos de un vehículo y su propietario en el sistema.

### Funciones técnicas
- **Validación de placa:** Evita registros duplicados.
- **Registro completo:** Captura de todos los campos obligatorios.

### Interfaz estructurada
La pantalla se divide en tres secciones principales:

- **Botones de acción (esquina superior derecha e izquierda):**  
  Igual que en la Vista 2. 

- **Sección superior panel de criterios de búsqueda:**  
  Antes de ingresar cualquier nuevo registro se validará mediante la placa si este ya existe, para evitar duplicados.
- - Rectagulo con bordes obalados casi de extremo a  extremo de la pantalla horizontalmente dejando un margin razonable a los extremos derecho he izquierdo para mantener la armonia visual
- - En el interior izquierdo del rectangulo texto en negrita color #39FF14 que diga: Verifica si la placa ya existe
- - Seguido del texto un Input con relleno #000000 e intensidad 30%, borde #FFFFFF - intesidad 54%
- - Extremos derechos iconos de limpiar filtro (Una X blanca) y buscar (Una lupa color #34D399)

- **Sección inferior formulario para nuevo registro:**  
  Targeta #0F172A intensidad 72%, borde blanco intensidad de 12% con formulario centrado con indicadores de campo obligatorio (*).  
  Todos los campos son obligatorios:
  - Fecha inicio vigencia → selector de fecha (no puede superar la fecha actual).
  - Fecha fin vigencia → calculada automáticamente (inicio + 365 días).
  - Placa → 6 caracteres alfanuméricos, se guarda en mayúsculas.
  - Estado → menú desplegable: Inédito, Actualizado, Vencido, Reportado, Ingresado, Declinado.
  - Documento → solo numérico.
  - Tipo de documento → desplegable: "Cédula de ciudadanía" / "NIT".
  - Categoría → menú desplegable.
  - Marca → El texto independientemente de como se escriba se mostrar en mayuscula
  - Línea → alfanumérico en mayúsculas, formato [Marca]línea.
  - Nombre del propietario → solo caracteres alfabéticos, en mayúsculas.
  - Teléfono 1 → exactamente 10 dígitos numéricos.
  - Teléfono 2 → exactamente 10 dígitos numéricos.

Pie de formulario:
+ Botón verde degradado "Guardar" (alineado a la derecha), degradado 00DBE9 y 39FF14, Campos inválidos resaltados en rojo. Sin redirección.
+ Botón con borde blanco con intensidad de 8%, relleno blanco con intensidad 3% "Cancelar".
+ Botón provisional, borde 00DBE9 sin relleno.
+ Botón Rectificar en RUNT, borde blanco, esquinas redondeadas, relleno degradado linear vertical 02098D y 010227, texto blanco 

---

## VISTA 5 — Guardado Rápido

La vista de **guardado rápido** permite almacenar registros de forma provisional con los datos mínimos necesarios, para completarlos posteriormente desde la Vista 7.

### Funciones técnicas
- **Registro mínimo provisional:** Captura los datos esenciales para identificar el vehículo y su propietario sin requerir el formulario completo.
- **Carga de imagen:** Permite adjuntar una fotografía de la tarjeta de propiedad como respaldo visual del registro.
- **Validación básica:** Verifica que todos los campos obligatorios estén completos antes de permitir el guardado.
- **Navegación post-acción:** Redirige automáticamente a Vista 2 tras guardar o cancelar.

### Interfaz estructurada

Formulario vertical sobre fondo azul oscuro (`#0B0E14`), sin tarjeta contenedora, presentado como panel lateral o vista móvil de ancho reducido.


1. Encabezado

- Título: *"Guardado rápido"*, tipografía blanca, tamaño grande, alineado a la izquierda.
- Subtítulo: *"Complete los detalles para guardar"*, tipografía gris claro, tamaño menor, alineado a la izquierda.

2. Campos del formulario

Todos los campos son obligatorios y están marcados con asterisco (`*`).

| Campo | Tipo de control | Restricciones                                                                                                |
|---|---|--------------------------------------------------------------------------------------------------------------|
| Fotografía de la tarjeta de propiedad `*` | Zona de carga de imagen (drag & drop) | Acepta archivos de imagen (JPG, PNG). Muestra previsualización tras la carga.                                |
| Placa del vehículo `*` | Campo alfanumérico | Exactamente 6 caracteres. Se almacena en mayúsculas. Ícono de vehículo a la izquierda. Placeholder: `ABC-123`. |
| Número de teléfono `*` | Campo numérico | Exactamente 10 dígitos. Prefijo `+57` visible y no editable a la izquierda. Placeholder: `300 000 0000`.     |
| Estado `*` | Menú desplegable | Opciones definidas por el sistema. Ícono de filtro a la izquierda. Placeholder: `Seleccionar estado`.        |
| Procedencia `*` | Menú desplegable | Opciones: De taller, Directo. Placeholder: `Seleccionar procedencia`.                                        |

**Zona de carga de imagen:**
- Fondo oscuro (`#191C22`), borde punteado gris, bordes redondeados.
- Ícono de cámara verde (`#10B981`) centrado.
- Texto principal: *"Upload Image"*, tipografía blanca, centrado.
- Texto secundario: *"Arrastra y suelta o haz clic para buscar"*, tipografía gris claro, tamaño menor, centrado.
- Al cargar una imagen: reemplaza el ícono y los textos por la previsualización de la fotografía, con opción de eliminar o reemplazar.

**Estados visuales de los campos:**
- **Normal:** fondo oscuro (`#191C22`), borde gris sutil, texto blanco, ícono gris a la izquierda.
- **Con foco activo:** borde verde (`#10B981`).
- **Con error de validación:** borde rojo (`#FFB4AB`) + mensaje *"* Campo obligatorio"* en rojo debajo del campo.

3. Pie de formulario — Botones y acciones

Fijo en la parte inferior del formulario, con ambos botones en la misma fila.

| Botón | Estilo | Acción |
|---|---|---|
| **Cancelar** | Sin relleno, borde blanco sólido, texto blanco, bordes redondeados. | Muestra modal de confirmación antes de descartar (ver mensajes del sistema). |
| **Guardar** | Relleno degradado `#39FF14` → `#00DBE9`, texto oscuro, ícono de disquete a la izquierda, bordes redondeados. | Valida el formulario. Si es correcto: muestra mensaje de éxito y redirige a Vista 2. Si hay errores: resalta los campos inválidos. |

 Mensajes del sistema

**Mensaje de éxito** (al guardar correctamente):
- Tipo: Toast superior.
- Color de fondo: verde (`#10B981`), texto blanco.
- Texto: *"Registro provisional guardado exitosamente."*
- Duración: 3 segundos. Tras cerrarse, redirige automáticamente a Vista 2.

**Mensaje de error por campos inválidos** (al intentar guardar con errores):
- Los campos incompletos se resaltan con borde rojo (`#FFB4AB`) y muestran el indicador *"* Campo obligatorio"* en rojo debajo de cada uno.
- No se ejecuta redirección.

**Mensaje de confirmación al cancelar:**
- Igual al definido en Vista 4: modal con ícono amarillo, título *"¿Deseas salir sin guardar?"*, botones Guardar y Descartar.
- Al presionar **Descartar**: redirige a Vista 2.
- Al presionar **Guardar**: cierra el modal y ejecuta el flujo normal de guardado.

 Flujos de navegación

| Acción del usuario | Resultado |
|---|---|
| Clic en **Guardar** con formulario válido | Toast de éxito (3 s) → redirige automáticamente a **Vista 2**. |
| Clic en **Guardar** con errores | Campos inválidos resaltados en rojo. Sin redirección. |
| Clic en **Cancelar** | Modal de confirmación → si descarta, redirige a **Vista 2**. |

---

## VISTA 6 — Formulario de actualización

La vista de **actualización** permite editar registros existentes con campos modificables.

### Funciones técnicas
- **Actualización de datos:** Modificación de campos editables.
- **Recalculo automático:** Fechas ajustadas automáticamente.

### Interfaz estructurada
  Mismo diseño que la Vista 4.  
- **Campos editables:** Estetica normal.
- - Fecha Inicio Vencimiento, Fecha Fin vencimiento, Estado, Tipo Documento, Telefono 1, Telefono 2, Nombre de propietario
- **Campos de solo lectura:** Fondo gris claro (#F3F4F6) sin permitir edicion.
- - Placa, Marca, Modelo, Linéa, Categoria 
- **Pie de formulario:**
- - Botón Guardar cambios (relleno degradado #00DBE9 y #39FF14.) 
- - Cancelar (borde blanco) sin relleno.
- - Botón Rectificar en RUNT, borde blanco, esquinas redondeadas, relleno degradado linear vertical 02098D y 010227, texto blanco



---

## VISTA 7 — Formulario de actualización de registro incompleto

### Descripción General
La vista de **actualización incompleta** permite al usuario **completar información faltante** en registros vehiculares previamente guardados de forma parcial.  
Todos los campos son editables excepto la **placa del vehículo**, que se mantiene fija como identificador único.  
La columna derecha muestra la **fotografía de la tarjeta de propiedad** como respaldo documental.

### Funcionalidades Técnicas
- **Validación dinámica:** cada campo obligatorio se valida en tiempo real, mostrando mensajes claros en caso de error.
- **Persistencia incremental:** los cambios se guardan sin perder la información previa, permitiendo actualizaciones parciales.
- **Responsividad:** el diseño se adapta a pantallas de escritorio.
- **Accesibilidad:** soporte para lectores de pantalla, etiquetas ARIA y contraste adecuado en botones.
- **Mensajes informativos:** alertas contextuales que guían al usuario (ej. “Teléfono inválido”).
- **Flujo de actualización:** el botón “Actualizar” confirma la acción y cambia el estado del registro a completo.

### Interfaz estructurada
La pantalla se divide en dos columnas:
- **Formulario de datos (izquierda):** campos de vehículo y propietario.
- **Sección gráfica (derecha):** fotografía de la tarjeta de propiedad.
- **Botón principal:** “Actualizar” con degradado **00DBE9 → 39FF14**, resaltado para acción principal.
- **Botón Cancelar**  borde blanco con intensidad de 8%, relleno blanco con intensidad 3%.
- **Botón Rectificar en RUNT**, borde blanco, esquinas redondeadas, relleno degradado linear vertical 02098D y 010227, texto blanco
- **Navegación superior:** botones “Menu” y “Cerrar Sesión” para control rápido del sistema.

### Tabla de Campos y Características


| Campo                           | Tipo de entrada      | Validación / Restricción              | Implicaciones en flujo                                                                                | Placeholder                 |
|---------------------------------|----------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------|
| Fecha inicio vigencia           | Selector de fecha    | Rango válido según reglas del sistema | Define vigencia inicial del registro                                                                  | DD/MM/AAA                   |
| Fecha fin vigencia              | Selector de fecha    | No puede ser menor a inicio           | Control de expiración del registro                                                                    | DD/MM/AAA                   |
| Placa del vehículo              | Texto alfanumérico   | Campo bloqueado (no editable)         | Identificador único del registro                                                                      | ABC123                      |
| Modelo                          | Numérico             | Año válido (ej. 2026)                 | Parte de detalles del vehículo                                                                        | (ej: 2026)                  |
| Categoría                       | Dropdown             | Opciones predefinidas                 | Clasificación del vehículo                                                                            | Seleccionar ...             |
| Marca                           | Texto                | Almacenado en mayúsculas              | Campo obligatorio                                                                                     | Ingrese marca               |
| Línea                           | Texto                | Libre, validación de caracteres       | Complementa la marca                                                                                  | Ingrese línea               |
| Estado                          | Dropdown             | Valores definidos en catálogo         | Determina en qué punto de la trazabilidad se encuentra el registro                                    | Seleccionar ...             |
| Tipo de documento               | Dropdown             | Opciones predefinidas                 | Asociado a trazabilidad legal                                                                         | Seleccionar ...             |
| Documento                       | Numérico             | Validación de longitud según tipo     | Identificación del propietario                                                                        | Ingrese número de documento |
| Nombre del propietario          | Texto                | Almacenado en mayúsculas              | Campo obligatorio                                                                                     | Ingrese nombre completo     |
| Teléfono 1                      | Numérico             | Solo números, longitud exacta         | Obligatorio para guardar                                                                              | Ingrese teléfono            |
| Teléfono 2                      | Numérico             | Opcional                              | Contacto alternativo                                                                                  | Ingrese teléfono            |
| Fotografía tarjeta de propiedad | Upload / Drag & Drop | Formato JPG/PNG, tamaño máximo        | Respaldo documental obligatorio si faltan otros campos                                                | Suba imagen de tarjeta      |
| Botón Actualizar                | Acción principal     | Activo solo si validaciones pasan     | Cambia el estado de completitud del registro y guarda los nuevos datos en sus tablas correspondientes | —                           |
| Botón Cancelar                  | Acción segundaria    | Descarta todos los cambios hechos     | Los datos no cambian                                                                                  | —                           |
| Botón Rectificar en RUNT        | Acción segundaria    | Abre otra pestaña con el RUNT         | Los datos no cambian                                                                                  | —                           |

---

## VISTA 8 — Panel de gestionar placas
La vista de **gestión de placas** permite enviar recordatorios y administrar reportes asociados a vehículos.

### Funciones técnicas
- **Mensajes informativos:** Recordatorios estílo chat.
- **Registro de información:** Datos completos del vehículo.
- **Reportes:** Placa e ingreso con selector de fecha.
- **Acciones de declinado:** Comentar o eliminar.  

### Interfaz estructurada
Cuatro secciones claramente separadas:

1. **Sección superior panel de criterios de búsqueda:**  
  Antes de ingresar cualquier nuevo registro se validará mediante la placa para agilizar el proceso.
- - Rectagulo con bordes obalados casi de extremo a extremo de la pantalla dejando un margin razonable a los extremos derecho he izquierdo para mantener la armonia visual
- - En el interior izquierdo del rectangulo texto en negrita color #39FF14 que diga:Escribe la placa que deseas gestionar
- - Seguido del texto un Input con relleno #000000 e intensidad 30%, borde #FFFFFF - intesidad 54%
- - Extremos derechos iconos de limpiar filtro (Una X blanca) y buscar (Una lupa color #34D399)

2. **Mensaje** — Burbuja estilo WhatsApp (fondo oscuro #0F172A 60%, texto blanco, esquinas redondeadas).  
   Contenido dinámico según el registro.  
- Contenido base, el contenido que se encuentre en [] séra el dinamico:
Hola, soy la Ingeniera Leidy Pisco de CDA Llano Verde Tecno-Mecanica.
Queremos recordarte que la Revisión Técnico-Mécanica de tú vehicúlo de placa [Placa]
vence el [Fecha Fin].

🚗 Tarifas CDA LLANO VERDE

- ✅ Vehículo particular: **$320.000**
- ✅ Vehículo público: **$317.500**
- ✅ Moto: **$220.000**
 
📅 Horarios
- Lunes a viernes: **7 am – 7 pm**
- Sábados: **8 am – 5 pm**
- Domingos y festivos: **8 am – 1 pm**

📍 Dirección
Carrera 33 # 23 – 57  
Barrio San Benito, Villavicencio, Meta 500004

 ⚠️ ¡No lo dejes para última hora!
Ven a **CDA LLANO VERDE** y realiza tu revisión con nosotros.
-   Botón "Copiar mensaje" → borde verde, fondo blanco.

- Debajo de este mensaje hay oto mensaje burbuja estilo WhatsApp (fondo oscuro #0F172A 60%, texto blanco, esquinas redondeadas).
Contenido del mensaje:

 ⚠️ Importante
📞 Llama antes de ingresar al CDA y obtén tu **descuento especial**
✅ Descuentos
- 🚗 *Carro:* **$295.000**
- 🏍️ *Moto:* **$190.000**
-   Botón "Copiar mensaje" → borde verde, fondo blanco.

3. **Información de registro** — Tarjeta compacta con listado de datos del vehículo (lado derecho de la pantalla). Fondo #10131A intensidad 60%, borde blanco intensidad 36%, texto blanco.
- Estado
- Placa (en negrita y su tamaño más grande que el resto del texto),
- Propietio
- Tipo documento
- Documento (doble salto de linéa aquí)
- Vencimiento
- Categoria
- Linea
- Modelo(doble salto de linéa aquí)
- Telefonos
- Comentario

4. **Acciones de reportar registro e ingreso** — Tarjeta compacta Fondo #10131A intensidad 60%, borde blanco intensidad 8% debajo de información de registro:
  - Reportar placa: selector de fecha, menú desplegable (Tipo de cliente).
  - - Título: Reportar placa, color #39FF14 en mayuscula y negrita
  - - Campos: Fecha reporte, Procedencia (Selección)
  - - Botón "Guardar reporte" con degradado **00DBE9 → 39FF14**, texto negro.
  - Reportar ingreso: selector de fecha.
  - - Titulo: Reportar ingreso,  color #14A5FF en mayuscula y negrita
  - - Campos: Fecha ingreso (Selección), Precio (Selección)
  - - Botón "Guardar reporte" con degradado **00DBE9 → 39FF14**, texto negro.

- **Declinado** — Tarjeta de confirmación con 2 botones:
  - "Comentario" → boton amarillo #FFCD29 88%
  - "Eliminar" → botón rojo #FFB4AB 89%
---



### VISTA 9 — Panel de vista previa de reporte mensual antes de descarga

La vista de **reporte mensual** muestra resultados antes de la descarga.
### Funciones técnicas
- **Selección de mes y año.**
- **Visualización de tabla con datos del reporte.**  

### Interfaz estructurada
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

- En caso tal de que no ayan resultados de la consulta se muestre un mensaje en el espacio que se encontraria la tabla diciendo: aun no se ha generado reporte de este mes
el texto debe ser grande el color blaco de manera se vea armoniosa

----

### VISTA 10 — Panel de registros pendientes por completar

La vista de **registros pendientes** muestra aquellos trámites de registro que aún no han sido completados y requieren acciones adicionales por parte del usuario.

### Funciones técnicas
- **Visualización de tabla con registros incompletos.**
- **Indicadores de estado con colores diferenciados.**
- **Acciones rápidas de edición y eliminación.**
- **Paginación para navegar entre múltiples resultados.**
- **Botones de navegación superior (Menu: lado izquierda, Inicio y Cerrar Sesión: lado derecho).**

### Interfaz estructurada
2 secciones claramente separadas:

1. **Encabezado de navegación**
  - Boton **Menu**
  - Botón **Inicio**.
  - Botón **Cerrar Sesión**.

2. **Tabla de registros incompletos**
  - Encabezado: “Registros Incompletos”.
  - Paginación inferior con indicador de resultados: *“Mostrando 1 a 10 de la cantidad total de resultados”*.
  - Columnas con datos específicos y acciones.


| #  | Columna       | Contenido                                                                 |
|----|---------------|---------------------------------------------------------------------------|
| 1  | `Placa`       | Placa del vehículo (en mayúsculas).                                       |
| 2  | `Teléfono`    | Número de contacto registrado.                                            |
| 3  | `Estado`      | Estado del registro con indicador de color                                |
| 4  | `Procedencia` | Origen del registro: Taller o Cliente.                                    |
| 5  | `Acciones`    | Iconos de acción:<br> - **Editar** (lápiz)<br> - **Eliminar** (papelera). |

- En caso de que no existan registros pendientes, se mostrará un mensaje en el espacio de la tabla:  
  **“Aún no se han generado registros pendientes”**  
  El texto debe ser grande, en color blanco, para mantener armonía visual.

---

## Requisitos generales de diseño:

### Paleta de colores
- **Verde (#39FF14, #10B981):** usado en botones principales y acciones positivas.
- **Azul (#2563EB, #00DBE9):** aplicado en botones secundarios y acciones de gestión.
- **Rojo (#FFB4AB):** reservado para acciones críticas como eliminar.
- **Amarillo (#FFCD29):** usado en estados de advertencia o registros reportados.
- **Negro y gris (#0B0E14, #191C22, #F3F4F6):** fondos, encabezados y estados de solo lectura.
- **Blanco (#FFFFFF):** texto y fondos de tarjetas.


### Elementos comunes
- **Botones:** con degradados, bordes redondeados y variantes sólidas o con borde.
- **Formularios:** con validaciones claras (verde para enfoque, rojo para error).
- **Tablas:** con acciones individuales por fila (editar, gestionar, eliminar).
- **Mensajes informativos:** estilo burbuja tipo chat.
- **Tarjetas compactas:** para agrupar información y acciones.
- **Iconografía:** con colores asociados a la acción (verde, azul, rojo).
- **Paginadores:** en tablas para navegación.


- ### Mensajes del sistema

**Mensaje de éxito** (al guardar correctamente):
- Tipo: Toast o banner superior.
- Color de fondo: verde (`#10B981`), texto blanco.
- Texto: *"Registro guardado exitosamente."*
- Duración: 3 segundos. Tras cerrarse, se ejecuta la redirección a Vista 2.

**Mensaje de error por campos inválidos** (al intentar guardar con errores):
- Tipo: Banner en la parte superior del formulario.
- Color de fondo: rojo claro (`#FFB4AB`), texto rojo oscuro.
- Texto: *"Por favor revisa los campos marcados en rojo antes de continuar."*
- Permanece visible hasta que el usuario corrija los errores.

**Mensaje de error por placa duplicada** (desde la sección de validación previa):
- Tipo: Modal centrado en pantalla, fondo oscuro semitransparente como overlay.
- Fondo del modal: azul oscuro (`#0B0E14`), bordes redondeados.
- Ícono: triángulo de advertencia (`⚠`) sobre círculo rojo, centrado en la parte superior del modal.
- Título: *"Registro Duplicado"*, tipografía blanca, tamaño prominente, centrado.
- Texto: *"La placa ingresada ya se encuentra registrada en el sistema."*, tipografía blanca, tamaño menor, centrado.
- Botón de confirmación: *"Entendido ✓"*, relleno degradado `#39FF14` → `#00DBE9`, texto oscuro, bordes redondeados, centrado en la parte inferior del modal.
- Se cierra al presionar el botón "Entendido", devolviendo el foco al campo de placa para que el usuario pueda corregirlo.

**Mensaje de confirmación al cancelar** (al presionar el botón Cancelar):
- Tipo: Modal centrado en pantalla, fondo oscuro semitransparente como overlay.
- Fondo del modal: azul oscuro (`#0B0E14`), bordes redondeados.
- Ícono: signo de interrogación o advertencia sobre círculo amarillo (`#FFCD29`), centrado en la parte superior del modal.
- Título: *"¿Deseas salir sin guardar?"*, tipografía blanca, tamaño prominente, centrado.
- Texto: *"Los datos ingresados se perderán si sales ahora."*, tipografía blanca, tamaño menor, centrado.
- Botones, centrados en la parte inferior del modal, uno al lado del otro:
  - **Guardar**: relleno degradado `#39FF14` → `#00DBE9`, texto oscuro, bordes redondeados. Al presionar, cierra el modal y ejecuta el flujo normal de guardado.
  - **Descartar**: sin relleno, borde blanco sólido, texto blanco, bordes redondeados. Al presionar, cierra el modal y redirige a Vista 2 sin guardar.
- Al presionar fuera del modal o en ningún botón, el modal se cierra y el usuario regresa al formulario sin ninguna acción.

**Mensaje de confirmación al eliminar**:
- Tipo: Modal centrado en pantalla, fondo oscuro semitransparente como overlay.
- Fondo del modal: azul oscuro (`#0B0E14`), bordes redondeados.
- Ícono: triángulo de advertencia (`⚠`) sobre círculo rojo, centrado en la parte superior del modal.
- Título: *"¿Estás seguro de eliminar este registro?"*, tipografía blanca, tamaño prominente, centrado.
- Texto: *"Una vez borrado, el cambio se hará de manera permanente."*, tipografía blanca, tamaño menor, centrado.
- Botones, centrados en la parte inferior del modal, uno al lado del otro:
  - **Cancelar**: sin relleno, borde blanco sólido, texto blanco, bordes redondeados. Al presionar, cierra el modal sin ejecutar ninguna acción.
  - **Borrar**: relleno rojo sólido (`#E53935`), texto blanco, bordes redondeados. Al presionar, ejecuta la eliminación del registro y cierra el modal.
- Al presionar fuera del modal, se cierra y el usuario regresa a la vista anterior sin ninguna acción.

**Modal de fecha requerida** (al presionar "Guardar reporte" sin haber ingresado la fecha de reporte de placa o la fecha de ingreso del vehículo):
- Tipo: Modal centrado en pantalla, fondo oscuro semitransparente como overlay.
- Fondo del modal: azul oscuro (`#0B0E14`), bordes redondeados.
- Ícono: calendario sobre círculo verde (`#10B981`), centrado en la parte superior del modal.
- Título: *"Acción Requerida"*, tipografía blanca, tamaño prominente, centrado.
- Texto: *"Antes de guardar, es necesario ingresar la fecha de entrada para mantener la integridad del historial de inspecciones."*, tipografía blanca, tamaño menor, centrado.
- Campo de fecha:
  - Etiqueta: *"FECHA DE ENTRADA"*, tipografía blanca, tamaño pequeño, alineada a la izquierda.
  - Control: selector de fecha (`dd/mm/yyyy`), fondo oscuro (`#191C22`), borde gris, ícono de calendario alineado a la derecha, texto blanco.
  - Indicador de campo obligatorio: texto rojo pequeño debajo del campo con el mensaje *"* Campo obligatorio"*.
- Botón de confirmación: *"Guardar"*, relleno degradado `#39FF14` → `#00DBE9`, texto oscuro, bordes redondeados, ancho completo dentro del modal.
- Al presionar "Guardar" sin fecha seleccionada: el campo se resalta con borde rojo y el indicador de campo obligatorio permanece visible.
- Al presionar "Guardar" con fecha válida: cierra el modal y ejecuta el guardado del reporte.
- Al presionar fuera del modal, se cierra y el usuario regresa a la vista anterior sin ninguna acción.

**Menu Lateral Desplegable**(parte superior izquierda de todas las paginas)
Se activa al presionar el menú hamburguesa.
- Se despliega desde el lado izquierdo ocupando ~250px de ancho.
- Fondo: azul intermedio (#132B55).
- Opciones en lista vertical:
  - “INICIO”
  - “BUSCAR”
  - “NUEVO REGISTRO”
  - “GUARDADO RÁPIDO”
  - “VER REPORTE DE MES”
  - “REGISTROS PENDIENTES”
  - "RUNT"
  - "SOAT PREVISORA"
  - “CERRAR SESIÓN”
- Texto blanco, hover en celeste claro (#4DA6FF).
- Íconos alineados a la izquierda de cada opción.


**Responsividad** 
- El sistema esta diseñado para uso exclusivo en computadoras
- Todas las vistas deben ser reponsivas y adaptables a cualquier tipo de pantalla


---
### Estetica de estados
**Etiqueta de estado (texto)**
- Indicador visual (óvalo) todos los estados tendran el mismo color que el texto con una intesidad de 20%
- Forma: ovalada, con bordes suaves.
- Se utilizara este fomrato en todas la tablas que sea queretido el dato de estado.
- Color: depende del estado asignado.
-  Asignación de colores por estado:

| Estado       | Color Texto Hex | Representación visual                                        |
|--------------|-----------------|--------------------------------------------------------------|
| **Inédito**  | `#808080`       | **Gris neutro** → indica registro nuevo, aún sin gestión.    |
| **Vencido**  | `#FF0000`       | **Rojo intenso** → alerta crítica, requiere atención.        |
| **Reportado**| `#FFCD29`       | **Amarillo** → estado de advertencia, pendiente de revisión. |
| **Ingresado**| `#26EEDD`       | **Azul sólido** → acción completada, registro aceptado.      |
| **Actualizado** | `#10B981`       | **Verde positivo** → indica que el registro fue actualizado. |
| **Declinado**| `#B129FF`       | **Purpura** → rechazo formal, menos crítico que vencido.     |

### Opcines desplegables 
- **Categoria** valores: Motocicleta, Automóvil, Campero, Motocarguero, Camioneta, Camión, Bus, Microbús, Tractocamión, Volqueta.
- **Estado** valores:  Inedito, Vencido, Reportado, Ingresado, Actualizado, Declinado
- **Modelo** valore: valores de los años desde el 2010 hasta el año actual + 1
- **Tipo de documento** valores: CC, NIT 

### Idioma
- Toda la interfaz está en **español**.  

### Formatos de fecha
- las fechas siempre en todas las vistas se mostrar con el formato DD/MM/AAA

### Formato de placa
- Las placas en todas las vistas se veran con el fomato ABC123 y se ara conversión automática a mayúsculas. 

### Usuario
- El sisitema tendra un unico usuario con total accesos a todas la funcionalidades del sistema 



VISTA 1 — Pantalla de inicio de sesión, 
VISTA 2 — Pantalla principal del sistema, 
VISTA 3 — Panel principal (Búsqueda y Filtros),
VISTA 4 — Formulario de nuevo registro, 
VISTA 5 — Guardado Rápido, 
VISTA 6 — Formulario de actualización, 
VISTA 7 — Formulario de actualización de registro incompleto, 
VISTA 8 — Panel de gestionar placas, 
VISTA 9 — Panel de vista previa de reporte mensual antes de descarga,  
VISTA 10 — Panel de registros pendientes por completar
