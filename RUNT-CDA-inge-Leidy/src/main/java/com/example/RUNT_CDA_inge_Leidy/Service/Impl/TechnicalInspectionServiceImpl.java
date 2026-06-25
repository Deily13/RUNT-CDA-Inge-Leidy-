package com.example.RUNT_CDA_inge_Leidy.Service.Impl;

import com.example.RUNT_CDA_inge_Leidy.DTO.TechnicalInspectionDTO;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.RtmStatus;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import com.example.RUNT_CDA_inge_Leidy.Model.TechnicalInspection;
import com.example.RUNT_CDA_inge_Leidy.Model.Vehicle;
import com.example.RUNT_CDA_inge_Leidy.Repository.OwnerRepository;
import com.example.RUNT_CDA_inge_Leidy.Repository.TechnicalInspectionRepository;
import com.example.RUNT_CDA_inge_Leidy.Repository.TechnicalInspectionSpecification;
import com.example.RUNT_CDA_inge_Leidy.Repository.VehicleRepository;
import com.example.RUNT_CDA_inge_Leidy.Service.TechnicalInspectionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechnicalInspectionServiceImpl implements TechnicalInspectionService {

    private final TechnicalInspectionRepository inspectionRepository;
    private final VehicleRepository vehicleRepository;
    private final OwnerRepository ownerRepository;


  @Transactional(readOnly = true)
    public List<TechnicalInspectionDTO> findAll() {
        return inspectionRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TechnicalInspectionDTO findById(Integer id) {
        TechnicalInspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inspección no encontrada con id: " + id));
        return toDTO(inspection);
    }

    @Transactional(readOnly = true)
    public List<TechnicalInspectionDTO> findByVehicle(String plate) {
        return inspectionRepository.findByVehiclePlate(plate)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TechnicalInspectionDTO findLatestByVehicle(String plate) {
        TechnicalInspection inspection = inspectionRepository
                .findTopByVehiclePlateOrderByValidUntilDesc(plate)
                .orElseThrow(() -> new EntityNotFoundException(
                        "No se encontró inspección vigente para la placa: " + plate));
        return toDTO(inspection);
    }

    @Transactional
    public TechnicalInspectionDTO create(TechnicalInspectionDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(dto.getVehiclePlate())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Vehículo no encontrado con placa: " + dto.getVehiclePlate()));

        TechnicalInspection inspection = toEntity(dto, vehicle);
        return toDTO(inspectionRepository.save(inspection));
    }

    @Transactional
    public TechnicalInspectionDTO update(Integer id, TechnicalInspectionDTO dto) {
        TechnicalInspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inspección no encontrada con id: " + id));

        Vehicle vehicle = vehicleRepository.findById(dto.getVehiclePlate())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Vehículo no encontrado con placa: " + dto.getVehiclePlate()));

        inspection.setVehicle(vehicle);
        inspection.setValidFrom(dto.getValidFrom());
        inspection.setValidUntil(dto.getValidUntil());
        inspection.setStatus(dto.getStatus());
        inspection.setOrigin(dto.getOrigin());
        inspection.setPrice(dto.getPrice());
        inspection.setDiscount(dto.getDiscount());

        return toDTO(inspectionRepository.save(inspection));
    }

  @Transactional
  public void delete(Integer id) {
    TechnicalInspection inspection = inspectionRepository.findById(id)
      .orElseThrow(() -> new EntityNotFoundException(
        "Inspección no encontrada con id: " + id));

    Vehicle vehicle = inspection.getVehicle();
    String plate    = vehicle.getPlate();
    Integer ownerId = vehicle.getOwner().getId();

    inspectionRepository.delete(inspection);
    inspectionRepository.flush();

    if (inspectionRepository.countByVehiclePlate(plate) == 0) {

      vehicleRepository.delete(vehicle);
      vehicleRepository.flush();

      if (vehicleRepository.countByOwnerId(ownerId) == 0) {
        ownerRepository.deleteById(ownerId);
      }
    }
  }

    // ── Mappers ───────────────────────────────────────────────────────────────
    private TechnicalInspectionDTO toDTO(TechnicalInspection i) {
        TechnicalInspectionDTO dto = new TechnicalInspectionDTO();
        dto.setId(i.getId());
        dto.setVehiclePlate(i.getVehicle().getPlate());
        dto.setVehicleInfo(i.getVehicle().getBrand() + " " + i.getVehicle().getLine()
                + " (" + i.getVehicle().getModelYear() + ")");
        dto.setValidFrom(i.getValidFrom());
        dto.setValidUntil(i.getValidUntil());
        dto.setStatus(i.getStatus());
        dto.setOrigin(i.getOrigin());
        dto.setPrice(i.getPrice());
        dto.setDiscount(i.getDiscount());
        return dto;
    }

    private TechnicalInspection toEntity(TechnicalInspectionDTO dto, Vehicle vehicle) {
        TechnicalInspection inspection = new TechnicalInspection();
        inspection.setVehicle(vehicle);
        inspection.setValidFrom(dto.getValidFrom());
        inspection.setValidUntil(dto.getValidUntil());
        inspection.setStatus(dto.getStatus());
        inspection.setOrigin(dto.getOrigin());
        inspection.setPrice(dto.getPrice());
        inspection.setDiscount(dto.getDiscount());
        return inspection;
    }

  @Transactional(readOnly = true)
  public List<TechnicalInspectionDTO> search(
    String          placa,
    VehicleCategory categoria,
    String          estado,
    DocumentType    tipoDocumento,
    String          numeroDocumento,
    LocalDate       fecha,
    Integer         mes,
    Integer         anio
  ) {
    List<RtmStatus> estados = (estado == null || estado.isBlank()) ? null
      : Arrays.stream(estado.split(","))
        .map(String::trim)
        .map(RtmStatus::valueOf)
        .toList();

    return inspectionRepository
      .findAll(TechnicalInspectionSpecification.conFiltros(
        placa, categoria, estados, tipoDocumento,
        numeroDocumento, fecha, mes, anio))
      .stream()
      .map(this::toDTO)
      .toList();
  }
}
