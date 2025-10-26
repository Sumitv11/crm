package com.crm.controllers;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.crm.dto.DeliveryChallanDto;
import com.crm.entities.DeliveryChallan;
import com.crm.services.DeliveryChallanService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/delivery-challan")
public class DeliveryChallanController {

	private final DeliveryChallanService deliveryChallanService;

	public DeliveryChallanController(DeliveryChallanService deliveryChallanService) {
		super();
		this.deliveryChallanService = deliveryChallanService;
	}

	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody DeliveryChallanDto deliveryChallan) {
		DeliveryChallan challan = deliveryChallanService.create(deliveryChallan);
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, challan);
	}

	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
		var list = deliveryChallanService.getAll(pageable);
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		DeliveryChallan deliveryChallan = deliveryChallanService.getById(id);
		return ResponseGenerator.generateResponse("Success", deliveryChallan);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		deliveryChallanService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateAttributes(@RequestBody DeliveryChallanDto deliveryChallan,
			@PathVariable Long id) {
		DeliveryChallan updatedDeliveryChallan = deliveryChallanService.updateDeliveryChallan(deliveryChallan, id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedDeliveryChallan);
	}

	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
		List<DeliveryChallanDto> list = deliveryChallanService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Successful", list);
	}

	@GetMapping("/search")
	public ResponseEntity<Object> searchItemCategories(@RequestParam(required = false) String keyword,
			@PageableDefault(page = 0, size = 10, sort = "tonCapacityName", direction = Direction.ASC) Pageable pageable) {
		var result = deliveryChallanService.searchDeliveryChallan(keyword, pageable);
		return ResponseGenerator.generateResponse("Fetch Success", result);
	}

	@GetMapping("/getNextChallanNo")
	public ResponseEntity<Object> getNextInvoiceNo() {
		Long challanNo = deliveryChallanService.getNextChallanNo();
		return ResponseGenerator.generateResponse("Success", challanNo);
	}
}
