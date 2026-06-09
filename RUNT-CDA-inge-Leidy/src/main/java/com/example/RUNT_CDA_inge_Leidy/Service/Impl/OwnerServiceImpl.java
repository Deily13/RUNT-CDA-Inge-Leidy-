package com.example.RUNT_CDA_inge_Leidy.Service.Impl;

import com.example.RUNT_CDA_inge_Leidy.DTO.OwnerDTO;
import com.example.RUNT_CDA_inge_Leidy.Model.Owner;
import com.example.RUNT_CDA_inge_Leidy.Repository.OwnerRepository;
import com.example.RUNT_CDA_inge_Leidy.Service.OwnerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OwnerServiceImpl implements OwnerService {

  private final OwnerRepository ownerRepository;

    @Transactional(readOnly = true)
    public List<OwnerDTO> findAll() {
        return ownerRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OwnerDTO findById(Integer id) {
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Propietario no encontrado con id: " + id));
        return toDTO(owner);
    }


    @Transactional(readOnly = true)
    public OwnerDTO findByDocumentNumber(String documentNumber) {
        Owner owner = ownerRepository.findByDocumentNumber(documentNumber)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Propietario no encontrado con documento: " + documentNumber));
        return toDTO(owner);
    }


    @Transactional
    public OwnerDTO create(OwnerDTO dto) {
        if (ownerRepository.existsByDocumentNumber(dto.getDocumentNumber())) {
            throw new IllegalArgumentException(
                    "Ya existe un propietario con el documento: " + dto.getDocumentNumber());
        }
        Owner owner = toEntity(dto);
        return toDTO(ownerRepository.save(owner));
    }


    @Transactional
    public OwnerDTO update(Integer id, OwnerDTO dto) {
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Propietario no encontrado con id: " + id));

        owner.setDocumentNumber(dto.getDocumentNumber());
        owner.setDocumentType(dto.getDocumentType());
        owner.setFullName(dto.getFullName());
        owner.setPhone1(dto.getPhone1());
        owner.setPhone2(dto.getPhone2());

        return toDTO(ownerRepository.save(owner));
    }

    @Transactional
    public void delete(Integer id) {
        if (!ownerRepository.existsById(id)) {
            throw new EntityNotFoundException("Propietario no encontrado con id: " + id);
        }
        ownerRepository.deleteById(id);
    }

    private OwnerDTO toDTO(Owner owner) {
        OwnerDTO dto = new OwnerDTO();
        dto.setId(owner.getId());
        dto.setDocumentNumber(owner.getDocumentNumber());
        dto.setDocumentType(owner.getDocumentType());
        dto.setFullName(owner.getFullName());
        dto.setPhone1(owner.getPhone1());
        dto.setPhone2(owner.getPhone2());
        return dto;
    }

    private Owner toEntity(OwnerDTO dto) {
        Owner owner = new Owner();
        owner.setDocumentNumber(dto.getDocumentNumber());
        owner.setDocumentType(dto.getDocumentType());
        owner.setFullName(dto.getFullName());
        owner.setPhone1(dto.getPhone1());
        owner.setPhone2(dto.getPhone2());
        return owner;
    }
}
