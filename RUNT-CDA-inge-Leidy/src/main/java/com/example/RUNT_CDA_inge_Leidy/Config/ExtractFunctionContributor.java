package com.example.RUNT_CDA_inge_Leidy.Config;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.type.StandardBasicTypes;

public class ExtractFunctionContributor implements FunctionContributor {

  @Override
  public void contributeFunctions(FunctionContributions contributions) {
    contributions.getFunctionRegistry().registerPattern(
      "EXTRACT_MONTH",
      "EXTRACT(MONTH FROM ?2)",
      contributions.getTypeConfiguration()
        .getBasicTypeRegistry()
        .resolve(StandardBasicTypes.INTEGER)
    );
    contributions.getFunctionRegistry().registerPattern(
      "EXTRACT_YEAR",
      "EXTRACT(YEAR FROM ?2)",
      contributions.getTypeConfiguration()
        .getBasicTypeRegistry()
        .resolve(StandardBasicTypes.INTEGER)
    );
  }
}
