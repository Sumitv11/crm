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

import com.crm.entities.ItemCategory;
import com.crm.services.ItemCategoryService;
import com.crm.util.ResponseGenerator;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/item-category")
public class ItemCategoryController {

	private ItemCategoryService itemCategoryService;

	public ItemCategoryController(ItemCategoryService itemCategoryService) {
		super();
		this.itemCategoryService = itemCategoryService;
	}

	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody ItemCategory itemCategory) {
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED ,
				itemCategoryService.create(itemCategory));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "categoryName", direction = Direction.ASC) Pageable pageable) {
	    var list = itemCategoryService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
		List<ItemCategory> list=itemCategoryService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		ItemCategory itemCategory = itemCategoryService.getById(id);
		return ResponseGenerator.generateResponse("Success", itemCategory);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		itemCategoryService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody ItemCategory itemCategory,@PathVariable Long id ){
		ItemCategory updatedItem = itemCategoryService.updateItem(itemCategory,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedItem);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchItemCategories(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "categoryName", direction = Direction.ASC)  Pageable pageable) {
        var result = itemCategoryService.searchItemCategories(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }
}
