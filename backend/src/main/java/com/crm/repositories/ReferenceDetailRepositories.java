package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.ReferenceDetail;

public interface ReferenceDetailRepositories extends JpaRepository<ReferenceDetail, Long> {
	
	@Query("SELECT rd FROM ReferenceDetail rd " +
	           "WHERE (:keyword IS NULL OR LOWER(rd.referenceDetail) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(rd.sourceReference) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<ReferenceDetail> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
