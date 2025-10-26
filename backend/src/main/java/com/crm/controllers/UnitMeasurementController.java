package com.crm.controllers;

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

import com.crm.entities.UnitMeasurement;
import com.crm.services.UnitMeasurementService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/unit-measurement")
public class UnitMeasurementController {
		private final UnitMeasurementService unitMeasurementService;

		public UnitMeasurementController(UnitMeasurementService unitMeasurementService) {
			super();
			this.unitMeasurementService = unitMeasurementService;
		}
		
		@PostMapping("/create")
		public ResponseEntity<Object> create(@RequestBody UnitMeasurement unitMeasurement) {
			return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, 
					unitMeasurementService.create(unitMeasurement));
		}

		@GetMapping("/getAll")
		public ResponseEntity<Object> getAll(
				@PageableDefault(page = 0, size = 10, sort = "symbol", direction = Direction.ASC) Pageable pageable) {
			var list = unitMeasurementService.getAll(pageable);
			return ResponseGenerator.generateResponse("Fetch Successful", list);
		}
		
		@GetMapping("/v1/getAll")
		public ResponseEntity<Object> getAll() {
			return ResponseGenerator.generateResponse("Fetch Successful", unitMeasurementService.v1getAll());
		}
		
		@GetMapping("/getById/{id}")
		public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
			UnitMeasurement unitMeasurement = unitMeasurementService.getById(id);
			return ResponseGenerator.generateResponse("Success", unitMeasurement);
		}

		@DeleteMapping("/deleteById/{id}")
		public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
			unitMeasurementService.deleteById(id);
			return ResponseGenerator.generateResponse("Deleted Successful", null);
		}

		@PutMapping("/update/{id}")
		public ResponseEntity<Object> updateAttributes(@RequestBody UnitMeasurement unitMeasurement,
				@PathVariable Long id) {
			UnitMeasurement updatedUnitMeasurement = unitMeasurementService.updateUnitMeasurement(unitMeasurement, id);
			return ResponseGenerator.generateResponse("Updated Successful", updatedUnitMeasurement);
		}

		@GetMapping("/search")
		public ResponseEntity<Object> searchUnitMeasurement(@RequestParam(required = false) String keyword,
				@PageableDefault(page = 0, size = 10, sort = "symbol", direction = Direction.ASC) Pageable pageable) {
			var result = unitMeasurementService.searchUnitMeasurements(keyword, pageable);
			return ResponseGenerator.generateResponse("Fetch Successful", result);
		}

		
		
}
