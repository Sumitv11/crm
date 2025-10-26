package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.StarRating;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.StarRatingRepositories;

@Service
public class StarRatingService {

	private final StarRatingRepositories starRatingRepositories;

	public StarRatingService(StarRatingRepositories starRatingRepositories) {
		super();
		this.starRatingRepositories = starRatingRepositories;
	}
	public List<StarRating> getAll(Pageable pageable) {
		return starRatingRepositories.findAll(pageable).getContent();
	}
	
	public List<StarRating> v1getAll() {
		return starRatingRepositories.findAll();
	}

	public StarRating create(StarRating starRating) {
		return starRatingRepositories.save(starRating);
	}

	public StarRating getById(long id) {
		StarRating starRating = starRatingRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("StarRating not found with id " + id));
		return starRating;
	}

	public void deleteById(long id) {
		if (starRatingRepositories.existsById(id)) {
			starRatingRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("StarRating not found with id " + id);
		}
	}

	public StarRating updateRating(StarRating starRating, long id) {
		StarRating updateStarRating = starRatingRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCategory not present with id" + id));

		updateStarRating.setStarRating(starRating.getStarRating());
		updateStarRating.setIsActive(starRating.getIsActive());
		updateStarRating.setTypeCode(starRating.getTypeCode());
		starRatingRepositories.save(updateStarRating);
		return updateStarRating;
		
	}

	public List<StarRating> searchStarRating(String keyword, Pageable pageable) {
		return starRatingRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
