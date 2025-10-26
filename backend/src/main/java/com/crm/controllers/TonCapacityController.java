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

import com.crm.entities.TonCapacity;
import com.crm.services.TonCapacityService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/ton-capacity")
public class TonCapacityController {

	private final TonCapacityService tonCapacityService;

	public TonCapacityController(TonCapacityService tonCapacityService) {
		super();
		this.tonCapacityService = tonCapacityService;
	}
	 
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody TonCapacity tonCapacity) {
		return ResponseGenerator.generateResponse("Creates", HttpStatus.CREATED, 
				tonCapacityService.create(tonCapacity));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "tonCapacityName", direction = Direction.ASC) Pageable pageable) {
	    var list = tonCapacityService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> getAll() {
	    return ResponseGenerator.generateResponse("Fetch Success", tonCapacityService.v1getAll()); 
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		TonCapacity gasType = tonCapacityService.getById(id);
		return ResponseGenerator.generateResponse("Success", gasType);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		tonCapacityService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody TonCapacity tonCapacity,@PathVariable Long id ){
		TonCapacity updatedTonCapacity = tonCapacityService.updateTonCapacity(tonCapacity,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedTonCapacity);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchItemCategories(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "tonCapacityName", direction = Direction.ASC) Pageable pageable) {
        var result = tonCapacityService.searchTonCapacity(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }

}
