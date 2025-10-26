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

import com.crm.entities.RefGasType;
import com.crm.services.RefGasTypeService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/ref-gasType")
public class RefGasTypeController {
	
	private final RefGasTypeService refGasTypeService;

	public RefGasTypeController(RefGasTypeService refGasTypeService) {
		super();
		this.refGasTypeService = refGasTypeService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody RefGasType refGasType) {
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED,
				refGasTypeService.create(refGasType));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "gasTypeName", direction = Direction.ASC) Pageable pageable) {
	    var list = refGasTypeService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
	    return ResponseGenerator.generateResponse("Fetch Success", refGasTypeService.v1getAll());
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		RefGasType gasType = refGasTypeService.getById(id);
		return ResponseGenerator.generateResponse("Success", gasType);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		refGasTypeService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody RefGasType gasType,@PathVariable Long id ){
		RefGasType updatedGasType = refGasTypeService.updateGasType(gasType,id);
		return ResponseGenerator.generateResponse("Updated Successfully", updatedGasType);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchItemCategories(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "gasTypeName", direction = Direction.ASC) Pageable pageable) {
        var result = refGasTypeService.searchRefGasTypes(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }

}
