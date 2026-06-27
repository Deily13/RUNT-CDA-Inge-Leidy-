ALTER TABLE report
  DROP CONSTRAINT report_inspection_id_fkey;

ALTER TABLE report
  ADD CONSTRAINT report_inspection_id_fkey
    FOREIGN KEY (inspection_id)
      REFERENCES technical_inspection(id)
      ON DELETE CASCADE;
