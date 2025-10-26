package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.Customer;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.CustomerListRepositories;

@Service
public class CustomerListService {

	private final CustomerListRepositories customerListRepositories;

	public CustomerListService(CustomerListRepositories customerListRepositories) {
		super();
		this.customerListRepositories = customerListRepositories;
	}
	
	public List<Customer> getAll(Pageable pageable) {
		return customerListRepositories.findAll(pageable).getContent();
	}

	public void create(Customer customerList) {
		customerListRepositories.save(customerList);
	}

	public Customer getById(long id) {
		Customer customerList = customerListRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + id));
		return customerList;
	}

	public void deleteById(long id) {
		if (customerListRepositories.existsById(id)) {
			customerListRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Customer not found with id " + id);
		}
	}

	public Customer updateCustomerList(Customer customerList, long id) {
		Customer updatedCustomerList = customerListRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not present with id" + id));
		updatedCustomerList.setAddress1(customerList.getAddress1());
		updatedCustomerList.setAdress2(customerList.getAdress2());
		updatedCustomerList.setAdress3(customerList.getAdress3());
		updatedCustomerList.setContactNumber(customerList.getContactNumber());
		updatedCustomerList.setContactPerson(customerList.getContactPerson());
		updatedCustomerList.setCustomerName(customerList.getCustomerName());
		updatedCustomerList.setCustomerStatus(customerList.getCustomerStatus());
		updatedCustomerList.setCustomerType(customerList.getCustomerType());
		updatedCustomerList.setCustomerWeightage(customerList.getCustomerWeightage());
		updatedCustomerList.setDesignation(customerList.getDesignation());
		updatedCustomerList.setEmail(customerList.getEmail());
		updatedCustomerList.setGstNo(customerList.getGstNo());
		updatedCustomerList.setIsActive(customerList.getIsActive());
		updatedCustomerList.setPanNo(customerList.getPanNo());
		updatedCustomerList.setReferenceDetail(customerList.getReferenceDetail());
		updatedCustomerList.setReferenceRemark(customerList.getReferenceRemark());
		updatedCustomerList.setSourceReference(customerList.getSourceReference());
		updatedCustomerList.setTanNo(customerList.getTanNo());
		customerListRepositories.save(updatedCustomerList);
		return updatedCustomerList;
	}
	
	public List<Customer> v1getAll() {
		return customerListRepositories.findAll();
	}

}
