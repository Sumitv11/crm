package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.TonCapacity;

public interface TonCapacityRepositories extends JpaRepository<TonCapacity, Long> {
	@Query("SELECT tc FROM TonCapacity tc " +
	           "WHERE (:keyword IS NULL OR LOWER(tc.tonCode) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "OR (:keyword IS NULL OR LOWER(tc.tonCapacityName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<TonCapacity> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
