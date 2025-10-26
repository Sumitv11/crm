package com.crm.repositories;

import com.crm.entities.MaterialQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MaterialQuantityRepository extends JpaRepository<MaterialQuantity,Long> {

    List<MaterialQuantity> findByServiceId(Long serviceId);
}
