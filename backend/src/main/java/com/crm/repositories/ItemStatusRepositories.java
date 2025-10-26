package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.ItemStatus;

public interface ItemStatusRepositories extends JpaRepository<ItemStatus, Long>{
	@Query("SELECT is FROM ItemStatus is " +
	           "WHERE (:keyword IS NULL OR LOWER(is.statusCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(is.statusName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<ItemStatus> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
