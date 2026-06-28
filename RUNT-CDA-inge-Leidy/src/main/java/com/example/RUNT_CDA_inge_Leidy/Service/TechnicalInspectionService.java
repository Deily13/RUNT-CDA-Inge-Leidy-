package com.example.RUNT_CDA_inge_Leidy.Service;

import com.example.RUNT_CDA_inge_Leidy.DTO.TechnicalInspectionDTO;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;

import java.time.LocalDate;
import java.util.List;

public interface TechnicalInspectionService {

  List<TechnicalInspectionDTO> findAll();

  TechnicalInspectionDTO findById(Integer id);

  List<TechnicalInspectionDTO> findByVehicle(String plate);

  TechnicalInspectionDTO findLatestByVehicle(String plate);

  List<TechnicalInspectionDTO> search(
    String          placa,
    VehicleCategory categoria,
    String          estado,          // ← llega como "Inedito,Vencido"
    DocumentType tipoDocumento,
    String          numeroDocumento,
    LocalDate fecha,
    Integer         mes,
    Integer         anio
  );
  TechnicalInspectionDTO create(TechnicalInspectionDTO dto);

  TechnicalInspectionDTO update(Integer id, TechnicalInspectionDTO dto);

  void delete(Integer id);
}
