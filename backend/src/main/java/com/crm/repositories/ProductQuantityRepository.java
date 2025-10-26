package com.crm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crm.entities.ProductQuantity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long>{

	List<ProductQuantity> findByDeliveryChallanId(Long deliveryChallanId);

	@Query("SELECT pq FROM ProductQuantity pq " +
			"WHERE pq.deliveryChallanId IN " +
			"(SELECT dc.id FROM DeliveryChallan dc WHERE dc.invoiceNo = :invoiceNo)")
	List<ProductQuantity> findProductQuantitiesByInvoice(@Param("invoiceNo") String invoiceNo);
}
