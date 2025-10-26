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

import com.crm.entities.SourceReference;
import com.crm.services.SourceReferenceService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/source-reference")
public class SourceReferenceController {
		
	private final SourceReferenceService sourceReferenceService;

	public SourceReferenceController(SourceReferenceService sourceReferenceService) {
		super();
		this.sourceReferenceService = sourceReferenceService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody SourceReference sourceReference) {
		return ResponseGenerator.generateResponse("Created",HttpStatus.CREATED,
				sourceReferenceService.create(sourceReference));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "code", direction = Direction.ASC) Pageable pageable) {
	    var list = sourceReferenceService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
	    return ResponseGenerator.generateResponse("Fetch Success", sourceReferenceService.v1getAll());
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		SourceReference sourceReference = sourceReferenceService.getById(id);
		return ResponseGenerator.generateResponse("Success", sourceReference);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		sourceReferenceService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody SourceReference sourceReference,@PathVariable Long id ){
		SourceReference updatedSourceReference = sourceReferenceService.updateSourceReference(sourceReference,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedSourceReference);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchItemCategories(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "code", direction = Direction.ASC) Pageable pageable) {
        var result = sourceReferenceService.searchSourceReference(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }
}
