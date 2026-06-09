package com.example.RUNT_CDA_inge_Leidy.Service.Impl;

import com.example.RUNT_CDA_inge_Leidy.DTO.VehicleDTO;
import com.example.RUNT_CDA_inge_Leidy.Model.Owner;
import com.example.RUNT_CDA_inge_Leidy.Model.Vehicle;
import com.example.RUNT_CDA_inge_Leidy.Repository.OwnerRepository;
import com.example.RUNT_CDA_inge_Leidy.Repository.VehicleRepository;
import com.example.RUNT_CDA_inge_Leidy.Service.VehicleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final OwnerRepository ownerRepository;

    @Transactional(readOnly = true)
    public List<VehicleDTO> findAll() {
        return vehicleRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public VehicleDTO findByPlate(String plate) {
        Vehicle vehicle = vehicleRepository.findById(plate)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado con placa: " + plate));
        return toDTO(vehicle);
    }

    @Transactional(readOnly = true)
    public List<VehicleDTO> findByOwner(Integer ownerId) {
        return vehicleRepository.findByOwnerId(ownerId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public VehicleDTO create(VehicleDTO dto) {
        if (vehicleRepository.existsByPlate(dto.getPlate())) {
            throw new IllegalArgumentException("Ya existe un vehículo con la placa: " + dto.getPlate());
        }
        Owner owner = ownerRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new EntityNotFoundException("Propietario no encontrado con id: " + dto.getOwnerId()));

        Vehicle vehicle = toEntity(dto, owner);
        return toDTO(vehicleRepository.save(vehicle));
    }

    @Transactional
    public VehicleDTO update(String plate, VehicleDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(plate)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado con placa: " + plate));

        Owner owner = ownerRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new EntityNotFoundException("Propietario no encontrado con id: " + dto.getOwnerId()));

        vehicle.setOwner(owner);
        vehicle.setCategory(dto.getCategory());
        vehicle.setBrand(dto.getBrand());
        vehicle.setModelYear(dto.getModelYear());
        vehicle.setLine(dto.getLine());

        return toDTO(vehicleRepository.save(vehicle));
    }

    @Transactional
    public void delete(String plate) {
        if (!vehicleRepository.existsById(plate)) {
            throw new EntityNotFoundException("Vehículo no encontrado con placa: " + plate);
        }
        vehicleRepository.deleteById(plate);
    }

    // ── Mappers ───────────────────────────────────────────────────────────────
    private VehicleDTO toDTO(Vehicle vehicle) {
        VehicleDTO dto = new VehicleDTO();
        dto.setPlate(vehicle.getPlate());
        dto.setOwnerId(vehicle.getOwner().getId());
        dto.setOwnerFullName(vehicle.getOwner().getFullName());
        dto.setCategory(vehicle.getCategory());
        dto.setBrand(vehicle.getBrand());
        dto.setModelYear(vehicle.getModelYear());
        dto.setLine(vehicle.getLine());
        return dto;
    }

    private Vehicle toEntity(VehicleDTO dto, Owner owner) {
        Vehicle vehicle = new Vehicle();
        vehicle.setPlate(dto.getPlate());
        vehicle.setOwner(owner);
        vehicle.setCategory(dto.getCategory());
        vehicle.setBrand(dto.getBrand());
        vehicle.setModelYear(dto.getModelYear());
        vehicle.setLine(dto.getLine());
        return vehicle;
    }
}
