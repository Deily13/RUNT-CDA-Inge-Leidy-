# Estructura de la Base de datos

- Las fechas tendrán formato DD/MM/AAAA
- Estados:

  | Estado          | Origen de la transición  | Descripción                                                                                                                                                   |
    |-----------------|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | **Inédito**     | Automático (por defecto) | Estado inicial de todo registro al momento de creación.                                                                                                       |
  | **Vencido**     | Automático (cron)        | Registros en estado Inédito que no avanzaron antes del cambio de mes.                                                                                         |
  | **Reportado**   | Manual                   | Se registra la fecha exacta en que se efectuó el reporte.                                                                                                     |
  | **Ingresado**   | Manual                   | Se registra la fecha exacta en el vehiculo fue al CDA. aun en duda por redundancia de informacion                                                             |
  | **Actualizado** | Manual                   | El registro fue revisado y aprobado, Registros con `Fin_Vigencia_RTM` en 2027; permanecen en este estado, al cambio de año regresa a Inédito automáticamente. |
  | **Declinado**   | Manual                   | El registro fue gestionado, pero la gestion no fue exitosa y se agrega un comentario                                                                          |
---



- Tablas = vehicle, owner, technical_inspection, report, quick_record

### Tabla vehicle
Columnas: plate, owner_id, category, brand, model_year, line

### Tabla owner
Columnas: id, document_number, document_type, full_name, phone1, phone2

### Tabla technical_inspection
Columnas: id, vehicle_id, valid_from, valid_until, status, origin, price, discount

### Tabla report
Columnas: id, vehicle_id, inspection_id, report_date, entry_date, comment, is_complete

### Tabla quick_record
Columnas: id, plate, phone, ownership_card, rtm_status, origin, report_date, is_complete, created_at
---

# Sentencias SQL

```sql
-- BASE DE DATOS: GESTIÓN DE VEHÍCULOS Y RTM

CREATE TYPE document_type_enum AS ENUM ('CC', 'NIT');

CREATE TYPE vehicle_category_enum AS ENUM (
    'Motocicleta',
    'Automovil',
    'Campero',
    'Motocarguero',
    'Camioneta',
    'Camión',
    'Bus',
    'Microbús',
    'Tractocamión',
    'Volqueta'
);

CREATE TYPE rtm_status_enum AS ENUM (
    'Inedito',
    'Vencido',
    'Reportado',
    'Ingresado',
    'Actualizado',
    'Declinado'
);

CREATE TYPE comment_enum AS ENUM (
    'Realizada',
    'no en Villao',
    'no contesto',
    'traspaso',
    'desviado',
    'fuera de servicio'
);

CREATE TYPE origin_enum AS ENUM ('taller', 'cliente');

---- ============================================================
-- 1. TABLAS PRINCIPALES
-- ============================================================

-- Propietario
CREATE TABLE owner (
    id                SERIAL        PRIMARY KEY,
    document_number   VARCHAR(13)   UNIQUE NOT NULL CHECK (document_number ~ '^\d+$'),
    document_type     document_type_enum NOT NULL,
    full_name         VARCHAR(100)  NOT NULL CHECK (full_name ~ '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$'),
    phone1            CHAR(10)      NOT NULL CHECK (phone1 ~ '^\d{10}$'),
    phone2            CHAR(10)      CHECK (phone2 ~ '^\d{10}$'),
    updated_at        TIMESTAMP     DEFAULT NOW()
);

-- Vehículo
CREATE TABLE vehicle (
    plate             CHAR(6)       PRIMARY KEY,
    owner_id          INT           NOT NULL REFERENCES owner(id),
    category          vehicle_category_enum NOT NULL,
    brand             VARCHAR(15),
    model_year        CHAR(4)       CHECK (model_year ~ '^\d{4}$'),
    line              VARCHAR(60),
    updated_at        TIMESTAMP     DEFAULT NOW()
);

-- Revisión TecnoMecánica
CREATE TABLE technical_inspection (
    id                SERIAL        PRIMARY KEY,
    vehicle_id        CHAR(6)       NOT NULL REFERENCES vehicle(plate),
    valid_from        DATE,
    valid_until       DATE,
    status            rtm_status_enum NOT NULL,
    origin            origin_enum   NOT NULL,
    price             NUMERIC(6,0)  NOT NULL CHECK (price >= 0),
    discount          NUMERIC(2,0)  CHECK (discount BETWEEN 1 AND 50),
    device_origin     VARCHAR(1)    CHECK (device_origin IN ('A', 'B')),
    updated_at        TIMESTAMP     DEFAULT NOW(),
    CONSTRAINT valid_date_range CHECK (valid_until > valid_from)
);

-- Reporte
CREATE TABLE report (
    id                SERIAL        PRIMARY KEY,
    vehicle_id        CHAR(6)       NOT NULL REFERENCES vehicle(plate),
    inspection_id     INT           REFERENCES technical_inspection(id),
    report_date       DATE,
    entry_date        DATE,
    comment           comment_enum,
    is_complete       BOOLEAN       NOT NULL DEFAULT FALSE,
    device_origin     VARCHAR(1)    CHECK (device_origin IN ('A', 'B')),
    updated_at        TIMESTAMP     DEFAULT NOW(),
    CONSTRAINT entry_after_report CHECK (entry_date >= report_date)
);


-- ============================================================
-- 2. FUNCION Y TRIGGERS: updated_at automático en cada UPDATE
-- ============================================================

CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_owner_updated_at
    BEFORE UPDATE ON owner
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_vehicle_updated_at
    BEFORE UPDATE ON vehicle
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_technical_inspection_updated_at
    BEFORE UPDATE ON technical_inspection
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_report_updated_at
    BEFORE UPDATE ON report
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();


-- ============================================================
-- 3. TABLA NUEVA: sync_log
-- Registra cada INSERT, UPDATE o DELETE en las tablas
-- de negocio. Spring Boot la consulta cada 10 seg para
-- enviar cambios pendientes al otro dispositivo.
--
-- operation INSERT/DELETE → data contiene snapshot completo
-- operation UPDATE        → data contiene { before:{}, after:{} }
-- changed_fields          → solo en UPDATE, campos modificados
-- transaction_id          → agrupa tablas del mismo evento de usuario
--                           el receptor las aplica todas o ninguna
-- ============================================================

CREATE TABLE sync_log (
    id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    device          VARCHAR(1)    NOT NULL CHECK (device IN ('A', 'B')),
    table_name      VARCHAR(30)   NOT NULL CHECK (table_name IN (
                        'owner',
                        'vehicle',
                        'technical_inspection',
                        'report'
                    )),
    operation       VARCHAR(10)   NOT NULL CHECK (operation IN (
                        'INSERT',
                        'UPDATE',
                        'DELETE'
                    )),
    record_id       VARCHAR(50)   NOT NULL,
    changed_fields  TEXT[],
    data            JSONB         NOT NULL,
    created_at      TIMESTAMP     DEFAULT NOW(),
    synced          BOOLEAN       DEFAULT FALSE,
    synced_at       TIMESTAMP,
    transaction_id  UUID          NOT NULL
);

CREATE INDEX idx_sync_log_synced     ON sync_log (synced)      WHERE synced = FALSE;
CREATE INDEX idx_sync_log_device     ON sync_log (device);
CREATE INDEX idx_sync_log_created_at ON sync_log (created_at);
CREATE INDEX idx_sync_log_tx         ON sync_log (transaction_id);


-- ============================================================
-- 4. TABLA NUEVA: cron_jobs
-- Controla ejecución de tareas programadas.
-- Permite catch-up al arrancar: Spring Boot ejecuta
-- todas las tareas con scheduled_time pasado y executed = FALSE.
--
-- Tareas registradas:
--   'vencido_mensual' → Inédito → Vencido al cambio de mes
--   'inedito_anual'   → Actualizado → Inédito al cambio de año
-- ============================================================

CREATE TABLE cron_jobs (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    job_name         VARCHAR(50)  NOT NULL,
    scheduled_time   TIMESTAMP    NOT NULL,
    executed         BOOLEAN      DEFAULT FALSE,
    executed_at      TIMESTAMP,
    executed_by      VARCHAR(1)   CHECK (executed_by IN ('A', 'B')),
    affected_records INT          DEFAULT 0,
    CONSTRAINT uq_cron_job UNIQUE (job_name, scheduled_time)
);

CREATE INDEX idx_cron_jobs_pending ON cron_jobs (executed, scheduled_time)
    WHERE executed = FALSE;


-- ============================================================
-- 5. TABLA NUEVA: sync_conflicts
-- Registra conflictos cuando ambos dispositivos modifican
-- el mismo registro estando offline.
-- Resolución: automática (Last Write Wins) en datos simples
--             o manual desde el dashboard en datos críticos.
-- ============================================================

CREATE TABLE sync_conflicts (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name      VARCHAR(30)  NOT NULL,
    record_id       VARCHAR(50)  NOT NULL,
    data_device_a   JSONB,
    data_device_b   JSONB,
    detected_at     TIMESTAMP    DEFAULT NOW(),
    resolved        BOOLEAN      DEFAULT FALSE,
    resolved_at     TIMESTAMP,
    resolved_by     VARCHAR(1)   CHECK (resolved_by IN ('A', 'B')),
    winning_data    JSONB,
    CONSTRAINT chk_conflict_table CHECK (table_name IN (
        'owner',
        'vehicle',
        'technical_inspection',
        'report'
    ))
);

CREATE INDEX idx_sync_conflicts_pending ON sync_conflicts (resolved)
    WHERE resolved = FALSE;


-- ============================================================
-- 6. DATOS INICIALES: cron_jobs
-- Spring Boot genera las siguientes entradas automáticamente
-- al finalizar cada ejecución exitosa.
-- ============================================================

-- Último día del mes actual a las 23:59:59
INSERT INTO cron_jobs (job_name, scheduled_time)
VALUES (
    'vencido_mensual',
    DATE_TRUNC('month', NOW()) + INTERVAL '1 month' - INTERVAL '1 second'
);

-- Último día del año actual a las 23:59:59
INSERT INTO cron_jobs (job_name, scheduled_time)
VALUES (
    'inedito_anual',
    DATE_TRUNC('year', NOW()) + INTERVAL '1 year' - INTERVAL '1 second'
);


-- ============================================================
-- 7. VERIFICACION FINAL
-- ============================================================

-- Tablas principales y sus columnas nuevas
SELECT table_name, column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name IN ('owner', 'vehicle', 'technical_inspection', 'report')
  AND column_name IN ('updated_at', 'device_origin')
ORDER BY table_name, column_name;

-- Tablas nuevas creadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('sync_log', 'cron_jobs', 'sync_conflicts')
ORDER BY table_name;

-- Triggers creados
SELECT trigger_name, event_object_table, event_manipulation
FROM information_schema.triggers
WHERE trigger_name LIKE 'trg_%_updated_at'
ORDER BY event_object_table;

-- Cron jobs iniciales insertados
SELECT job_name, scheduled_time, executed
FROM cron_jobs
ORDER BY scheduled_time;
