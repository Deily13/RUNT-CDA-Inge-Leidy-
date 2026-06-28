package com.example.RUNT_CDA_inge_Leidy.Service.Impl;

import com.example.RUNT_CDA_inge_Leidy.DTO.ReportDTO;
import com.example.RUNT_CDA_inge_Leidy.Model.Report;
import com.example.RUNT_CDA_inge_Leidy.Model.TechnicalInspection;
import com.example.RUNT_CDA_inge_Leidy.Model.Vehicle;
import com.example.RUNT_CDA_inge_Leidy.Repository.ReportRepository;
import com.example.RUNT_CDA_inge_Leidy.Repository.TechnicalInspectionRepository;
import com.example.RUNT_CDA_inge_Leidy.Repository.VehicleRepository;
import com.example.RUNT_CDA_inge_Leidy.Service.ReportService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final VehicleRepository vehicleRepository;
    private final TechnicalInspectionRepository inspectionRepository;

    @Transactional(readOnly = true)
    public List<ReportDTO> findAll() {
        return reportRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReportDTO findById(Integer id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reporte no encontrado con id: " + id));
        return toDTO(report);
    }

    @Transactional(readOnly = true)
    public List<ReportDTO> findByVehicle(String plate) {
        return reportRepository.findByVehiclePlate(plate)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReportDTO> findPending() {
        return reportRepository.findByIsCompleteFalse()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReportDTO create(ReportDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(dto.getVehiclePlate())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Vehículo no encontrado con placa: " + dto.getVehiclePlate()));

        TechnicalInspection inspection = null;
        if (dto.getInspectionId() != null) {
            inspection = inspectionRepository.findById(dto.getInspectionId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Inspección no encontrada con id: " + dto.getInspectionId()));
        }

        Report report = toEntity(dto, vehicle, inspection);
        return toDTO(reportRepository.save(report));
    }

    @Transactional
    public ReportDTO update(Integer id, ReportDTO dto) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reporte no encontrado con id: " + id));

        Vehicle vehicle = vehicleRepository.findById(dto.getVehiclePlate())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Vehículo no encontrado con placa: " + dto.getVehiclePlate()));

        TechnicalInspection inspection = null;
        if (dto.getInspectionId() != null) {
            inspection = inspectionRepository.findById(dto.getInspectionId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Inspección no encontrada con id: " + dto.getInspectionId()));
        }

        report.setVehicle(vehicle);
        report.setInspection(inspection);
        report.setReportDate(dto.getReportDate());
        report.setEntryDate(dto.getEntryDate());
        report.setComment(dto.getComment());
        report.setIsComplete(dto.getIsComplete());

        return toDTO(reportRepository.save(report));
    }

    @Transactional
    public void delete(Integer id) {
        if (!reportRepository.existsById(id)) {
            throw new EntityNotFoundException("Reporte no encontrado con id: " + id);
        }
        reportRepository.deleteById(id);
    }

    // ── Mappers ───────────────────────────────────────────────────────────────
    private ReportDTO toDTO(Report report) {
        ReportDTO dto = new ReportDTO();
        dto.setId(report.getId());
        dto.setVehiclePlate(report.getVehicle().getPlate());
        dto.setVehicleInfo(report.getVehicle().getBrand() + " " + report.getVehicle().getLine());
        dto.setInspectionId(report.getInspection() != null ? report.getInspection().getId() : null);
        dto.setReportDate(report.getReportDate());
        dto.setEntryDate(report.getEntryDate());
        dto.setComment(report.getComment());
        dto.setIsComplete(report.getIsComplete());
        return dto;
    }

    private Report toEntity(ReportDTO dto, Vehicle vehicle, TechnicalInspection inspection) {
        Report report = new Report();
        report.setVehicle(vehicle);
        report.setInspection(inspection);
        report.setReportDate(dto.getReportDate());
        report.setEntryDate(dto.getEntryDate());
        report.setComment(dto.getComment());
        report.setIsComplete(dto.getIsComplete() != null ? dto.getIsComplete() : Boolean.FALSE);
        return report;
    }
}
