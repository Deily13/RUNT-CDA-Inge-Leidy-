package com.example.RUNT_CDA_inge_Leidy.Model;


import com.example.RUNT_CDA_inge_Leidy.Model.Enum.Origin;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.RtmStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;



@Entity(name = "Technical_Inspection")
@Table(
  name = "technical_inspection",
  indexes = {
    @Index(name = "idx_inspection_vehicle", columnList = "vehicle_id")
  }
)
@Getter
@Setter
@NoArgsConstructor
public class TechnicalInspection {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "vehicle_id", nullable = false)
  private Vehicle vehicle;

  @Column(name = "valid_from")
  private LocalDate validFrom;

  @Column(name = "valid_until")
  private LocalDate validUntil;

  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "status", nullable = false,
    columnDefinition = "rtm_status_enum")
  private RtmStatus status;


  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "origin", nullable = false,
    columnDefinition = "origin_enum")
  private Origin origin;


  @Column(name = "price", nullable = false, precision = 6, scale = 0)
  @Min(value = 0, message = "El precio no puede ser negativo")
  private BigDecimal price;


  @Column(name = "discount", precision = 2, scale = 0)
  @DecimalMin(value = "1", message = "El descuento mínimo es 1%")
  @DecimalMax(value = "50", message = "El descuento máximo es 50%")
  private BigDecimal discount;
}
