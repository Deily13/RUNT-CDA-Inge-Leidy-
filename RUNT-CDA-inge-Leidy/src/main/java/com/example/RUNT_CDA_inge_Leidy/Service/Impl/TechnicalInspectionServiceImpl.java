package com.example.RUNT_CDA_inge_Leidy.Service.Impl;

import com.example.RUNT_CDA_inge_Leidy.DTO.TechnicalInspectionDTO;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.RtmStatus;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import com.example.RUNT_CDA_inge_Leidy.Model.TechnicalInspection;
import com.example.RUNT_CDA_inge_Leidy.Model.Vehicle;
import com.example.RUNT_CDA_inge_Leidy.Repository.TechnicalInspectionRepository;
import com.example.RUNT_CDA_inge_Leidy.Repository.VehicleRepository;
import com.example.RUNT_CDA_inge_Leidy.Service.TechnicalInspectionService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechnicalInspectionServiceImpl implements TechnicalInspectionService {

  private final TechnicalInspectionRepository inspectionRepository;
  private final VehicleRepository vehicleRepository;

  // ── Consultas simples ─────────────────────────────────────────────────────

  @Override
  @Transactional(readOnly = true)
  public List<TechnicalInspectionDTO> findAll() {
    return inspectionRepository.findAll()
      .stream()
      .map(this::toDTO)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public TechnicalInspectionDTO findById(Integer id) {
    return toDTO(inspectionRepository.findById(id)
      .orElseThrow(() -> new EntityNotFoundException(
        "Inspección no encontrada con id: " + id)));
  }

  @Override
  @Transactional(readOnly = true)
  public List<TechnicalInspectionDTO> findByVehicle(String plate) {
    return inspectionRepository.findByVehiclePlate(plate)
      .stream()
      .map(this::toDTO)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public TechnicalInspectionDTO findLatestByVehicle(String plate) {
    return toDTO(inspectionRepository
      .findTopByVehiclePlateOrderByValidUntilDesc(plate)
      .orElseThrow(() -> new EntityNotFoundException(
        "No se encontró inspección vigente para la placa: " + plate)));
  }

  // ── Search con Specifications ─────────────────────────────────────────────

  @Override
  @Transactional(readOnly = true)
  public List<TechnicalInspectionDTO> search(
    String placa,
    VehicleCategory categoria,
    String estado,
    DocumentType tipoDocumento,
    String numeroDocumento,
    LocalDate fecha,
    Integer mes,
    Integer anio) {

    Specification<TechnicalInspection> spec = (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();

      // JOIN con Vehicle (siempre necesario para categoria y placa)
      Join<TechnicalInspection, Vehicle> vehicle =
        root.join("vehicle", JoinType.INNER);

      // JOIN con Owner a través de Vehicle
      var owner = vehicle.join("owner", JoinType.LEFT);

      // ── Filtros sobre TechnicalInspection ────────────────────────────
      if (placa != null && !placa.isBlank()) {
        predicates.add(cb.equal(
          cb.upper(root.get("vehicle").get("plate")),
          placa.toUpperCase()
        ));
      }

      if (estado != null && !estado.isBlank()) {
        List<RtmStatus> statuses = Arrays.stream(estado.split(","))
          .map(String::trim)
          .filter(s -> !s.isEmpty())
          .map(s -> {
            try { return RtmStatus.valueOf(s.toUpperCase()); }
            catch (IllegalArgumentException e) { return null; }
          })
          .filter(s -> s != null)
          .collect(Collectors.toList());

        if (!statuses.isEmpty()) {
          predicates.add(root.get("status").in(statuses));
        }
      }

      if (fecha != null) {
        predicates.add(cb.equal(root.get("validFrom"), fecha));
      }

      if (mes != null) {
        predicates.add(cb.equal(
          cb.function("MONTH", Integer.class, root.get("validFrom")),
          mes
        ));
      }

      if (anio != null) {
        predicates.add(cb.equal(
          cb.function("YEAR", Integer.class, root.get("validFrom")),
          anio
        ));
      }

      // ── Filtros sobre Vehicle ─────────────────────────────────────────
      if (categoria != null) {
        predicates.add(cb.equal(vehicle.get("category"), categoria));
      }

      // ── Filtros sobre Owner ───────────────────────────────────────────
      if (tipoDocumento != null) {
        predicates.add(cb.equal(owner.get("documentType"), tipoDocumento));
      }

      if (numeroDocumento != null && !numeroDocumento.isBlank()) {
        predicates.add(cb.equal(owner.get("documentNumber"), numeroDocumento.trim()));
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };

    return inspectionRepository.findAll(spec)
      .stream()
      .map(this::toDTO)
      .collect(Collectors.toList());
  }

  // ── Mutaciones ────────────────────────────────────────────────────────────

  @Override
  @Transactional
  public TechnicalInspectionDTO create(TechnicalInspectionDTO dto) {
    Vehicle vehicle = vehicleRepository.findById(dto.getVehiclePlate())
      .orElseThrow(() -> new EntityNotFoundException(
        "Vehículo no encontrado con placa: " + dto.getVehiclePlate()));
    return toDTO(inspectionRepository.save(toEntity(dto, vehicle)));
  }

  @Override
  @Transactional
  public TechnicalInspectionDTO update(Integer id, TechnicalInspectionDTO dto) {
    TechnicalInspection inspection = inspectionRepository.findById(id)
      .orElseThrow(() -> new EntityNotFoundException(
        "Inspección no encontrada con id: " + id));

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

  @Override
  @Transactional
  public void delete(Integer id) {
    if (!inspectionRepository.existsById(id)) {
      throw new EntityNotFoundException("Inspección no encontrada con id: " + id);
    }
    inspectionRepository.deleteById(id);
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
}
