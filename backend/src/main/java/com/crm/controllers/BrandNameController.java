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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crm.entities.BrandName;
import com.crm.services.BrandNameService;
import com.crm.util.ResponseGenerator;

@RestController
@RequestMapping("/api/brand-name")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BrandNameController {
    private final BrandNameService brandNameService;

    public BrandNameController(BrandNameService brandNameService) {
        this.brandNameService = brandNameService;
    }

	@PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody BrandName brandName) {
        brandNameService.create(brandName);
        return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED,brandName);
    }

	@GetMapping("/getAll")
    public ResponseEntity<Object> getAll(
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        var list = brandNameService.getAll(pageable);
        return ResponseGenerator.generateResponse(null, list);
    }
    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) {
        BrandName brandName = brandNameService.getById(id);
        return ResponseGenerator.generateResponse("Success", brandName);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        brandNameService.deleteById(id);
        return ResponseGenerator.generateResponse("Deleted Successful", null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody BrandName brandName,
                                                        @PathVariable Long id) {
        BrandName updatedBrandName = brandNameService.updateBrandName(brandName, id);
        return ResponseGenerator.generateResponse("Updated Successful", updatedBrandName);
    }

    @GetMapping("/search")
    public ResponseEntity<Object> searchDesignation(@RequestParam(required = false) String keyword,
                                          @PageableDefault(page = 0, size = 10, sort = "id",
                                                  direction = Sort.Direction.ASC) Pageable pageable) {
        var result = brandNameService.searchBrandName(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }
    
    @GetMapping("/v1/getAll")
    public ResponseEntity<Object> v1getAll() {
    	List<BrandName> list= brandNameService.v1getAll();
        return ResponseGenerator.generateResponse("Fetch Success", list);
    }

}
