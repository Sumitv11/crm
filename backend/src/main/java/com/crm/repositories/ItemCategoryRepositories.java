package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.ItemCategory;

public interface ItemCategoryRepositories extends JpaRepository<ItemCategory, Long> {

	 @Query("SELECT ic FROM ItemCategory ic " +
	           "WHERE (:keyword IS NULL OR LOWER(ic.code) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(ic.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<ItemCategory> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
