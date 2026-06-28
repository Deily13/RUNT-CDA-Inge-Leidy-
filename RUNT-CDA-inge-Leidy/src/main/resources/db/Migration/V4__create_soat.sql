-- Enum aseguradoras SOAT
CREATE TYPE insurance_company_enum AS ENUM (
  'Sura',
  'Bolívar',
  'Mapfre',
  'Allianz',
  'Axa',
  'Liberty',
  'Equidad',
  'Previsora',
  'Mundial',
  'Cardif'
  );

-- Tabla SOAT (sin relaciones con ninguna otra tabla)
CREATE TABLE soat (
                    id                  SERIAL                  PRIMARY KEY,
                    start_date          DATE                    NOT NULL,
                    end_date            DATE                    NOT NULL,
                    category            vehicle_category_enum   NOT NULL,
                    plate               CHAR(6)                 NOT NULL,
                    representative_name VARCHAR(100)            NOT NULL,
                    document_number     VARCHAR(13)             NOT NULL,
                    phone               CHAR(10)                NOT NULL,
                    email               VARCHAR(100),
                    insurance_company   insurance_company_enum  NOT NULL,
                    price               NUMERIC(6,0)            NOT NULL,

                    CONSTRAINT chk_soat_dates CHECK (end_date >= start_date)
);
