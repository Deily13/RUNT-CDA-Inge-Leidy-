package com.example.RUNT_CDA_inge_Leidy.DTO;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VehicleDTO {

    @NotBlank(message = "La placa es obligatoria")
    private String plate;

    // Solo se envía el ID del propietario para evitar referencias circulares
    @NotNull(message = "El propietario es obligatorio")
    private Integer ownerId;

    // Dato de lectura: nombre del propietario
    private String ownerFullName;

    @NotNull(message = "La categoría es obligatoria")
    private VehicleCategory category;

    private String brand;

    @Pattern(regexp = "^\\d{4}$", message = "El año debe tener exactamente 4 dígitos")
    private String modelYear;

    private String line;
}