package com.example.RUNT_CDA_inge_Leidy.Service;

import com.example.RUNT_CDA_inge_Leidy.DTO.TechnicalInspectionDTO;

import java.util.List;

public interface TechnicalInspectionService {

  List<TechnicalInspectionDTO> findAll();

  TechnicalInspectionDTO findById(Integer id);

  List<TechnicalInspectionDTO> findByVehicle(String plate);

  TechnicalInspectionDTO findLatestByVehicle(String plate);

  TechnicalInspectionDTO create(TechnicalInspectionDTO dto);

  TechnicalInspectionDTO update(Integer id, TechnicalInspectionDTO dto);

  void delete(Integer id);
}
