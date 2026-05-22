```mermaid
flowchart TD
    V1["VISTA 1 — Inicio de sesión"] --> V2["VISTA 2 — Pantalla principal"]

    V2 --> V3["VISTA 3 — Panel principal (Búsqueda y Filtros)"]
    V2 --> V4["VISTA 4 — Formulario de nuevo registro"]
    V2 --> V5["VISTA 5 — Guardado rápido"]
    V2 --> V6["VISTA 6 — Formulario de actualización"]
    V2 --> V8["VISTA 8 — Panel de gestionar placas"]
    V2 --> V9["VISTA 9 — Vista previa reporte mensual"]
    V2 --> V10["VISTA 10 — Registros pendientes"]

    V3 --> V2
    V3 --> V6
    V3 --> V8

    V4 --> V2
    V4 --> V6
    V4 --> RUNT["Vista RUNT"]

    V5 --> V2

    V6 --> V2
    V6 --> RUNT

    V7["VISTA 7 — Actualización registro incompleto"] --> V2
    V7 --> RUNT

    V8 --> V2
    V9 --> V2

    V10 --> V2
    V10 --> V7

    %% Nota sobre menú desplegable
    subgraph Menu["Menú desplegable"]
        M1["Acceso a más vistas según página"]
    end
    V2 --- Menu
    V3 --- Menu
    V4 --- Menu
    V6 --- Menu
    V8 --- Menu
    V9 --- Menu
    V10 --- Menu
