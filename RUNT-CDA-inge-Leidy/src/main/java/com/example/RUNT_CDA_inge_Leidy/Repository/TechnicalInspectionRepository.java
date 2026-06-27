package com.example.RUNT_CDA_inge_Leidy.Repository;

import com.example.RUNT_CDA_inge_Leidy.Model.Enum.DocumentType;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import com.example.RUNT_CDA_inge_Leidy.Model.TechnicalInspection;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.RtmStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface TechnicalInspectionRepository extends JpaRepository<TechnicalInspection, Integer>,
                                                       JpaSpecificationExecutor<TechnicalInspection>
{

  List<TechnicalInspection> findByVehiclePlate(String plate);

  Optional<TechnicalInspection> findTopByVehiclePlateOrderByValidUntilDesc(String plate);

  List<TechnicalInspection> findByStatus(RtmStatus status);

  long countByVehiclePlate(String plate);


}
