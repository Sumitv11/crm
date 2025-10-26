package com.crm.repositories;

import com.crm.entities.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.crm.enums.ProductType;


public interface ProductRepositories extends JpaRepository<Product,Long> {
    @Query("SELECT p FROM Product p " +
            "WHERE (:keyword IS NULL OR " +
            "LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.productCode) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.modelNo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.sizes) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brandName.brandName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.itemCategory.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%'))) ")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
     List<Product> findByProductType(ProductType productType);

}
