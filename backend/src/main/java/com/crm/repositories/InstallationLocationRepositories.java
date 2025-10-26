package com.crm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.InstallationLocation;

public interface InstallationLocationRepositories extends JpaRepository<InstallationLocation, Long> {
	
	@Query("SELECT il FROM InstallationLocation il " +
	           "WHERE (:keyword IS NULL OR LOWER(il.installationLocationId) LIKE LOWER(CONCAT('%', :keyword, '%'))) "+
			"OR (:keyword IS NULL OR LOWER(il.locationDescription) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    Page<InstallationLocation> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
