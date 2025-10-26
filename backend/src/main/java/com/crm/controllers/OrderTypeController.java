package com.crm.controllers;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.crm.entities.OrderType;
import com.crm.services.OrderTypeService;
import com.crm.util.ResponseGenerator;

import jakarta.validation.Valid;

@RestController()
@RequestMapping("/api/order-type")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderTypeController {

	private final OrderTypeService orderTypeService;
	
	public OrderTypeController(OrderTypeService orderTypeService) {
		super();
		this.orderTypeService = orderTypeService;
	}

	@PostMapping("/create")
	public ResponseEntity<Object> create(@Valid @RequestBody OrderType orderType) {
		OrderType orderTypenew = orderTypeService.create(orderType);
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, orderTypenew);
	}

	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
		var list = orderTypeService.getAll(pageable);
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		OrderType orderType = orderTypeService.getById(id);
		return ResponseGenerator.generateResponse("Success", orderType);
	}


	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		orderTypeService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateAttributes(@Valid @RequestBody OrderType orderType, @PathVariable Long id) {
		OrderType updatedOrderType = orderTypeService.updateOrderType(orderType, id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedOrderType);
	}

	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
		List<OrderType> list = orderTypeService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Successful", list);
	}


}
