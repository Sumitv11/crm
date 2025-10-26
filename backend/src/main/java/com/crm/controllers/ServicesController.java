package com.crm.controllers;

import java.io.IOException;
import java.util.List;

import com.crm.dto.ServiceDto;
import com.crm.entities.SalesAttachment;
import com.crm.entities.ServiceAttachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import com.crm.entities.Services;
import com.crm.services.ServicesService;
import com.crm.util.ResponseGenerator;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/services")
public class ServicesController {

    @Value("${project.files}")
    private String folderPath;

    @Autowired
    private ServicesService servicesService;

   
    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllServices() {
        List<Services> services = servicesService.getAll();
        return ResponseGenerator.generateResponse("fetch Success", services);
    }
    
    @GetMapping("/v1//getAll")
    public ResponseEntity<Object> getAllServices(Pageable pageable) {
        List<Services> services = servicesService.getAll(pageable);
        return ResponseGenerator.generateResponse("fetch Success", services);
    }

    
    @GetMapping("/getById/{id}")
    public ResponseEntity<Object> getServiceById(@PathVariable Long id) {
        return ResponseGenerator.generateResponse("Success", servicesService.getById(id));
    }

   
    @PostMapping("/create")
    public ResponseEntity<Object> addService(@RequestBody ServiceDto service) {
        Services createdService = servicesService.create(service);
        return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, createdService);
    }

    
    @PutMapping("/update/{service_id}")
    public ResponseEntity<Object> updateService(@PathVariable Long service_id, @RequestBody ServiceDto updatedService) {
            Services service = servicesService.updateService(updatedService, service_id);
            return ResponseGenerator.generateResponse("Updated Successful", service);
    }

   
    @DeleteMapping("/delete/{service_id}")
    public ResponseEntity<Object> deleteService(@PathVariable Long service_id) {
            servicesService.deleteById(service_id);
         return ResponseGenerator.generateResponse("Deleted Successful", null);
    }
    
    
    @GetMapping("/search")
    public ResponseEntity<Object> searchServices(
            @RequestParam(value = "searchTerm", required = false, defaultValue = "") String searchTerm,
            @RequestParam(value = "page", defaultValue = "1") int page, 
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
    	List <Services> servicesPages = servicesService.searchService(searchTerm, PageRequest.of(page - 1, size));
        return ResponseGenerator.generateResponse("fetch Success", servicesPages);
    }
    @GetMapping("/getNextServiceNo")
    public ResponseEntity<Object> getNextServiceNo() {
        Long serviceNo = servicesService.getNextServiceNo();
        return ResponseGenerator.generateResponse("Success", serviceNo);
    }

    @PostMapping("/uploadFile")
    public ResponseEntity<Object> uploadFile(@RequestParam MultipartFile file) {
        ServiceAttachment serviceAttachment = null;
        try {
            serviceAttachment = servicesService.uploadFile(folderPath+"service", file);
        } catch (IOException e) {
            System.out.println(e);
            throw new RuntimeException("Could not store file");
        }
        return ResponseGenerator.generateResponse("File uploaded successfully", serviceAttachment);
    }


}
