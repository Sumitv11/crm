package com.crm.controllers;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entities.Customer;
import com.crm.services.CustomerListService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/customer-list")
public class CustomerListController {
	
	private final CustomerListService customerListService;

	public CustomerListController(CustomerListService customerListService) {
		super();
		this.customerListService = customerListService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody Customer customer) {
		customerListService.create(customer);
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, customer);
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "customerType", direction = Direction.ASC) Pageable pageable) {
	    var list = customerListService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		Customer customerList = customerListService.getById(id);
		return ResponseGenerator.generateResponse("Success", customerList);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		customerListService.deleteById(id);
		return ResponseGenerator.generateResponse("Success", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody Customer customerList,@PathVariable Long id ){
		Customer updatedCustomerList = customerListService.updateCustomerList(customerList,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedCustomerList);
	}
	
	@GetMapping("/v1/getAll")
    public ResponseEntity<Object> v1getAll() {
		List<Customer> list= customerListService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Success", list);
    }

}
