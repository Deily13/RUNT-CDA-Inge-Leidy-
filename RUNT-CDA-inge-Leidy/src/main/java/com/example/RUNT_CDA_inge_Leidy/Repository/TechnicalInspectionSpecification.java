package com.example.RUNT_CDA_inge_Leidy.Repository;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.RtmStatus;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import com.example.RUNT_CDA_inge_Leidy.Model.TechnicalInspection;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

public class TechnicalInspectionSpecification {

  // ── Entrada principal ─────────────────────────────────────────────────────
  public static Specification<TechnicalInspection> conFiltros(
    String          placa,
    VehicleCategory categoria,
    List<RtmStatus> estados,
    DocumentType    tipoDocumento,
    String          numeroDocumento,
    LocalDate       fecha,
    Integer         mes,
    Integer         anio
  ) {
    return Specification
      .where(porPlaca(placa))
      .and(porCategoria(categoria))
      .and(porEstados(estados))
      .and(porTipoDocumento(tipoDocumento))
      .and(porNumeroDocumento(numeroDocumento))
      .and(porFecha(fecha))
      .and(porMes(mes))
      .and(porAnio(anio));
  }

  // ── Filtros individuales ──────────────────────────────────────────────────
  private static Specification<TechnicalInspection> porPlaca(String placa) {
    return (root, query, cb) -> !StringUtils.hasText(placa) ? null
      : cb.equal(root.get("vehicle").get("plate"), placa.toUpperCase());
  }

  private static Specification<TechnicalInspection> porCategoria(VehicleCategory categoria) {
    return (root, query, cb) -> categoria == null ? null
      : cb.equal(root.get("vehicle").get("category"), categoria);
  }

  private static Specification<TechnicalInspection> porEstados(List<RtmStatus> estados) {
    return (root, query, cb) -> (estados == null || estados.isEmpty()) ? null
      : root.get("status").in(estados);
  }

  private static Specification<TechnicalInspection> porTipoDocumento(DocumentType tipoDocumento) {
    return (root, query, cb) -> tipoDocumento == null ? null
      : cb.equal(root.get("vehicle").get("owner").get("documentType"), tipoDocumento);
  }

  private static Specification<TechnicalInspection> porNumeroDocumento(String numeroDocumento) {
    return (root, query, cb) -> !StringUtils.hasText(numeroDocumento) ? null
      : cb.like(
      root.get("vehicle").get("owner").get("documentNumber"),
      "%" + numeroDocumento.trim() + "%"
    );
  }

  private static Specification<TechnicalInspection> porFecha(LocalDate fecha) {
    return (root, query, cb) -> fecha == null ? null
      : cb.equal(root.get("validFrom"), fecha);
  }

  private static Specification<TechnicalInspection> porMes(Integer mes) {
    return (root, query, cb) -> mes == null ? null
      : cb.equal(
      cb.function("EXTRACT_MONTH", Integer.class,
        cb.literal("MONTH"), root.get("validFrom")),
      mes
    );
  }

  private static Specification<TechnicalInspection> porAnio(Integer anio) {
    return (root, query, cb) -> anio == null ? null
      : cb.equal(
      cb.function("EXTRACT_YEAR", Integer.class,
        cb.literal("YEAR"), root.get("validFrom")),
      anio
    );
  }
}
