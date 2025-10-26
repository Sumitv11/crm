package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.StarRating;

public interface StarRatingRepositories extends JpaRepository<StarRating, Long> {
	 @Query("SELECT sr FROM StarRating sr " +
	           "WHERE (:keyword IS NULL OR LOWER(sr.typeCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(sr.starRating) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<StarRating> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
