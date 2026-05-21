# Sistema de Gestión Local — Sincronización entre 2 Laptops

##  Problemas y Soluciones

### 1️ Conectividad entre dispositivos en redes distintas
- **Problema:** Las dos laptops están en ubicaciones geográficas diferentes, cada una en su propia red local. No pueden verse entre sí directamente y no se quiere exponer el sistema a internet ni a terceros.
- **Solución:** **Tailscale VPN**
  - Crea una red privada exclusiva entre los 2 dispositivos
  - Nadie más puede acceder
  - Gratuito hasta 3 dispositivos
  - 5 minutos de configuración
- **Costo:** Gratuito
- **Complejidad:** 🟢 Baja
- **Herramientas:** Tailscale
- **Escalabilidad:** Se agrega un dispositivo C en 5 minutos. Si B sale, A no se ve afectado.

---

### 2️ Independencia operativa de cada dispositivo
- **Problema:** Si el Dispositivo A sufre un corte eléctrico u otro imprevisto, el Dispositivo B debe seguir trabajando con normalidad.
- **Solución:** Cada dispositivo tiene su propia instancia completa:  



- **Costo:** Ninguno adicional
- **Complejidad:** 🟡 Media
- **Herramientas:** Spring Boot + Angular + PostgreSQL
- **Escalabilidad:** Si B sale, A desactiva el sync y sigue funcionando.

---

### 3️ Sincronización bidireccional de la base de datos
- **Problema:** Los cambios en A deben verse en B y viceversa, en tiempo real o diferido.
- **Solución:** **Tabla `sync_log` + scheduler cada 10 segundos**
- Cambio en A → se guarda en BD de A
- Se registra en `sync_log`
- Scheduler lo envía a B si está online
- Si B está offline, queda como pendiente
- Al volver, recibe todos los pendientes
- **Costo:** Ninguno adicional
- **Complejidad:** 🟡 Media
- **Herramientas:** Spring Boot Scheduler + PostgreSQL
- **Escalabilidad:** Se agrega C como destino en `sync_log`.

---

### 4️ Conflictos por edición simultánea offline
- **Problema:** Ambos dispositivos editan el mismo registro estando offline.
- **Solución:**
- **Datos simples:** *Last Write Wins* (gana el cambio más reciente).
- **Datos críticos:** Notificación en dashboard para que el usuario decida.
- **Costo:** Ninguno adicional
- **Complejidad:** 🟡 Media
- **Herramientas:** Timestamps en `sync_log` + notificación en Angular
- **Escalabilidad:** Aplica igual con más dispositivos.

---

### 5️ Tareas Cron en entorno local
- **Problema:** Spring Boot solo ejecuta crons mientras la app está abierta.
- **Solución:** **3 capas de protección en el dispositivo designado**
- **Capa 1 — Task Scheduler del SO**
  - Lanza el JAR en modo cron aunque la app esté cerrada.
- **Capa 2 — Catch-up al arrancar**
  - Detecta ejecuciones perdidas y las ejecuta en orden.
- **Capa 3 — Tabla `cron_jobs` en BD**
  - Registro de cada ejecución con estado.
  - Evita doble ejecución y sincroniza resultados.
- **Costo:** Ninguno adicional
- **Complejidad:** 🟢 Baja
- **Herramientas:** Task Scheduler (Windows) / Crontab (Linux/Mac) + Spring Boot + tabla `cron_jobs`
- **Escalabilidad:** Se reasigna el rol en menos de 30 minutos.

---

### 6 Sincronización de hora entre dispositivos
- **Problema:** Diferencias de reloj generan conflictos falsos.
- **Solución:** **NTP activo en ambas laptops** + alerta si hay diferencia > 5 segundos.
- **Costo:** Ninguno
- **Complejidad:** 🟢 Baja
- **Herramientas:** NTP del SO + verificación en Spring Boot
- **Escalabilidad:** Aplica igual para cualquier número de dispositivos.

---

### 7 Escalabilidad del sistema completo

| Escenario | Acción | Tiempo |
|-----------|--------|--------|
| B sale del sistema | Desactivar sync en A, apagar Tailscale | 5 min |
| Entra dispositivo C | Instalar sistema, restaurar BD, conectar Tailscale, activar sync | 30 min |
| Solo queda A | No hacer nada, A ya funciona solo | 0 min |
| B vuelve después de meses | Reactivar Tailscale, sync jala pendientes | 10 min |

---

## Flujo Completo del Sistema

### AMBOS DISPOSITIVOS ONLINE
1. Usuario A hace un cambio
2. Spring Boot guarda en PostgreSQL de A
3. Registra en `sync_log` (pendiente)
4. Scheduler cada 10 seg envía a B vía Tailscale
5. B recibe y aplica en su BD
6. Angular de B actualiza en tiempo real vía WebSocket
7. `sync_log` marca como sincronizado 

---

### DISPOSITIVO A SE CAE
- B detecta que A no responde
- B sigue trabajando con su propia BD
- Cambios se guardan localmente
- `sync_log` los marca como pendientes
- B no se ve afectado 

---

### DISPOSITIVO A VUELVE
- A rranca Spring Boot
- CatchUp ejecuta cron_jobs perdidos
- Scheduler detecta cambios pendientes de B
- Los aplica en BD de A
- Si hay conflictos → timestamp o alerta al usuario
- Ambas BDs quedan iguales 

---

### CRON — DISPOSITIVO DESIGNADO APAGADO
- Laptop apagada 3 días
- Al encender, CatchUp detecta ejecuciones perdidas
- Las ejecuta en orden cronológico
- Resultados se sincronizan al otro dispositivo 
