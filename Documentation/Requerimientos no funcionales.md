# Requerimientos del Sistema — Gestor CDA

> **Documento:** Especificación de Requerimientos de Software  
> **Versión:** 1.0  
> **Clasificación:** Uso interno · Confidencial  
> **Basado en:** Reglas del Sistema v1.0

---

## Tabla de Contenidos
- [2. Requerimientos No Funcionales](#2-requerimientos-no-funcionales)
  - [RNF-01 Seguridad](#rnf-01-seguridad)
  - [RNF-02 Validación y Consistencia de Datos](#rnf-02-validación-y-consistencia-de-datos)
  - [RNF-03 Automatización y Programación de Tareas](#rnf-03-automatización-y-programación-de-tareas)
  - [RNF-04 Usabilidad](#rnf-04-usabilidad)
  - [RNF-05 Mantenibilidad y Configurabilidad](#rnf-05-mantenibilidad-y-configurabilidad)
- [3. Anexos](#3-anexos)
  - [Anexo A — Catálogo de Estados y Transiciones](#anexo-a--catálogo-de-estados-y-transiciones)
  - [Anexo B — Catálogo de Precios](#anexo-b--catálogo-de-precios)
  - [Anexo C — Columnas del Reporte Mensual](#anexo-c--columnas-del-reporte-mensual)

---


## 2. Requerimientos No Funcionales

Los requerimientos no funcionales describen las cualidades, restricciones y propiedades del sistema que no corresponden a comportamientos funcionales directos.

---

### RNF-01 Seguridad

| ID | Requerimiento |
|----|---------------|
| RNF-01.1 | El sistema debe implementar autenticación basada en **JWT**; el token debe ser validado en cada solicitud. |
| RNF-01.2 | El sistema debe operar bajo un modelo de **acceso único**: no existen roles públicos ni de lectura parcial. |
| RNF-01.3 | El sistema debe bloquear el guardado de registros incompletos según las restricciones de integridad definidas (ej. RF-10.3). |

---

### RNF-02 Validación y Consistencia de Datos

| ID | Requerimiento |
|----|---------------|
| RNF-02.1 | Toda validación de campos debe ejecutarse en **tiempo real**, antes de permitir el envío del formulario. |
| RNF-02.2 | Las placas deben almacenarse siempre en **mayúsculas**. |
| RNF-02.3 | Los nombres de propietarios deben almacenarse siempre en **mayúsculas**. |
| RNF-02.4 | El campo `Línea` debe almacenarse con la nomenclatura `[CATEGORÍA]linea` (ej. `[MOTO]cb190`). |
| RNF-02.5 | Las fechas de vigencia deben calcularse con precisión exacta de **365 días** a partir del `Inicio_Vigencia`. |
| RNF-02.6 | El sistema debe garantizar que las **reglas de transición de estados** (RF-04, RF-05) no puedan ser vulneradas desde la interfaz ni directamente en la base de datos a través del sistema. |

---

### RNF-03 Automatización y Programación de Tareas

| ID | Requerimiento |
|----|---------------|
| RNF-03.1 | Las transiciones automáticas de estado (cambio de año y cambio de mes) deben implementarse mediante **tareas `cron`** configuradas con los parámetros cronológicos del sistema. |
| RNF-03.2 | Las tareas `cron` deben ejecutarse de manera confiable y sin intervención manual del ingeniero. |

---

### RNF-04 Usabilidad

| ID | Requerimiento |
|----|---------------|
| RNF-04.1 | Los resultados de búsqueda deben presentarse con **paginación** para facilitar la navegación en conjuntos grandes de datos. |
| RNF-04.2 | Los selectores de marca deben incluir **búsqueda por texto** para agilizar la selección. |
| RNF-04.3 | El selector de modelo debe generarse **dinámicamente** según los datos disponibles. |
| RNF-04.4 | El sistema debe proporcionar **retroalimentación inmediata** (mensajes emergentes) ante cada acción crítica: creación, actualización, eliminación y errores de validación. |

---

### RNF-05 Mantenibilidad y Configurabilidad

| ID | Requerimiento |
|----|---------------|
| RNF-05.1 | Los precios del sistema deben poder ser modificados en cualquier momento por el ingeniero desde el **panel de configuración**, sin necesidad de intervención técnica en el código. |
| RNF-05.2 | El formato de exportación de reportes debe ser estándar (`.xlsx`) para garantizar compatibilidad con herramientas externas. |

---

## 3. Anexos

### Anexo A — Catálogo de Estados y Transiciones

#### A.1 Estados de Completitud

| Estado | Valor | Origen | Descripción |
|--------|-------|--------|-------------|
| Incompleto | `FALSE` | Automático | Estado por defecto al crear un registro provisional. |
| Completo | `TRUE` | Manual | Se activa tras completar todos los datos fundamentales en la vista de actualización. |

> **Regla:** Un registro Completo no puede revertir a Incompleto. Un registro Incompleto no puede pasar a estado `Actualizado`.

---

#### A.2 Estados de Tramitación

| Estado | Origen | Descripción |
|--------|--------|-------------|
| **Inédito** | Automático (por defecto) | Estado inicial al crear el registro. |
| **Vencido** | Automático (`cron`) | Registros `Inédito` que no avanzaron antes del cambio de mes y cuya vigencia fue superada. |
| **Reportado** | Manual | Se registra la fecha exacta del reporte. |
| **Ingresado** | Manual | Se registra la fecha exacta en que el vehículo asistió al CDA. |
| **Actualizado** | Manual | Registro revisado y aprobado. |
| **Declinado** | Manual | Gestión no exitosa; se agrega un comentario explicativo. |

---

#### A.3 Diagrama de Transiciones de Estado

```
[Creación]
    │
    ▼
 INÉDITO ──────────────────────────────────────────────────► VENCIDO
    │                                                         (cron, cambio de mes)
    │ (manual)
    ▼
 REPORTADO
    │
    │ (manual)
    ▼
 INGRESADO
    │
    ├──── (manual) ──────────────────────────────────────► ACTUALIZADO
    │                                                          │
    └──── (manual) ──────────────────────────────────────► DECLINADO
                                                              (+ comentario)

ACTUALIZADO ──── (cron, cambio de año) ───────────────────► INÉDITO
```

> **Restricciones de retroceso:**
> - `INGRESADO` → `REPORTADO` : ❌ No permitido
> - `INGRESADO` sin pasar por `REPORTADO` : ❌ No permitido
> - `ACTUALIZADO` con completitud `INCOMPLETO` : ❌ No permitido

---

### Anexo B — Catálogo de Precios

#### B.1 Precio Normal

| Categoría | Precio (COP) |
|-----------|-------------|
| Vehículo particular | $320.000 |
| Vehículo público | $317.500 |
| Motocicleta | $220.000 |

#### B.2 Precio con Descuento (7.81%)

Aplica por **agendamiento previo** o **remisión desde taller**.

| Categoría | Precio con descuento (COP) |
|-----------|---------------------------|
| Carro (particular / público) | $295.000 |
| Motocicleta | $190.000 |

> Los precios pueden ser modificados en cualquier momento por el ingeniero desde el panel de configuración (RNF-05.1).

---

### Anexo C — Columnas del Reporte Mensual

| # | Columna | Contenido |
|---|---------|-----------|
| 1 | `Fecha_Reporte` | Fecha en que se efectuó el reporte del registro. |
| 2 | `Fecha_Ingreso` | Fecha en que el registro fue creado en el sistema. |
| 3 | `Placa` | Placa del vehículo (en mayúsculas). |
| 4 | `Categoría` | Tipo de vehículo (particular, público, motocicleta). |
| 5 | `Marca` | Marca del vehículo. |
| 6 | `Tipo_Cliente` | Persona natural (cédula) o empresa (NIT). |
| 7 | `Nombre` | Nombre completo del propietario (en mayúsculas). |
| 8 | `Proveniencia` | De taller o directo. |
| 9 | `Documento` | Número de documento del propietario. |
| 10 | `Teléfono` | Teléfono de contacto registrado. |
| 11 | `Descuento` | Descuento aplicado, si corresponde. |

> **Exclusión:** Los registros en estado `Ingresado` con completitud `Incompleto` no se incluyen en el reporte mensual (RF-11.3).

---

*Fin del documento — Gestor CDA · Requerimientos v1.0*
