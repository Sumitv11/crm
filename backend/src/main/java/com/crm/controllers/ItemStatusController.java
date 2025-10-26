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

import com.crm.entities.ItemStatus;
import com.crm.services.ItemStatusService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/item-status")
public class ItemStatusController {

	private final ItemStatusService itemStatusService;
	
	public ItemStatusController(ItemStatusService itemStatusService) {
		super();
		this.itemStatusService = itemStatusService;
	}

	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody ItemStatus itemStatus) {
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, 
				                                      itemStatusService.create(itemStatus));
	}
	

	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "statusName", direction = Direction.ASC) Pageable pageable) {
	    var list = itemStatusService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
		List<ItemStatus> list =itemStatusService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		ItemStatus itemStatus = itemStatusService.getById(id);
		return ResponseGenerator.generateResponse("Success", itemStatus);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		itemStatusService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody ItemStatus itemStatus,@PathVariable Long id ){
		ItemStatus updatedItem = itemStatusService.updateItem(itemStatus,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedItem);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchItemStatus(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "statusName", direction = Direction.ASC) Pageable pageable) {
        var result = itemStatusService.searchItemStatus(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }

}
