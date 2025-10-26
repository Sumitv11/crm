package com.crm.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.multipart.MultipartFile;

import com.crm.dto.SalesDto;
import com.crm.entities.Sales;
import com.crm.entities.SalesAttachment;
import com.crm.services.SalesService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/sales")
public class SalesController {

	@Value("${project.files}")
	private String folderPath;
	private final SalesService salesService;

	public SalesController(SalesService salesService) {
		super();
		this.salesService = salesService;
	}

	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody SalesDto salesDto) {
		Sales sales = salesService.create(salesDto);
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, sales);
	}

	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
			@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
		var list = salesService.getAll(pageable);
		return ResponseGenerator.generateResponse("Fetch Success", list);
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		Sales sales = salesService.getById(id);
		return ResponseGenerator.generateResponse("Success", sales);
	}

	@GetMapping("/getNextInvoiceNo")
	public ResponseEntity<Object> getNextInvoiceNo() {
		Long invoiceNo = salesService.getNextInvoiceNo();
		return ResponseGenerator.generateResponse("Success", invoiceNo);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		salesService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Successful", null);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateAttributes(@RequestBody SalesDto sales, @PathVariable Long id) {
		Sales updatedSales = salesService.updateSales(sales, id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedSales);
	}

	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
		List<SalesDto> list = salesService.v1getAll();
		return ResponseGenerator.generateResponse("Fetch Successful", list);
	}

	@PostMapping("/uploadFile")
	public ResponseEntity<Object> uploadFile(@RequestParam MultipartFile file) {
		SalesAttachment salesAttachment = null;
		try {
			salesAttachment = salesService.uploadFile(folderPath, file);
		} catch (IOException e) {
			System.out.println(e);
			throw new RuntimeException("Could not store file");
		}
		return ResponseGenerator.generateResponse("File uploaded successfully", salesAttachment);
	}

	@GetMapping("/getAllInVoiceNo")
	public ResponseEntity<Object> findAllInVoiceNo() {
		return ResponseGenerator.generateResponse("Fetch Successful", salesService.findAllInVoiceNo());
	}
	@GetMapping("/getSalesByInvoiceNo")
	public ResponseEntity<Object> findByInVoiceNo(@RequestParam Long invoiceNo) {
		return ResponseGenerator.generateResponse("Fetch Successful", salesService.findByInvoiceNo(invoiceNo));
	}
}
