package com.example.RUNT_CDA_inge_Leidy.Model;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.Origin;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.RtmStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "Quick_Record")
@Table(name = "quick_record")
@Getter
@Setter
@NoArgsConstructor
public class QuickRecord {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "plate", nullable = false)
  private Vehicle vehicle;

  @Column(name = "phone", columnDefinition = "bpchar")
  @Pattern(regexp = "^\\d{10}$", message = "El teléfono debe tener exactamente 10 dígitos")
  private String phone;

  /**
   * Almacena la imagen de la tarjeta de propiedad en binario (BYTEA en PostgreSQL).
   */
  @Column(name = "ownership_card", columnDefinition = "BYTEA")
  private byte[] ownershipCard;

  @Enumerated(EnumType.STRING)
  @Column(name = "rtm_status", nullable = false,
    columnDefinition = "rtm_status_enum")
  private RtmStatus rtmStatus;

  @Enumerated(EnumType.STRING)
  @Column(name = "origin", nullable = false,
    columnDefinition = "origin_enum")
  private Origin origin;

  @Column(name = "report_date")
  private LocalDate reportDate;

  @Column(name = "is_complete", nullable = false)
  private Boolean isComplete = Boolean.FALSE;

  /**
   * Se asigna automáticamente al insertar el registro.
   */
  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;
}
