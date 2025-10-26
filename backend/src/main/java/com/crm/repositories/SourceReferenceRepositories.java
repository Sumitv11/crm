package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.SourceReference;

public interface SourceReferenceRepositories extends JpaRepository<SourceReference, Long> {
	
	@Query("SELECT sf FROM SourceReference sf " +
	           "WHERE (:keyword IS NULL OR LOWER(sf.code) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(sf.sourceReference) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<SourceReference> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);


}
