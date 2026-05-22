# 📘 Documentación de la Lógica SQL (Versión Simplificada para Sincronización Temporal)

La sincronización en este esquema se plantea como una **medida temporal**, 
por lo que no se requiere un nivel de auditoría tan estricto como en sistemas permanentes. 
El diseño busca **funcionalidad práctica** y **consistencia básica**, más que trazabilidad exhaustiva.

---

## 1. Tablas Principales

### **owner**
- Propietarios de vehículos.
- Validaciones mínimas: documento numérico, nombre con caracteres válidos, teléfonos de 10 dígitos.
- `updated_at`: marca de tiempo automática para cambios.

- - Auditoría básica: suficiente para sincronización temporal.

---

### **vehicle**
- Información de vehículos vinculados a propietarios.
- Validación de año (`model_year`).
- `updated_at`: control de cambios.

- - Relación directa con `owner`. No se requiere historial detallado.

---

### **technical_inspection**
- Revisiones técnico-mecánicas.
- Validación de fechas (`valid_until > valid_from`).
- Control de precio y descuento.
- `device_origin`: procedencia del registro (A/B).

- - Se asegura consistencia mínima en datos críticos.

---

### **report**
- Reportes asociados a inspecciones.
- Validación de fechas (`entry_date >= report_date`).
- `is_complete`: estado booleano.
- `device_origin`: procedencia.

- - Control temporal básico, sin necesidad de auditoría extendida.

---

## 2. Función y Triggers

### **fn_set_updated_at**
- Actualiza `updated_at` en cada `UPDATE`.
- Aplicado en todas las tablas principales.

- - Auditoría mínima y automática, suficiente para sincronización temporal.

---

## 3. Tabla **sync_log**
- Registro de operaciones (INSERT, UPDATE, DELETE).
- `data`: snapshot completo o `{before, after}` en UPDATE.
- `transaction_id`: agrupa operaciones de un mismo evento.
- `synced`: indica si ya fue replicado.

- - Pensado para sincronización entre dispositivos, no para auditoría detallada.

---

## 4. Tabla **cron_jobs**
- Control de tareas programadas.
- `executed`: estado de ejecución.
- `executed_by`: dispositivo ejecutor.
- `affected_records`: métrica de impacto.

- - Permite catch-up al arrancar, sin necesidad de trazabilidad exhaustiva.

---

## 5. Tabla **sync_conflicts**
- Manejo de conflictos de sincronización.
- `data_device_a` / `data_device_b`: versiones en conflicto.
- `winning_data`: resolución.
- `resolved`: estado booleano.

- - Resolución automática o manual, suficiente para sincronización temporal.

---

## 6. Resolución de Conflictos

La lógica de sincronización está diseñada para que los **conflictos se resuelvan automáticamente en segundo plano**, sin que el usuario tenga que intervenir:

- **Last Write Wins (LWW):**  
  En datos simples, el último cambio recibido sobrescribe al anterior.
- **Procesamiento transparente:**  
  El usuario no percibe el proceso, ya que ocurre por debajo del sistema.
- **Conflictos críticos:**  
  En casos delicados, se registran en `sync_conflicts` y pueden resolverse manualmente desde el dashboard.
- **Experiencia de usuario:**  
  El usuario trabaja como si todo fuera local; la sincronización mantiene la coherencia entre dispositivos sin interrumpir su flujo.

---

## 7. Datos Iniciales en **cron_jobs**
- `vencido_mensual`: último día del mes.
- `inedito_anual`: último día del año.

- - Garantiza ejecución periódica de procesos básicos.

---

## 8. Verificación Final
- Consultas de validación para:
  - Columnas nuevas (`updated_at`, `device_origin`).
  - Tablas nuevas (`sync_log`, `cron_jobs`, `sync_conflicts`).
  - Triggers creados.
  - Cron jobs iniciales.

- - Buenas prácticas de verificación post-deploy.

---


### Cuando la sincronización ya no sea necesaria:
1. Se eliminan las **tablas auxiliares** (`sync_log`, `cron_jobs`, `sync_conflicts`).
2. Se descartan las **columnas agregadas** (`device_origin`, `updated_at`).
3. Se eliminan los **triggers y función de auditoría**.

- -  El diseño permite retirar la sincronización de forma **rápida y limpia**, manteniendo intacta la lógica de negocio principal.
 
✅ Conclusión

El esquema está diseñado para:
- **Sincronización práctica y temporal** entre dispositivos.
- **Integridad mínima** en datos críticos.
- **Resolución automática de conflictos** sin intervención del usuario.
