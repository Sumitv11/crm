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

import com.crm.entities.InstallationLocation;
import com.crm.services.InstallationLocationServices;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/installation-location")
public class InstallationLocationController {

	private final InstallationLocationServices installationLocationServices;

	public InstallationLocationController(InstallationLocationServices installationLocationServices) {
		super();
		this.installationLocationServices = installationLocationServices;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody InstallationLocation installationLocation) {
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, 
				installationLocationServices.create(installationLocation));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "installationLocationId", direction = Direction.ASC) Pageable pageable) {
	    var list = installationLocationServices.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> getAll() {
		List<InstallationLocation> list=installationLocationServices.v1getAll();
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		InstallationLocation installationLocation = installationLocationServices.getById(id);
		return ResponseGenerator.generateResponse("Success", installationLocation);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		installationLocationServices.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody InstallationLocation installationLocation,@PathVariable Long id ){
		InstallationLocation updatedInstallationLocation = installationLocationServices.updateInstallationLocation(installationLocation,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedInstallationLocation);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchInstallationLocation(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "installationLocationId", direction = Direction.ASC) Pageable pageable) {
        var result = installationLocationServices.searchInstallationLocation(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }

}
