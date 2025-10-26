package com.crm.controllers;

import com.crm.entities.Material;
import com.crm.entities.Services;
import com.crm.services.MaterialService;
import com.crm.util.ResponseGenerator;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }


    @GetMapping("/v1/getAll")
    public ResponseEntity<Object> getAllServices() {
        List<Material> materials = materialService.getAll();
        return ResponseGenerator.generateResponse("fetch Success", materials);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllServices(Pageable pageable) {
        List<Material> materials = materialService.getAll(pageable);
        return ResponseGenerator.generateResponse("fetch Success", materials);
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<Object> getServiceById(@PathVariable Long id) {
        return ResponseGenerator.generateResponse("Success", materialService.getById(id));
    }


    @PostMapping("/create")
    public ResponseEntity<Object> addService(@RequestBody Material material) {
        Material createdMaterial = materialService.create(material);
        return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, createdMaterial);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateMaterial(@PathVariable Long id, @RequestBody Material updatedMaterial) {
        Material material = materialService.updateMaterial(updatedMaterial, id);
        return ResponseGenerator.generateResponse("Updated Successful", material);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteMaterial(@PathVariable Long id) {
        materialService.deleteById(id);
        return ResponseGenerator.generateResponse("Deleted Successful", null);
    }


    @GetMapping("/search")
    public ResponseEntity<Object> searchMaterials(
            @RequestParam(value = "searchTerm", required = false, defaultValue = "materialName") String searchTerm,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        List <Material> materialPages = materialService.searchMaterial(searchTerm, PageRequest.of(page - 1, size));
        return ResponseGenerator.generateResponse("fetch Success", materialPages);
    }
}
