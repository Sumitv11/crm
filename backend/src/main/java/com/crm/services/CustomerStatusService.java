package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.CustomerStatus;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.CustomerStatusRepositories;

@Service
public class CustomerStatusService {

	private final CustomerStatusRepositories customerStatusRepositories;

	public CustomerStatusService(CustomerStatusRepositories customerStatusRepositories) {
		super();
		this.customerStatusRepositories = customerStatusRepositories;
	}

	public List<CustomerStatus> getAll(Pageable pageable) {
		return customerStatusRepositories.findAll(pageable).getContent();
	}

	public void create(CustomerStatus customerStatus) {
		customerStatusRepositories.save(customerStatus);
	}

	public CustomerStatus getById(long id) {
		CustomerStatus customerStatus = customerStatusRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("CustomerStatus not found with id " + id));
		return customerStatus;
	}

	public void deleteById(long id) {
		if (customerStatusRepositories.existsById(id)) {
			customerStatusRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("CustomerType not found with id " + id);
		}
	}

	public CustomerStatus updateCustomerStatus(CustomerStatus customerStatus, long id) {
		CustomerStatus updatedCustomerStatus = customerStatusRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("CustomerStatus not present with id" + id));
		updatedCustomerStatus.setCustomerStatus(customerStatus.getCustomerStatus());
		updatedCustomerStatus.setIsActive(customerStatus.getIsActive());
		customerStatusRepositories.save(updatedCustomerStatus);
		return updatedCustomerStatus;
	}

	public List<CustomerStatus> searchCustomerStatus(String keyword, Pageable pageable) {
		return customerStatusRepositories.searchByKeyword(keyword, pageable).getContent();
	}
	
	public List<CustomerStatus> v1getAll() {
		return customerStatusRepositories.findAll();
	}

}
