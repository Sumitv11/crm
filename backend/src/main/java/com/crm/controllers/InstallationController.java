package com.crm.controllers;

import java.io.IOException;
import java.util.List;

import com.crm.dto.InstallationDto;
import com.crm.entities.InstallationAttachment;
import com.crm.entities.ServiceAttachment;
import org.springframework.beans.factory.annotation.Value;
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

import com.crm.entities.Installation;
import com.crm.services.InstallationService;
import com.crm.util.ResponseGenerator;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/installation")
public class InstallationController {

	@Value("${project.files}")
	private String folderPath;
	private final InstallationService installationService;

	public InstallationController(InstallationService installationService) {
		super();
		this.installationService = installationService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody InstallationDto installation) {
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, 
				installationService.create(installation));
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
	    var list = installationService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> getAll() {
		List<Installation> list=installationService.v1getAll();
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		InstallationDto installation = installationService.getById(id);
		return ResponseGenerator.generateResponse("Success", installation);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		installationService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody InstallationDto installation,@PathVariable Long id ){
		Installation updatedInstallation = installationService.updateInstallation(installation,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedInstallation);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchInstallation(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Direction.ASC) Pageable pageable) {
        var result = installationService.searchInstallation(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }

	@GetMapping("/getNextInstallationNo")
	public ResponseEntity<Object> getNextInvoiceNo() {
		Long installationNo = installationService.getNextInstallationNo();
		return ResponseGenerator.generateResponse("Success", installationNo);
	}

	@PostMapping("/uploadFile")
	public ResponseEntity<Object> uploadFile(@RequestParam MultipartFile file) {
		InstallationAttachment installationAttachment = null;
		try {
			installationAttachment = installationService.uploadFile(folderPath+"installation", file);
		} catch (IOException e) {
			System.out.println(e);
			throw new RuntimeException("Could not store file");
		}
		return ResponseGenerator.generateResponse("File uploaded successfully", installationAttachment);
	}

}
