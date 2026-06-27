package com.example.RUNT_CDA_inge_Leidy.Model;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity(name = "Vehicle")
@Table(name = "vehicle")
@Getter
@Setter
@NoArgsConstructor
public class Vehicle {
  @Id
  @Column(name = "plate", columnDefinition = "bpchar", nullable = false)
  private String plate;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "owner_id", nullable = false)
  private Owner owner;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "category", nullable = false,
    columnDefinition = "vehicle_category_enum")
  private VehicleCategory category;

  @Column(name = "brand", length = 15)
  private String brand;

  @Column(name = "model_year", columnDefinition = "bpchar")
  @Pattern(regexp = "^\\d{4}$", message = "El año debe tener exactamente 4 dígitos")
  private String modelYear;

  @Column(name = "line", length = 60)
  private String line;
}
