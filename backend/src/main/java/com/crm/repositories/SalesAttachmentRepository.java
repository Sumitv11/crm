package com.crm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.entities.SalesAttachment;
import com.crm.entities.SalesProductQuantity;

public interface SalesAttachmentRepository extends JpaRepository<SalesAttachment, Long> {
	
	List<SalesAttachment> findBySalesId(Long salesId);
}
