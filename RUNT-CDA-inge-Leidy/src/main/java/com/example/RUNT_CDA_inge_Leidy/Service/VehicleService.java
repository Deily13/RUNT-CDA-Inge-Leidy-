package com.example.RUNT_CDA_inge_Leidy.Service;

import com.example.RUNT_CDA_inge_Leidy.DTO.VehicleDTO;

import java.util.List;

public interface VehicleService {

  List<VehicleDTO> findAll();

  VehicleDTO findByPlate(String plate);

  List<VehicleDTO> findByOwner(Integer ownerId);

  VehicleDTO create(VehicleDTO dto);

  VehicleDTO update(String plate, VehicleDTO dto);

  void delete(String plate);

    boolean existsByPlate(String plate);
}
