package com.example.RUNT_CDA_inge_Leidy.DTO;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.CommentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ReportDTO {

    private Integer id;

    @NotBlank(message = "La placa del vehículo es obligatoria")
    private String vehiclePlate;

    // Dato de lectura
    private String vehicleInfo;

    private Integer inspectionId;

    private LocalDate reportDate;

    private LocalDate entryDate;

    private CommentType comment;

    @NotNull(message = "El campo isComplete es obligatorio")
    private Boolean isComplete;
}