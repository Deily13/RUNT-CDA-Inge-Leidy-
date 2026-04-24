# Estructura de la Base de datos

- Las fechas tendran formato DD/MM/AAA

- Estados =  Inedito, Tramitado, Reservado, Declinado


- Tablas = Vehiculo, Propietario, Estado, Vehiculo_RTM
- Tabla Vehiculo= Columnas: placa, marca, linea, modelo, clase
- Tabla Propietario= Columnas: documento, tipo_documento, nombre, telefono1, telefono2
- Tabla Vehiculo_RTM= Columnas: id, vehiculo_placa, estado_id, inicio_rtm, fin_rtm,
- Tabla Estado= Columnas:id, nombre, descripcion 


- Clase de de ser tipo ENUM, con los valores:  Motocicleta, Automóvil, Campero, Motocarguero, Camioneta, Camión, Bus, Microbús, Tractocamión, Volqueta.
- modelo es CHAR(4) porque siempre es un año de 4 dígitos, es equivalente a año.
- placa es CHAR(6) porque siempre tiene exactamente 6 caracteres de combinacion alfanumérica.
- fin_vigencia_rtm debe ser siempre mayor que inicio_vigencia_rtm para evitar datos inconsistentes.
- Un propietario puede tener multiples vehiculos
- Un vehiculo unicamente puede tener un propietario

# Sentencias SQL



## --  BASE DE DATOS: GESTIÓN DE VEHÍCULOS Y RTM

CREATE DATABASE IF NOT EXISTS gestion_vehiculos
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE gestion_vehiculos;

# --  TABLA: PROPIETARIO

CREATE TABLE propietario (
documento       BIGINT          NOT NULL,
tipo_documento  VARCHAR(20)     NOT NULL,
nombre          VARCHAR(100)    NOT NULL,
telefono1       BIGINT          NOT NULL,
telefono2       BIGINT,

    CONSTRAINT pk_propietario PRIMARY KEY (documento),
    CONSTRAINT chk_tipo_documento CHECK (
        tipo_documento IN ('CC', 'NIT')
    )
);


# --  TABLA: VEHICULO

CREATE TABLE vehiculo (
placa               CHAR(6)         NOT NULL,
marca               VARCHAR(50)     NOT NULL,
linea               VARCHAR(100)     NOT NULL,
modelo              CHAR(4)         NOT NULL,
clase               ENUM(
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
)               NOT NULL,
propietario_doc     BIGINT          NOT NULL,

    CONSTRAINT pk_vehiculo          PRIMARY KEY (placa),
    CONSTRAINT fk_vehiculo_prop     FOREIGN KEY (propietario_doc)
        REFERENCES propietario (documento)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT chk_placa            CHECK (placa REGEXP '^[A-Z0-9]{6}$'),
    CONSTRAINT chk_modelo           CHECK (modelo REGEXP '^[0-9]{4}$')
);


# --  TABLA: ESTADO

CREATE TABLE estado (
id              INT             NOT NULL AUTO_INCREMENT,
nombre          VARCHAR(50)     NOT NULL,
descripcion     VARCHAR(200),

    CONSTRAINT pk_estado    PRIMARY KEY (id),
    CONSTRAINT uq_estado    UNIQUE (nombre)
);

-- Estados iniciales
INSERT INTO estado (nombre, descripcion) VALUES
('Vigente',     'La RTM está aprobada y dentro del periodo de validez'),
('Vencida',     'La RTM superó la fecha de vencimiento sin renovación'),
('En trámite',  'El proceso de RTM fue iniciado pero aún no finaliza'),
('Rechazada',   'El vehículo no aprobó la revisión técnico-mecánica');


# --  TABLA: VEHICULO_RTM

CREATE TABLE vehiculo_rtm (
id                  INT             NOT NULL AUTO_INCREMENT,
vehiculo_placa      CHAR(6)         NOT NULL,
estado_id           INT             NOT NULL,
inicio_rtm          DATE            NOT NULL,
fin_rtm             DATE            NOT NULL,
numero_certificado  VARCHAR(50),

    CONSTRAINT pk_vehiculo_rtm      PRIMARY KEY (id),
    CONSTRAINT fk_rtm_vehiculo      FOREIGN KEY (vehiculo_placa)
        REFERENCES vehiculo (placa)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_rtm_estado        FOREIGN KEY (estado_id)
        REFERENCES estado (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT chk_fechas_rtm       CHECK (fin_rtm > inicio_rtm)
);


