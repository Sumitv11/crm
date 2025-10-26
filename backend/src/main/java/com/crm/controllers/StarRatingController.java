package com.crm.controllers;

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

import com.crm.entities.StarRating;
import com.crm.services.StarRatingService;
import com.crm.util.ResponseGenerator;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/star-rating")
public class StarRatingController {

	private final StarRatingService starRatingService;

	public StarRatingController(StarRatingService starRatingService) {
		super();
		this.starRatingService = starRatingService;
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(
	        @PageableDefault(page = 0, size = 10, sort = "gasTypeName", direction = Direction.ASC) Pageable pageable) {
	    var list = starRatingService.getAll(pageable);
	    return ResponseGenerator.generateResponse("Fetch Success", list);
	}
	
	@GetMapping("/v1/getAll")
	public ResponseEntity<Object> v1getAll() {
	    return ResponseGenerator.generateResponse("Fetch Success", starRatingService.v1getAll());
	}
	
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestBody StarRating starRating) {
		return ResponseGenerator.generateResponse("Created", HttpStatus.CREATED, 
				starRatingService.create(starRating));
	}

	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
		StarRating starRating = starRatingService.getById(id);
		return ResponseGenerator.generateResponse("Success", starRating);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
		starRatingService.deleteById(id);
		return ResponseGenerator.generateResponse("Deleted Succeesful", null);
	}

	@PutMapping("/update/{id}")
    public ResponseEntity<Object> updateAttributes(@RequestBody StarRating starRating,@PathVariable Long id ){
		StarRating updatedStarRating = starRatingService.updateRating(starRating,id);
		return ResponseGenerator.generateResponse("Updated Successful", updatedStarRating);
	}

	@GetMapping("/search")
    public ResponseEntity<Object> searchGasType(
            @RequestParam(required = false) String keyword,
            @PageableDefault(page = 0, size = 10, sort = "gasTypeName", direction = Direction.ASC) Pageable pageable) {
        var result = starRatingService.searchStarRating(keyword, pageable);
        return ResponseGenerator.generateResponse("Fetch Success", result);
    }

}
