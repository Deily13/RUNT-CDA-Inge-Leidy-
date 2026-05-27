package com.example.RUNT_CDA_inge_Leidy.Model.Enum;

public enum CommentType {
  Realizada,
  NO_EN_VILLAO("no en Villao"),
  NO_CONTESTO("no contesto"),
  TRASPASO("traspaso"),
  DESVIADO("desviado"),
  FUERA_DE_SERVICIO("fuera de servicio");

  private final String value;

  CommentType(String value) {
    this.value = value;
  }

  CommentType() {
    this.value = this.name();
  }

  public String getValue() {
    return value;
  }
}
