package com.example.RUNT_CDA_inge_Leidy.DTO;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OwnerDTO {

    private Integer id;

    @NotBlank(message = "El número de documento es obligatorio")
    @Pattern(regexp = "^\\d+$", message = "El número de documento sólo puede contener dígitos")
    private String documentNumber;

    @NotNull(message = "El tipo de documento es obligatorio")
    private DocumentType documentType;

    @NotBlank(message = "El nombre completo es obligatorio")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$",
             message = "El nombre sólo puede contener letras y espacios")
    private String fullName;

    @NotBlank(message = "El teléfono principal es obligatorio")
    @Pattern(regexp = "^\\d{10}$", message = "phone1 debe tener exactamente 10 dígitos")
    private String phone1;

    @Pattern(regexp = "^\\d{10}$", message = "phone2 debe tener exactamente 10 dígitos")
    private String phone2;
}