package com.crm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.entities.Installation;
import org.springframework.data.jpa.repository.Query;

public interface InstallationReposotory extends JpaRepository<Installation, Long> {

    @Query("Select MAX(il.installationReportNo) FROM Installation il")
    Long findMaxInstallationReportNo();

}
