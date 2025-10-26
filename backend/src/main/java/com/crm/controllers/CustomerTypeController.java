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

import com.crm.entities.CustomerType;
import com.crm.services.CustomerTypeService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/customer-type")
public class CustomerTypeController {
	private final CustomerTypeService customerTypeService;

	public CustomerTypeController(CustomerTypeService customerTypeService) {
		super();
		this.customerTypeService = customerTypeService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody CustomerType customerType) {
		customerTypeService.create(customerType);
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, customerType);
	}
	
	@GetMapping("/getAll")
	public ResponseEntity <Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "customerType", direction = Direction.ASC) Pageable pageable) {
	    var list = customerTypeService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		CustomerType customerType = customerTypeService.getById(id);
		return ResponseGenerator.generateResponse("Success", customerType);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		customerTypeService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody CustomerType customerType,@PathVariable Long id ){
		CustomerType updatedcustomerType = customerTypeService.updateCustomerType(customerType,id);
		return ResponseGenerator.generateResponse("Updated Successfully", updatedcustomerType);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchItemCategories(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "customerType", direction = Direction.ASC) Pageable pageable) {
        var result = customerTypeService.searchCustomerType(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> getAll() {
		List<CustomerType> list=customerTypeService.v1getAll();
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}

}
