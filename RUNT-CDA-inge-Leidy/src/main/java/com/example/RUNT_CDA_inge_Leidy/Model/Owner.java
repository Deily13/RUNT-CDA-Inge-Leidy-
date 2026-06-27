package com.example.RUNT_CDA_inge_Leidy.Model;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


@Entity(name = "Owner")
@Table(name = "owner")
@Getter
@Setter
@NoArgsConstructor
public class Owner {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "document_number", unique = true, nullable = false, length = 13)
  @Pattern(regexp = "^\\d+$", message = "El número de documento sólo puede contener dígitos")
  private String documentNumber;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "document_type", nullable = false,
    columnDefinition = "document_type_enum")
  private DocumentType documentType;

  @Column(name = "full_name", nullable = false, length = 100)
  @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$",
    message = "El nombre sólo puede contener letras y espacios")
  private String fullName;

  @Column(name = "phone1", columnDefinition = "bpchar", nullable = false)
  @Pattern(regexp = "^\\d{10}$", message = "phone1 debe tener exactamente 10 dígitos")
  private String phone1;

  @Column(name = "phone2", columnDefinition = "bpchar")  @Pattern(regexp = "^\\d{10}$", message = "phone2 debe tener exactamente 10 dígitos")
  private String phone2;

}
