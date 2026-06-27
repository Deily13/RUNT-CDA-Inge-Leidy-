package com.example.RUNT_CDA_inge_Leidy.Repository;

import com.example.RUNT_CDA_inge_Leidy.Model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Integer> {

    Optional<Owner> findByDocumentNumber(String documentNumber);

    boolean existsByDocumentNumber(String documentNumber);
}