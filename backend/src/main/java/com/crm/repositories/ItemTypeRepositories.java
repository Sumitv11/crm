package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.ItemType;

public interface ItemTypeRepositories extends JpaRepository<ItemType, Long> {
	@Query("SELECT it FROM ItemType it " +
	           "WHERE (:keyword IS NULL OR LOWER(it.typeCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(it.typeName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<ItemType> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
