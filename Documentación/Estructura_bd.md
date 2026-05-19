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
    'Automóvil',
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


-- ============================================================
-- TABLAS
-- ============================================================

-- Propietario
CREATE TABLE owner (
    id                SERIAL PRIMARY KEY,
    document_number   VARCHAR(13)   UNIQUE NOT NULL CHECK (document_number ~ '^\d+$'),
    document_type     document_type_enum NOT NULL,
    full_name         VARCHAR(100)  NOT NULL CHECK (full_name ~ '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$'),
    phone1            CHAR(10)      NOT NULL CHECK (phone1 ~ '^\d{10}$'),
    phone2            CHAR(10)      CHECK (phone2 ~ '^\d{10}$')
);

-- Vehículo
CREATE TABLE vehicle (
    plate             CHAR(6)       PRIMARY KEY,
    owner_id          INT           NOT NULL REFERENCES owner(id),
    category          vehicle_category_enum NOT NULL,
    brand             VARCHAR(15),
    model_year        CHAR(4)       CHECK (model_year ~ '^\d{4}$'),
    line              VARCHAR(60)
);

-- Revisión TecnoMecánica
CREATE TABLE technical_inspection (
    id                SERIAL PRIMARY KEY,
    vehicle_id        CHAR(6)       NOT NULL REFERENCES vehicle(plate),
    valid_from        DATE,
    valid_until       DATE,
    status            rtm_status_enum NOT NULL,
    origin            origin_enum   NOT NULL,
    price             NUMERIC(6,0)  NOT NULL CHECK (price >= 0),
    discount          NUMERIC(2,0)  CHECK (discount BETWEEN 1 AND 50),

    CONSTRAINT valid_date_range CHECK (valid_until > valid_from)
);

-- Reporte
CREATE TABLE report (
    id                SERIAL PRIMARY KEY,
    vehicle_id        CHAR(6)       NOT NULL REFERENCES vehicle(plate),
    inspection_id     INT           REFERENCES technical_inspection(id),
    report_date       DATE,
    entry_date        DATE,
    comment           comment_enum,
    is_complete       BOOLEAN       NOT NULL DEFAULT FALSE,

    CONSTRAINT entry_after_report CHECK (entry_date >= report_date)
);

-- Registro Rápido
CREATE TABLE quick_record (
    id                SERIAL PRIMARY KEY,
    plate             CHAR(6)       NOT NULL REFERENCES vehicle(plate),
    phone             CHAR(10)      CHECK (phone ~ '^\d{10}$'),
    ownership_card    BYTEA,
    rtm_status        rtm_status_enum NOT NULL,
    origin            origin_enum   NOT NULL,
    report_date       DATE,
    is_complete       BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMP     DEFAULT NOW()
);