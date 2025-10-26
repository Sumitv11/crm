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

import com.crm.entities.Designation;
import com.crm.services.DesignationService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/designation")
public class DesignationController {

	private final DesignationService designationService;

	public DesignationController(DesignationService designationService) {
		super();
		this.designationService = designationService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody Designation designation) {
		designationService.create(designation);
		return ResponseGenerator.generateResponse("Created",HttpStatus.CREATED, designation);
	}

	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		var list = designationService.getAll(pageable);
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> getAll() {
		List<Designation> list=designationService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		Designation designation = designationService.getById(id);
		return ResponseGenerator.generateResponse("Success", designation);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		designationService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateAttributes(@RequestBody Designation designation,
			@PathVariable Long id) {
		Designation updatedDesignation = designationService.updateDesignation(designation, id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedDesignation);
	}

	@GetMapping("/search")
	public ResponseEntity<Object> searchDesignation(@RequestParam(required = false) String keyword,
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
		var result = designationService.searchDesignation(keyword, pageable);
		return ResponseGenerator.generateResponse("Fetch Successful", result);
	}

}
