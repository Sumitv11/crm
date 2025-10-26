package com.crm.repositories;

import com.crm.entities.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MaterialRepository extends JpaRepository<Material,Long> {

    @Query("SELECT m FROM Material m " +
            "WHERE (:keyword IS NULL OR " +
            "LOWER(m.materialName) LIKE LOWER(CONCAT('%', :keyword, '%'))) ")
    Page<Material> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
