package com.crm.repositories;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crm.entities.DeliveryChallan;

public interface DeliveryChallanRepositories extends JpaRepository<DeliveryChallan, Long> {

	 @Query("SELECT MAX(dc.deliveryChallanNo) FROM DeliveryChallan dc")
	    Long findMaxDeliveryChallanNo();
	 
	 @Query("SELECT dc FROM DeliveryChallan dc " +
	           "WHERE LOWER(dc.deliverBy) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "   OR LOWER(dc.customerPoNo) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
//	           "   OR LOWER(dc.nameAndAddress) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "   OR LOWER(dc.jobId) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "   OR LOWER(dc.invoiceNo) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "   OR LOWER(dc.salesPerson) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "   OR CAST(dc.deliveryChallanNo AS string) LIKE CONCAT('%', :keyword, '%')")
	    Page<DeliveryChallan> searchByKeyword(@Param("keyword") String keyword,Pageable pageable);
	 
//	  @Query("SELECT dc FROM DeliveryChallan dc LEFT JOIN FETCH dc.productQuantities")
//	    List<DeliveryChallan> findAllWithProductQuantities();
	 @Query("SELECT dc FROM DeliveryChallan dc LEFT JOIN FETCH ProductQuantity pq ON pq.deliveryChallanId = dc.id")
	 List<DeliveryChallan> findAllWithProductQuantities();
}
