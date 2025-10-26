package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.RefGasType;

public interface RefGasTypeRepositories extends JpaRepository<RefGasType, Long> {

	@Query("SELECT rgt FROM RefGasType rgt " +
	           "WHERE (:keyword IS NULL OR LOWER(rgt.typeCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(rgt.gasTypeName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<RefGasType> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
