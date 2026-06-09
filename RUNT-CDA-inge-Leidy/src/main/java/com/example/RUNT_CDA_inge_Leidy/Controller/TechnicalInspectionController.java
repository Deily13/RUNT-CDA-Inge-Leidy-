package com.example.RUNT_CDA_inge_Leidy.Controller;

import com.example.RUNT_CDA_inge_Leidy.DTO.TechnicalInspectionDTO;
import com.example.RUNT_CDA_inge_Leidy.Service.TechnicalInspectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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