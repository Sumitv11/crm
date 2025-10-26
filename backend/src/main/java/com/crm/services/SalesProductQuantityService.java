package com.crm.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.crm.entities.SalesProductQuantity;
import com.crm.repositories.SalesProductQuantityRepository;

@Service
public class SalesProductQuantityService {

	private final SalesProductQuantityRepository salesProductQuantityRepository;
	
	
	public SalesProductQuantityService(SalesProductQuantityRepository salesProductQuantityRepository) {
		super();
		this.salesProductQuantityRepository = salesProductQuantityRepository;
	}

	public SalesProductQuantity create(SalesProductQuantity productQuantity) {
		return salesProductQuantityRepository.save(productQuantity);
	}
	
	public List<SalesProductQuantity> findBySalesId(Long salesId) {
	    return salesProductQuantityRepository.findBySalesId(salesId);
	}

}
