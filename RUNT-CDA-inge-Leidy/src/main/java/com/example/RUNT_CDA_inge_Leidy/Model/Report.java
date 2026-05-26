package com.example.RUNT_CDA_inge_Leidy.Model;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.CommentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import java.time.LocalDate;

@Entity
@Table(name = "report")
@Getter
@Setter
@NoArgsConstructor
public class Report {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "vehicle_id", nullable = false)
  private Vehicle vehicle;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "inspection_id")
  private TechnicalInspection inspection;

  @Column(name = "report_date")
  private LocalDate reportDate;

  @Column(name = "entry_date")
  private LocalDate entryDate;

  @Enumerated(EnumType.STRING)
  @Column(name = "comment", columnDefinition = "comment_enum")
  private CommentType comment;

  @Column(name = "is_complete", nullable = false)
  private Boolean isComplete = Boolean.FALSE;
}
