package com.crm.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/crm") 
public class CrmController {

	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.accepted().body("this is test api");
	}
}
