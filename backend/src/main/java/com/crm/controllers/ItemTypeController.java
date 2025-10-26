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

import com.crm.entities.ItemType;
import com.crm.services.ItemTypeService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/item-type")
public class ItemTypeController {

    private final ItemTypeService itemTypeService;

    public ItemTypeController(ItemTypeService itemTypeService) {
        this.itemTypeService = itemTypeService;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody ItemType itemType) {
        return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED,
        		itemTypeService.create(itemType));
    }

    @GetMapping("/getAll")
    public ResponseEntity< Object> getAll(
            @PageableDefault(page = 0, size = 10, sort = "typeName", direction = Direction.ASC) Pageable pageable) {
        var list = itemTypeService.getAll(pageable);
        return ResponseGenerator.generateResponse("Fetch Success", list);
    }
    
    @GetMapping("/v1/getAll")
    public ResponseEntity<Object> v1getAll() {
    	List <ItemType> list = itemTypeService.v1getAll();
        return ResponseGenerator.generateResponse("Fetch Success", list);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
        ItemType itemType = itemTypeService.getById(id);
        return ResponseGenerator.generateResponse("Success", itemType);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        itemTypeService.deleteById(id);
        return ResponseGenerator.generateResponse("Deleted Successfull", null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody ItemType itemType, @PathVariable Long id) {
        ItemType updatedItem = itemTypeService.updateItem(itemType, id);
        return ResponseGenerator.generateResponse("Updated Successful", updatedItem);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Object> searchItemType(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "typeName", direction = Direction.ASC) Pageable pageable) {
        var result = itemTypeService.searchItemType(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch", result);
    }
}

