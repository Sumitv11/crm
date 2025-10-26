package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.CustomerStatus;

public interface CustomerStatusRepositories extends JpaRepository<CustomerStatus, Long> {

	@Query("SELECT cs FROM CustomerStatus cs " +
	           "WHERE (:keyword IS NULL OR LOWER(cs.customerStatus) LIKE LOWER(CONCAT('%', :keyword, '%'))) " )
	    Page <CustomerStatus> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
