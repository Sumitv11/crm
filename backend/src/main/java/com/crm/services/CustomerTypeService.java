package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.CustomerType;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.CustomerTypeRepositories;

@Service
public class CustomerTypeService {

	private final CustomerTypeRepositories customerTypeRepositories;

	public CustomerTypeService(CustomerTypeRepositories customerTypeRepositories) {
		super();
		this.customerTypeRepositories = customerTypeRepositories;
	}
	
	public List<CustomerType> getAll(Pageable pageable) {
		return customerTypeRepositories.findAll(pageable).getContent();
	}
	
	public List<CustomerType> v1getAll() {
		return customerTypeRepositories.findAll();
	}

	public void create(CustomerType customerType) {
		customerTypeRepositories.save(customerType);
	}

	public CustomerType getById(long id) {
		CustomerType customerType = customerTypeRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("CustomerType not found with id " + id));
		return customerType;
	}

	public void deleteById(long id) {
		if (customerTypeRepositories.existsById(id)) {
			customerTypeRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("CustomerType not found with id " + id);
		}
	}

	public CustomerType updateCustomerType(CustomerType customerType, long id) {
		CustomerType updatedCustomerType = customerTypeRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("CustomerType not present with id" + id));
		updatedCustomerType.setCustomerType(customerType.getCustomerType());
		updatedCustomerType.setIsActive(customerType.getIsActive());
		customerTypeRepositories.save(updatedCustomerType);
		return updatedCustomerType;
	}

	public List<CustomerType> searchCustomerType(String keyword, Pageable pageable) {
		return customerTypeRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
