
#  Arquitectura De Interfaces

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
- Fondo: 0B0E14-100%
- Texto: Baskervville SC 
80 puntos 
FFFFFF-100%

- **Formulario de acceso:**  
  Campos de correo electrónico y contraseña para la validación de credenciales.
Fondo: 191C22-10%
-Boton: degradado  39FF14-100%  00DBE9-100%
-Titulo: Space Grotesk 36 puntos FFFFFF-100%

---

### VISTA 2 — Panel principal (Búsqueda y Filtros)

Esta vista permitira realizar busquedas y consultar registros especificos existentes y acceder a funciones individuales sobre cada registro.

### Funciones técnicas

- **Consulta de registros:** En el formulario llamado filtros de busqueda se pueden seleccionar los parametros con los que se quieres que los datos mostrados cohicidan

- **Limpiar filtro:** En el escenario donde se desee corrar el contenido de varios campos a la vez esta opcion limipiara el contenido de todos los campos

- **Seleccionar acciones individuales para cada registro:** Cada fila de la tabla de ressultado de la consulta tiene opciones de repuesta individuales (editar, gestionar, eliminar)

- - **Actualizar registro** Nos redireccionara al vista para actualizar registro existente.
- - **Gestionar registro** Nos redireccionara a la vista para gestionar el registro especifico.
- - **Eliminar registro** Nos eliminara el registro especifico, despues de haber confirmado la accion.

- **Ingresar un nuevo registro** Nos redijira a la vista para crear un nuevo registro
- **Ver vista previa del reporte mensual** Nos redirijira a la vista previa del reporte mensual antes de ser descargado.

- Panel de filtros dentro de una tarjeta blanca con borde izquierdo verde.
  Controles en cuadrícula responsiva:
  - Fecha específica → selector de fecha (calendario)
  - Mes y año → dos menús desplegables independientes
  - Categoría de vehículo → menú desplegable (selección única)
  - Número de documento → campo numérico
  - Placa → campo alfanumérico, máximo 6 caracteres
  - Tipo de documento → desplegable: "Cédula de ciudadanía" o "NIT"
  - Estado → menú desplegable

Botones de acción (esquina superior derecha):
- "Vista Previa de Reporte" → botón con borde negro, fondo blanco
- "Nuevo Registro" → botón verde sólido, texto blanco, bordes redondeados
- "Cerrar sesion" → boton negro solido, texto blanco, bordes redondeado

Debajo de los filtros: tabla vacía sobre tarjeta blanca con encabezado negro
y filas con resaltado verde al pasar el cursor. Columnas:
Fecha inicio vigencia | Fecha fin vigencia | Placa | Estado | Documento |
Tipo de documento | Categoría | Línea | Nombre del propietario |
Teléfono 1 | Teléfono 2 | Acciones

Columna de acciones con íconos y tooltip al pasar el cursor:
- ✏️ Actualizar → ícono verde
- 🔄 Tramitar → ícono Azul
- 🗑️ Eliminar → ícono rojo (única excepción en la paleta)

---

### VISTA 3 — Formulario de nuevo registro
Página blanca con formulario centrado en una tarjeta con barra de título negra
e indicadores de campo obligatorio (*) en verde.
Todos los campos son obligatorios:
- Fecha inicio vigencia → selector de fecha (no puede superar la fecha actual)
- Fecha fin vigencia → calculada automáticamente (inicio + 365 días), solo lectura
- Placa → 6 caracteres alfanuméricos, se guarda en mayúsculas
- Estado → menú desplegable
- Documento → solo numérico
- Tipo de documento → desplegable: "Cédula de ciudadanía" / "NIT"
- Categoría → menú desplegable
- Línea → alfanumérico en mayúsculas, formato [Marca]linea
- Nombre del propietario → solo caracteres alfabéticos, en mayúsculas
- Teléfono 1 → exactamente 10 dígitos numéricos
- Teléfono 2 → exactamente 10 dígitos numéricos

Pie de formulario: botón verde sólido "Guardar" (alineado a la derecha)
+ botón con borde negro "Cancelar".

---

### VISTA 4 — Formulario de actualización
Mismo diseño que la Vista 3. Campos editables resaltados con borde izquierdo verde:
- Fecha inicio vigencia
- Fecha fin vigencia (recalculada automáticamente)
- Documento del propietario
- Nombre del propietario
- Teléfono 1 y Teléfono 2
- Estado

Campos de solo lectura: fondo gris claro (#F3F4F6), texto en tono suave.
Pie de formulario: botón verde sólido "Guardar" + botón con borde negro "Cancelar".

---

### VISTA 5 — Panel de Tramitar
Tres secciones claramente separadas dentro de una tarjeta blanca:

1. **Mensaje** — Burbuja estilo WhatsApp (fondo verde claro #DCFCE7,
   texto negro, esquinas redondeadas). Contenido dinámico según el registro:
   "Hola 👋, soy la Ing. Leidy del CDA Llano Verde – Tecno-mecánica.
   Queremos recordarte que la Revisión Técnico-Mecánica de tu vehículo
   de placa [PLACA] venció el [FECHA].
   ✅ Vehículo particular: $320.000
   ✅ Vehículo público: $317.500
   ✅ Moto: $220.000
   📅 Lunes a viernes: 7am–7pm | Sábados: 8am–5pm | Domingos y festivos: 8am–1pm
   📍 Carrera 33 #23–57, Barrio San Benito, Villavicencio, Meta 500004
   ¡No lo dejes para última hora!"
   Botón "Copiar mensaje" → borde verde, fondo blanco.

2. **Reportar** — Tarjeta compacta:
  - Selector de fecha con anillo de enfoque verde
  - Botón verde sólido "Guardar"

3. **Declinado** — Tarjeta de confirmación con dos botones:
  - "Conservar" → botón con borde verde
  - "Eliminar" → botón con borde rojo (peligro)

---

### Requisitos generales de diseño:
- Layout responsivo con enfoque en escritorio.
- Estado de enfoque en inputs: borde verde.
- Validación de formularios: borde rojo + mensaje de error debajo del campo.
- Estado vacío de tabla: ícono verde centrado + mensaje "Sin resultados".
- Transiciones suaves entre vistas.
- Todo el texto de la interfaz en español.
- Usar Tailwind CSS con componentes de shadcn/ui.
