package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.InstallationLocation;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.InstallationLocationRepositories;

@Service
public class InstallationLocationServices {

	private final InstallationLocationRepositories installationLocationRepositories;

	public InstallationLocationServices(InstallationLocationRepositories installationLocationRepositories) {
		super();
		this.installationLocationRepositories = installationLocationRepositories;
	}
	
	
	public List<InstallationLocation> getAll(Pageable pageable) {
		return installationLocationRepositories.findAll(pageable).getContent();
	}
	
	public List<InstallationLocation> v1getAll() {
		return installationLocationRepositories.findAll();
	}

	public InstallationLocation create(InstallationLocation installationLocation) {
		return installationLocationRepositories.save(installationLocation);
	}

	public InstallationLocation getById(long id) {
		InstallationLocation installationLocation = installationLocationRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Installation Location not found with id " + id));
		return installationLocation;
	}

	public void deleteById(long id) {
		if (installationLocationRepositories.existsById(id)) {
			installationLocationRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("InstallationLocation not found with id " + id);
		}
	}

	public InstallationLocation updateInstallationLocation(InstallationLocation installationLocation, long id) {
		InstallationLocation updatedInstallationLocation = installationLocationRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("InstallationLocation not present with id" + id));
		updatedInstallationLocation.setInstallationLocationId(installationLocation.getInstallationLocationId());
		updatedInstallationLocation.setLocationDescription(installationLocation.getLocationDescription());
		updatedInstallationLocation.setIsActive(installationLocation.getIsActive());
		installationLocationRepositories.save(updatedInstallationLocation);
		return updatedInstallationLocation;
	}

	public List<InstallationLocation> searchInstallationLocation(String keyword, Pageable pageable) {
		return installationLocationRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
