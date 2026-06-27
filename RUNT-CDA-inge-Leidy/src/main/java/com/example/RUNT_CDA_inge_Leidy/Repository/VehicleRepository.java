package com.example.RUNT_CDA_inge_Leidy.Repository;

import com.example.RUNT_CDA_inge_Leidy.Model.Vehicle;
import com.example.RUNT_CDA_inge_Leidy.Model.Enum.VehicleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {

    // Todos los vehículos de un propietario
    List<Vehicle> findByOwnerId(Integer ownerId);

    // Filtrar por categoría
    List<Vehicle> findByCategory(VehicleCategory category);

    boolean existsByPlate(String plate);

  long countByOwnerId(Integer ownerId);
}
