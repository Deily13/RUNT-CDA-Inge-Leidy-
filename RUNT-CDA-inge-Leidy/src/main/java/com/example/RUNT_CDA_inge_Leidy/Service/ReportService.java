package com.example.RUNT_CDA_inge_Leidy.Service;

import com.example.RUNT_CDA_inge_Leidy.DTO.ReportDTO;

import java.util.List;

public interface ReportService {


  List<ReportDTO> findAll();

  ReportDTO findById(Integer id);

  List<ReportDTO> findByVehicle(String plate);

  List<ReportDTO> findPending();

  ReportDTO create(ReportDTO dto);

  ReportDTO update(Integer id, ReportDTO dto);

  void delete(Integer id);
}
