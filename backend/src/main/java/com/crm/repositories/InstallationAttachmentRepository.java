package com.crm.repositories;

import com.crm.entities.InstallationAttachment;
import com.crm.entities.ServiceAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstallationAttachmentRepository extends JpaRepository<InstallationAttachment,Long> {

    List<InstallationAttachment> findByInstallationId(Long installationId);
}
