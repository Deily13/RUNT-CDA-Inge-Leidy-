package com.example.RUNT_CDA_inge_Leidy.DTO;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.Origin;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.RtmStatus;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TechnicalInspectionDTO{

    private Integer id;

    @NotBlank(message = "La placa del vehículo es obligatoria")
    private String vehiclePlate;

    private String vehicleInfo;

    private LocalDate validFrom;

    private LocalDate validUntil;

    @NotNull(message = "El estado es obligatorio")
    private RtmStatus status;

    @NotNull(message = "El origen es obligatorio")
    private Origin origin;

    @NotNull(message = "El precio es obligatorio")
    @Min(value = 0, message = "El precio no puede ser negativo")
    private BigDecimal price;

    @DecimalMin(value = "1", message = "El descuento mínimo es 1%")
    @DecimalMax(value = "50", message = "El descuento máximo es 50%")
    private BigDecimal discount;
}
