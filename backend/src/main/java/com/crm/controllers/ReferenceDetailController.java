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

import com.crm.entities.ReferenceDetail;
import com.crm.services.ReferenceDetailService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/reference-detail")
public class ReferenceDetailController {
	
	private final ReferenceDetailService referenceDetailService;

	public ReferenceDetailController(ReferenceDetailService referenceDetailService) {
		super();
		this.referenceDetailService = referenceDetailService;
	}
	
	@PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody ReferenceDetail referenceDetail) {
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, 
				referenceDetailService.create(referenceDetail));
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getAll(
            @PageableDefault(page = 0, size = 10, sort = "referenceDetail", direction = Direction.ASC) Pageable pageable) {
        List <ReferenceDetail> list = referenceDetailService.getAll(pageable);
        return ResponseGenerator.generateResponse("Fetch Success", list);
    }
    
    @GetMapping("/v1/getAll")
    public ResponseEntity<Object> v1getAll() {
        return ResponseGenerator.generateResponse("Fetch Success", referenceDetailService.v1getAll());
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
    	ReferenceDetail referenceDetail = referenceDetailService.getById(id);
        return ResponseGenerator.generateResponse("Success", referenceDetail);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
    	referenceDetailService.deleteById(id);
    	return ResponseGenerator.generateResponse("Deleted Successful", null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody ReferenceDetail referenceDetail, @PathVariable Long id) {
    	ReferenceDetail updatedReferenceDetail = referenceDetailService.updateReferenceDetail(referenceDetail, id);
    	return ResponseGenerator.generateResponse("Updated Successful", updatedReferenceDetail);
    }
    @GetMapping("/search")
    public ResponseEntity<Object> searchReferenceDetail(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "referenceDetail", direction = Direction.ASC) Pageable pageable) {
        var result = referenceDetailService.searchReferenceDetail(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Successful", result);
    }


}
