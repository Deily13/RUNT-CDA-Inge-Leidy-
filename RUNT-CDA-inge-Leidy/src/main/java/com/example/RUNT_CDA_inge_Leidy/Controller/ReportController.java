package com.example.RUNT_CDA_inge_Leidy.Controller;

import com.example.RUNT_CDA_inge_Leidy.DTO.ReportDTO;
import com.example.RUNT_CDA_inge_Leidy.Service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    // GET /api/reports
    @GetMapping
    public ResponseEntity<List<ReportDTO>> getAll() {
        return ResponseEntity.ok(reportService.findAll());
    }

    // GET /api/reports/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ReportDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(reportService.findById(id));
    }

    // GET /api/reports/vehicle/{plate}
    @GetMapping("/vehicle/{plate}")
    public ResponseEntity<List<ReportDTO>> getByVehicle(@PathVariable String plate) {
        return ResponseEntity.ok(reportService.findByVehicle(plate));
    }

    // GET /api/reports/pending
    @GetMapping("/pending")
    public ResponseEntity<List<ReportDTO>> getPending() {
        return ResponseEntity.ok(reportService.findPending());
    }

    // POST /api/reports
    @PostMapping
    public ResponseEntity<ReportDTO> create(@Valid @RequestBody ReportDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reportService.create(dto));
    }

    // PUT /api/reports/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ReportDTO> update(@PathVariable Integer id,
                                            @Valid @RequestBody ReportDTO dto) {
        return ResponseEntity.ok(reportService.update(id, dto));
    }

    // DELETE /api/reports/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        reportService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
