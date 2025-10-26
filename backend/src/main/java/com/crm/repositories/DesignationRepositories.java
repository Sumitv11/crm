package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.Designation;

public interface DesignationRepositories extends JpaRepository<Designation, Long>{
	
	@Query("SELECT d FROM Designation d " +
	           "WHERE (:keyword IS NULL OR LOWER(d.code) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(d.designation) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<Designation> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
