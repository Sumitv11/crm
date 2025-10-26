package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.CustomerType;

public interface CustomerTypeRepositories extends JpaRepository<CustomerType, Long> {
	@Query("SELECT ct FROM CustomerType ct " +
	           "WHERE (:keyword IS NULL OR LOWER(ct.customerType) LIKE LOWER(CONCAT('%', :keyword, '%'))) "	)
	    Page<CustomerType> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
