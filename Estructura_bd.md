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

- Tablas = Vehiculo, Propietario, Estado, **Vehiculo_RTM**

### Tabla Vehiculo
Columnas: placa, marca, línea, modelo, categoria

### Tabla Propietario
Columnas: documento, tipo_documento, nombre, telefono1, telefono2

### Tabla Vehiculo_RTM
Columnas: id, vehiculo_placa, estado_id, inicio_rtm, fin_rtm

### Tabla Estado
Columnas: id, nombre, descripción

- Categoria debe ser tipo ENUM, con los valores: Motocicleta, Automóvil, Campero, Motocarguero, Camioneta, Camión, Bus, Microbús, Tractocamión, Volqueta.
- Modelo es CHAR(4) porque siempre es un año de 4 dígitos.
- Placa es CHAR(6) porque siempre tiene exactamente 6 caracteres alfanuméricos.
- `fin_vigencia_rtm` debe ser siempre mayor que `inicio_vigencia_rtm`.
- Un propietario puede tener múltiples vehículos.
- Un vehículo únicamente puede tener un propietario.
- Los números de teléfono deben tener **exactamente 10 dígitos**
- Targeta de propiedad es una imagen
- Estado de completitud se debe gestionar internamente, solo hay dos estados, completo e incompleto, un regiatro puede pasar a estado completo cuando todos sus campos esten completos
- 


### Tabla Guardado Rapido
Columnas: targeta_propiedad, placa, telefono, estado_id, nivel_completitud

### Tabla Reporte
Columnas: fecha_reporte, fecha_ingreso, tipo_cliente, precio, descuento, comentario

---

# Sentencias SQL

```sql
-- BASE DE DATOS: GESTIÓN DE VEHÍCULOS Y RTM

-- Propietario
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
    modelo          CHAR(4),
    linea           VARCHAR(60),
    tarjeta_prop    BYTEA
);

-- RevisionTecnoMecanica
CREATE TABLE RevisionTecnoMecanica (
    id              SERIAL PRIMARY KEY,
    vehiculo_id     INT NOT NULL REFERENCES vehiculo(id),
    inicio_vigencia DATE,
    fin_vigencia    DATE,
    estado          estado_rtm_enum NOT NULL,
    procedencia     procedencia_enum NOT NULL,
    precio          NUMERIC(6,0),
    descuento       NUMERIC(2,0)
);

-- Reporte
CREATE TABLE reporte (
    id                  SERIAL PRIMARY KEY,
    vehiculo_id         INT NOT NULL REFERENCES vehiculo(id),
    rtm_id              INT REFERENCES rtm(id),
    fecha_reporte       DATE,
    fecha_ingreso       DATE,
    comentario          comentario_enum,
    estado_completitud  BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TYPE estado_proceso_enum AS ENUM ('incompleto', 'completado');

CREATE TABLE registro_rapido (
    id             SERIAL PRIMARY KEY,
    placa          CHAR(6) NOT NULL,
    telefono       CHAR(10) CHECK (telefono ~ '^\d{10}$'),
    tarjeta_prop   BYTEA,           -- imagen de tarjeta de propiedad
    estado_rtm     estado_rtm_enum NOT NULL,
    procedencia    procedencia_enum NOT NULL,
    fecha_reporte  DATE,            -- solo si estado = 'Reportado'
    estado_completitud estado_completitud_enum NOT NULL DEFAULT 'incompleto',
    creado_en      TIMESTAMP DEFAULT NOW()
);
