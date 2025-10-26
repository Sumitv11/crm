package com.crm.repositories;

import com.crm.entities.BrandName;
import com.crm.entities.Designation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BrandNameRepositories extends JpaRepository<BrandName,Long> {

    @Query("SELECT bn FROM BrandName bn " +
            "WHERE (:keyword IS NULL OR LOWER(bn.brandName) LIKE LOWER(CONCAT('%', :keyword, '%'))) ")
    Page<BrandName> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
