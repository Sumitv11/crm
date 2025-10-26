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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entities.CustomerStatus;
import com.crm.services.CustomerStatusService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/customer-status")
public class CustomerStatusController {
	private final CustomerStatusService customerStatusService;

	public CustomerStatusController(CustomerStatusService customerStatusService) {
		super();
		this.customerStatusService = customerStatusService;
	}

	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody CustomerStatus customerStatus) {
		customerStatusService.create(customerStatus);
		return ResponseGenerator.generateResponse("Created",HttpStatus.CREATED, customerStatus);
	}

	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		var list = customerStatusService.getAll(pageable);
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		CustomerStatus customerStatus = customerStatusService.getById(id);
		return ResponseGenerator.generateResponse("Success", customerStatus);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		customerStatusService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateAttributes(@RequestBody CustomerStatus customerStatus,
			@PathVariable Long id) {
		CustomerStatus updatedcustomerStatus = customerStatusService.updateCustomerStatus(customerStatus, id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedcustomerStatus);
	}

	@GetMapping("/search")
	public ResponseEntity<Object> searchCustomerStatus(@RequestParam(required = false) String keyword,
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		var result = customerStatusService.searchCustomerStatus(keyword, pageable);
		return ResponseGenerator.generateResponse("Fetch", result);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> getAll() {
		List<CustomerStatus> list =customerStatusService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}

}
