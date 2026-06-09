package com.example.RUNT_CDA_inge_Leidy.Controller;

import com.example.RUNT_CDA_inge_Leidy.DTO.VehicleDTO;
import com.example.RUNT_CDA_inge_Leidy.Service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    // GET /api/vehicles
    @GetMapping
    public ResponseEntity<List<VehicleDTO>> getAll() {
        return ResponseEntity.ok(vehicleService.findAll());
    }

    // GET /api/vehicles/{plate}
    @GetMapping("/{plate}")
    public ResponseEntity<VehicleDTO> getByPlate(@PathVariable String plate) {
        return ResponseEntity.ok(vehicleService.findByPlate(plate));
    }

    // GET /api/vehicles/owner/{ownerId}
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<VehicleDTO>> getByOwner(@PathVariable Integer ownerId) {
        return ResponseEntity.ok(vehicleService.findByOwner(ownerId));
    }

    // POST /api/vehicles
    @PostMapping
    public ResponseEntity<VehicleDTO> create(@Valid @RequestBody VehicleDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.create(dto));
    }

    // PUT /api/vehicles/{plate}
    @PutMapping("/{plate}")
    public ResponseEntity<VehicleDTO> update(@PathVariable String plate,
                                             @Valid @RequestBody VehicleDTO dto) {
        return ResponseEntity.ok(vehicleService.update(plate, dto));
    }

    // DELETE /api/vehicles/{plate}
    @DeleteMapping("/{plate}")
    public ResponseEntity<Void> delete(@PathVariable String plate) {
        vehicleService.delete(plate);
        return ResponseEntity.noContent().build();
    }
}