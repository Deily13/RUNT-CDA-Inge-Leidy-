-- BASE DE DATOS: GESTIÓN DE VEHÍCULOS Y RTM

CREATE TYPE document_type_enum AS ENUM ('CC', 'NIT');

CREATE TYPE vehicle_category_enum AS ENUM (
    'MOTOCICLETA',
    'AUTOMOVIL',
    'CAMPERO',
    'MOTOCARGUERO',
    'CAMIONETA'

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
                     full_name         VARCHAR(100)  NOT NULL CHECK (full_name ~ '^[a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜñÑ\s.\-,''&]+$'),
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
