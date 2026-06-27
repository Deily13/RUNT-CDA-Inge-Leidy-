-- ============================
-- SEEDER DE DATOS DE PRUEBA
-- ============================

-- Propietarios
INSERT INTO owner (document_number, document_type, full_name, phone1, phone2)
VALUES
  ('123456789', 'CC', 'Carlos Pérez', '3101234567', NULL),
  ('987654321', 'NIT', 'Transportes Rápidos S.A.', '3119876543', '3105554321'),
  ('456789123', 'CC', 'María Gómez', '3124567890', NULL),
  ('741852963', 'CC', 'Juan Rodríguez', '3137418529', '3149638527'),
  ('852963741', 'NIT', 'Logística del Sur Ltda.', '3158529637', NULL);

-- Vehículos
INSERT INTO vehicle (plate, owner_id, category, brand, model_year, line)
VALUES
  ('ABC123', 1, 'AUTOMOVIL', 'Toyota', '2018', 'Corolla'),
  ('XYZ789', 2, 'MOTOCARGUERO', 'Chevrolet', '2020', 'NKR'),
  ('LMN456', 3, 'MOTOCICLETA', 'Yamaha', '2021', 'FZ'),
  ('QWE741', 4, 'CAMIONETA', 'Ford', '2019', 'Explorer'),
  ('RTY852', 5, 'AUTOMOVIL', 'Mercedes', '2017', 'Sprinter');

-- Revisiones TecnoMecánicas
INSERT INTO technical_inspection (vehicle_id, valid_from, valid_until, status, origin, price, discount)
VALUES
  ('ABC123', '2026-01-01', '2027-01-01', 'Ingresado', 'taller', 250000, 10),
  ('XYZ789', '2025-06-01', '2026-06-01', 'Reportado', 'cliente', 500000, 20),
  ('LMN456', '2026-03-15', '2027-03-15', 'Actualizado', 'taller', 150000, 5),
  ('QWE741', '2025-12-01', '2026-12-01', 'Vencido', 'cliente', 300000, NULL),
  ('RTY852', '2026-02-01', '2027-02-01', 'Inedito', 'taller', 450000, 15);

-- Reportes
INSERT INTO report (vehicle_id, inspection_id, report_date, entry_date, comment, is_complete)
VALUES
  ('ABC123', 1, '2026-01-02', '2026-01-03', 'Realizada', TRUE),
  ('XYZ789', 2, '2025-06-02', '2025-06-05', 'no contesto', FALSE),
  ('LMN456', 3, '2026-03-16', '2026-03-17', 'traspaso', TRUE),
  ('QWE741', 4, '2025-12-02', '2025-12-04', 'desviado', FALSE),
  ('RTY852', 5, '2026-02-02', '2026-02-03', 'fuera de servicio', TRUE);

-- Registros Rápidos
--INSERT INTO quick_record (plate, phone, ownership_card, rtm_status, origin, report_date, is_complete)
--VALUES
 -- ('ABC123', '3101234567', NULL, 'Ingresado', 'taller', '2026-01-02', TRUE),
 -- ('XYZ789', '3119876543', NULL, 'Reportado', 'cliente', '2025-06-02', FALSE),
 -- ('LMN456', '3124567890', NULL, 'Actualizado', 'taller', '2026-03-16', TRUE),
 -- ('QWE741', '3137418529', NULL, 'Vencido', 'cliente', '2025-12-02', FALSE),
 -- ('RTY852', '3158529637', NULL, 'Inedito', 'taller', '2026-02-02', TRUE);
