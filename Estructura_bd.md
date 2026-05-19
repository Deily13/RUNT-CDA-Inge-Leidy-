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

- Tablas = Vehiculo, Propietario, Revision_TecnoMecanica, reporte

### Tabla Vehiculo
Columnas: placa, marca, línea, modelo, categoria

### Tabla Propietario
Columnas: documento, tipo_documento, nombre, telefono1, telefono2

### Tabla Vehiculo_RTM
Columnas: id, vehiculo_placa, estado_id, inicio_rtm, fin_rtm

### Tabla Estado
Columnas: id, nombre, descripción

### Tabla Guardado Rapido
Columnas: targeta_propiedad, placa, telefono, estado_id, nivel_completitud

### Tabla Reporte
Columnas: fecha_reporte, fecha_ingreso, tipo_cliente, precio, descuento, comentario

---

# Sentencias SQL

```sql
-- BASE DE DATOS: GESTIÓN DE VEHÍCULOS Y RTM

CREATE TYPE tipo_doc_enum AS ENUM ('CC', 'NIT');

CREATE TYPE categoria_enum AS ENUM (
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

CREATE TYPE estado_rtm_enum AS ENUM (
    'Inedito',
    'Vencido',
    'Reportado',
    'Ingresado',
    'Actualizado',
    'Declinado'
);


CREATE TYPE comentario_enum AS ENUM ('Realizada', 'no en Villao', 'no contesto', 'traspaso', 'desviado', 'fuera de servicio');


CREATE TYPE procedencia_enum AS ENUM ('taller', 'cliente');


--Propietario
CREATE TABLE propietario (
    id               SERIAL PRIMARY KEY,
    numero_documento VARCHAR(13) UNIQUE NOT NULL CHECK (numero_documento ~ '^\d+$'),
    tipo_documento   tipo_doc_enum NOT NULL,
    nombre           VARCHAR(100) NOT NULL CHECK (nombre ~ '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$'),
    telefono1        CHAR(10) NOT NULL CHECK (telefono1 ~ '^\d{10}$'),
    telefono2        CHAR(10) CHECK (telefono2 ~ '^\d{10}$')
);

-- Vehículo
CREATE TABLE vehiculo (
    placa           CHAR(6) UNIQUE NOT NULL PRIMARY KEY,
    propietario_id  INT NOT NULL REFERENCES propietario(id),
    categoria       categoria_enum NOT NULL,
    marca           VARCHAR(15),
    modelo          CHAR(4)  CHECK (modelo ~ '^\d{4}$'),
    linea           VARCHAR(60)
);

-- RevisionTecnoMecanica
CREATE TABLE revision_tecnoMecanica (
    id              SERIAL PRIMARY KEY,
    vehiculo_id     CHAR(6) NOT NULL REFERENCES vehiculo(placa),
    inicio_vigencia DATE,
    fin_vigencia    DATE,
    estado          estado_rtm_enum NOT NULL,
    procedencia     procedencia_enum NOT NULL,
    precio          NUMERIC(6,0) NOT NULL CHECK (precio >= 0),
    descuento       NUMERIC(2,0) CHECK (descuento BETWEEN 1 AND 50),
    
    CONSTRAINT vigencia_coherente CHECK (fin_vigencia > inicio_vigencia)
);

-- Reporte
CREATE TABLE reporte (
    id                  SERIAL PRIMARY KEY,
    vehiculo_id         CHAR(6) NOT NULL REFERENCES vehiculo(placa),
    rtm_id              INT REFERENCES revision_tecnomecanica(id),
    fecha_reporte       DATE,
    fecha_ingreso       DATE,
    comentario          comentario_enum,
    estado_completitud  BOOLEAN NOT NULL DEFAULT FALSE
            
    CONSTRAINT ingreso_posterior_o_igual CHECK (fecha_ingreso >= fecha_reporte)

);


CREATE TABLE registro_rapido (
    id             SERIAL PRIMARY KEY,
    placa CHAR(6) NOT NULL REFERENCES vehiculo(placa),
    telefono       CHAR(10) CHECK (telefono ~ '^\d{10}$'),
    tarjeta_prop   BYTEA,           -- imagen de tarjeta de propiedad
    estado_rtm     estado_rtm_enum NOT NULL,
    procedencia    procedencia_enum NOT NULL,
    fecha_reporte  DATE,            -- solo si estado = 'Reportado'
    estado_completitud BOOLEAN          NOT NULL DEFAULT FALSE,
    creado_en      TIMESTAMP DEFAULT NOW()
);
