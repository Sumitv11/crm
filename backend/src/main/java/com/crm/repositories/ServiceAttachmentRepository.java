package com.crm.repositories;

import com.crm.entities.ServiceAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceAttachmentRepository extends JpaRepository<ServiceAttachment,Long> {

    List<ServiceAttachment> findByServiceId(Long serviceId);
}
