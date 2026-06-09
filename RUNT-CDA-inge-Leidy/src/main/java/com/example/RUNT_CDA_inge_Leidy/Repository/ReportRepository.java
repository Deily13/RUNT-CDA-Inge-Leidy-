package com.example.RUNT_CDA_inge_Leidy.Repository;
 
import com.example.RUNT_CDA_inge_Leidy.Model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
 
    // Reportes de un vehículo
    List<Report> findByVehiclePlate(String plate);
 
    // Reportes pendientes (no completos)
    List<Report> findByIsCompleteFalse();
 
    // Reportes de una inspección específica
    List<Report> findByInspectionId(Integer inspectionId);
}
 
