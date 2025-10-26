package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.Services;

public interface ServicesRepository extends JpaRepository<Services, Long> {
	@Query("""
		    SELECT s FROM Services s 
		    LEFT JOIN s.client c 
		    LEFT JOIN s.product p
		     WHERE CAST(s.serviceNo AS string) LIKE CONCAT('%', :searchTerm, '%') OR
		          LOWER(s.contactPerson) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR 
		          LOWER(s.problem) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR 
		          LOWER(s.actionTaken) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR 
		          LOWER(c.customerName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR 
		          LOWER(p.productName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
		""")
		Page<Services> searchServices(@Param("searchTerm") String searchTerm, Pageable pageable);

	@Query("SELECT MAX(s.serviceNo) FROM Services s")
	Long findMaxServiceNo();
}
