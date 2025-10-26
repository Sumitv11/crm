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

import com.crm.entities.Product;
import com.crm.enums.ProductType;
import com.crm.services.ProductService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody Product product) {
        return ResponseGenerator.generateResponse("Creates", HttpStatus.CREATED,
        		productService.create(product));
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getAll(
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        var list = productService.getAll(pageable);
        return ResponseGenerator.generateResponse("Fetch Success", list);
    }
    
    @GetMapping("/v1/getAll")
    public ResponseEntity<Object> v1getAll() {
    	List<Product> list =productService.v1getAll();
    	return ResponseGenerator.generateResponse("Fetch Success", list);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
        Product product = productService.getById(id);
        return ResponseGenerator.generateResponse("Success", product);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        productService.deleteById(id);
        return ResponseGenerator.generateResponse("Deleted Successful", null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody Product product, @PathVariable Long id ){
        Product updatedProduct = productService.updateProduct(product,id);
        return ResponseGenerator.generateResponse("Updated Successful", updatedProduct);
    }

    @GetMapping("/search")
    public ResponseEntity<Object> searchProduct(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        var result = productService.searchProduct(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }
    
    @GetMapping("/findByProductType")
    public ResponseEntity<Object> findByProductType(@RequestParam ProductType productType) {
        var result = productService.findByProductType(productType);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }

}
