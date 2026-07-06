package com.example.RUNT_CDA_inge_Leidy.Service;

import com.example.RUNT_CDA_inge_Leidy.DTO.OwnerDTO;

import java.util.List;

public interface OwnerService {

  List<OwnerDTO> findAll();

  OwnerDTO findById(Integer id);

  OwnerDTO findByDocumentNumber(String documentNumber);

  OwnerDTO create(OwnerDTO dto);

  OwnerDTO update(Integer id, OwnerDTO dto);

  void delete(Integer id);

    interface SOATService {
    }
}
