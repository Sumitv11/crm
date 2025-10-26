package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.UnitMeasurement;

public interface UnitMeasurementRepositories extends JpaRepository<UnitMeasurement, Long> {
	@Query("SELECT um FROM UnitMeasurement um " +
	           "WHERE (:keyword IS NULL OR LOWER(um.symbol) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(um.uom) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<UnitMeasurement> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
