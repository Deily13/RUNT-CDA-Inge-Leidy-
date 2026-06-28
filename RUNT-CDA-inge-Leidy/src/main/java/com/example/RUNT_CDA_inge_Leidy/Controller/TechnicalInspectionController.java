package com.example.RUNT_CDA_inge_Leidy.Controller;

import com.example.RUNT_CDA_inge_Leidy.DTO.TechnicalInspectionDTO;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import com.example.RUNT_CDA_inge_Leidy.Service.TechnicalInspectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/inspections")
@RequiredArgsConstructor
public class TechnicalInspectionController {

  private final TechnicalInspectionService inspectionService;

  // GET /api/inspections
  @GetMapping
  public ResponseEntity<List<TechnicalInspectionDTO>> getAll() {
    return ResponseEntity.ok(inspectionService.findAll());
  }

  // GET /api/inspections/search
  @GetMapping("/search")
  public ResponseEntity<List<TechnicalInspectionDTO>> search(
    @RequestParam(required = false) String          placa,
    @RequestParam(required = false) VehicleCategory categoria,
    @RequestParam(required = false) String          estado,
    @RequestParam(required = false) DocumentType tipoDocumento,
    @RequestParam(required = false) String          numeroDocumento,
    @RequestParam(required = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
    @RequestParam(required = false) Integer         mes,
    @RequestParam(required = false) Integer         anio
  ) {
    return ResponseEntity.ok(inspectionService.search(
      placa, categoria, estado, tipoDocumento,
      numeroDocumento, fecha, mes, anio
    ));
  }

  // GET /api/inspections/{id}
  @GetMapping("/{id}")
  public ResponseEntity<TechnicalInspectionDTO> getById(@PathVariable Integer id) {
    return ResponseEntity.ok(inspectionService.findById(id));
  }

  // GET /api/inspections/vehicle/{plate}
  @GetMapping("/vehicle/{plate}")
  public ResponseEntity<List<TechnicalInspectionDTO>> getByVehicle(@PathVariable String plate) {
    return ResponseEntity.ok(inspectionService.findByVehicle(plate));
  }

  // GET /api/inspections/vehicle/{plate}/latest
  @GetMapping("/vehicle/{plate}/latest")
  public ResponseEntity<TechnicalInspectionDTO> getLatestByVehicle(@PathVariable String plate) {
    return ResponseEntity.ok(inspectionService.findLatestByVehicle(plate));
  }

  // POST /api/inspections
  @PostMapping
  public ResponseEntity<TechnicalInspectionDTO> create(@Valid @RequestBody TechnicalInspectionDTO dto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(inspectionService.create(dto));
  }

  // PUT /api/inspections/{id}
  @PutMapping("/{id}")
  public ResponseEntity<TechnicalInspectionDTO> update(@PathVariable Integer id,
                                                       @Valid @RequestBody TechnicalInspectionDTO dto) {
    return ResponseEntity.ok(inspectionService.update(id, dto));
  }

  // DELETE /api/inspections/{id}
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Integer id) {
    inspectionService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
