package com.crm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.entities.SalesProductQuantity;

public interface SalesProductQuantityRepository extends JpaRepository<SalesProductQuantity, Long> {
	

	List<SalesProductQuantity> findBySalesId(Long salesId);
}
