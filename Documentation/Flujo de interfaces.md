# Flujo de Navegación de Vistas

Este documento describe el flujo de navegación entre las diferentes vistas del sistema. 

---

## Vistas Principales

- **VISTA 1 — Pantalla de inicio de sesión**
  - Acceso directo a **VISTA 2 — Pantalla principal del sistema**.

- **VISTA 2 — Pantalla principal del sistema**
  - Acceso directo a:
    - **VISTA 3 — Panel principal (Búsqueda y Filtros)**
    - **VISTA 4 — Formulario de nuevo registro**
    - **VISTA 5 — Guardado rápido**
    - **VISTA 6 — Formulario de actualización**
    - **VISTA 8 — Panel de gestionar placas**
    - **VISTA 9 — Vista previa de reporte mensual antes de descarga**
    - **VISTA 10 — Panel de registros pendientes por completar**

---

## Flujos Específicos

- **VISTA 3 — Panel principal (Búsqueda y Filtros)**
  - Regresa a **VISTA 2**
  - Acceso a **VISTA 6**
  - Acceso a **VISTA 8**

- **VISTA 4 — Formulario de nuevo registro**
  - Regresa a **VISTA 2**
  - Acceso a **VISTA 6**
  - Acceso a **Vista RUNT**

- **VISTA 5 — Guardado rápido**
  - Regresa a **VISTA 2**

- **VISTA 6 — Formulario de actualización**
  - Acceso a **VISTA 2**
  - Regresa a  **VISTA 3**
  - Acceso a **Vista RUNT**

- **VISTA 7 — Formulario de actualización de registro incompleto**
  - Regresa a **VISTA 2**
  - Acceso a **Vista RUNT**

- **VISTA 8 — Panel de gestionar placas**
  - Regresa a **VISTA 2**
  - Regresa a  **VISTA 3**

- **VISTA 9 — Vista previa de reporte mensual antes de descarga**
  - Regresa a **VISTA 2**

- **VISTA 10 — Panel de registros pendientes por completar**
  - Regresa a **VISTA 2**
  - Acceso a **VISTA 7**

---

## Vista RUNT

- Accesible desde:
  - **VISTA 4 — Formulario de nuevo registro**
  - **VISTA 6 — Formulario de actualización**
  - **VISTA 7 — Formulario de actualización de registro incompleto**

---

## Menú Desplegable

- Presente en varias vistas (**VISTA 2, 3, 4, 6, 8, 9, 10**)
- Permite acceso dinámico a más vistas dependiendo de la página en la que se encuentre el usuario.

---

## Resumen

El flujo asegura que la **Pantalla principal (VISTA 2)** actúe como eje central de navegación, mientras que las vistas de formularios y paneles mantienen accesos de retorno al sistema principal. 
La **Vista RUNT** se integra como destino especializado desde formularios de registro y actualización, RUNT es la vista externa al sistema.
El **menú desplegable** complementa la navegación ofreciendo accesos adicionales según el contexto.
