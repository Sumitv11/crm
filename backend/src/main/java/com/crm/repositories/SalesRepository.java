package com.crm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.crm.entities.Sales;

public interface SalesRepository extends JpaRepository<Sales, Long> {

	 @Query("SELECT MAX(s.invoiceNo) FROM Sales s")
	    Long findMaxInvoiceNo();
	 
	 @Query("SELECT sl FROM Sales sl LEFT JOIN FETCH SalesProductQuantity spq ON spq.salesId = sl.id")
	 List<Sales> findAllWithSalesProductQuantities();
	 
	 @Query("SELECT s.invoiceNo FROM Sales s")
	 List<Long> findAllInvoiceNumbers();
	 
	 Sales findByInvoiceNo(Long invoiceNo);
}
