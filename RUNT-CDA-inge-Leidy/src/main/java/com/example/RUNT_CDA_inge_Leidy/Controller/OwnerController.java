package com.example.RUNT_CDA_inge_Leidy.Controller;

import com.example.RUNT_CDA_inge_Leidy.DTO.OwnerDTO;
import com.example.RUNT_CDA_inge_Leidy.Service.OwnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owners")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;

    // GET /api/owners
    @GetMapping
    public ResponseEntity<List<OwnerDTO>> getAll() {
        return ResponseEntity.ok(ownerService.findAll());
    }

    // GET /api/owners/{id}
    @GetMapping("/{id}")
    public ResponseEntity<OwnerDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(ownerService.findById(id));
    }

    // GET /api/owners/document/{documentNumber}
    @GetMapping("/document/{documentNumber}")
    public ResponseEntity<OwnerDTO> getByDocument(@PathVariable String documentNumber) {
        return ResponseEntity.ok(ownerService.findByDocumentNumber(documentNumber));
    }

    // POST /api/owners
    @PostMapping
    public ResponseEntity<OwnerDTO> create(@Valid @RequestBody OwnerDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ownerService.create(dto));
    }

    // PUT /api/owners/{id}
    @PutMapping("/{id}")
    public ResponseEntity<OwnerDTO> update(@PathVariable Integer id,
                                           @Valid @RequestBody OwnerDTO dto) {
        return ResponseEntity.ok(ownerService.update(id, dto));
    }

    // DELETE /api/owners/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        ownerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}