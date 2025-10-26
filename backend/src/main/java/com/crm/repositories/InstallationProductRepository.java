package com.crm.repositories;

import com.crm.entities.InstallationProduct;
import com.crm.entities.MaterialQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstallationProductRepository extends JpaRepository<InstallationProduct,Long> {

    List<InstallationProduct> findByInstallationId(Long installationId);
}
