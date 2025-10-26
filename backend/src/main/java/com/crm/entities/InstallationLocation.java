package com.crm.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class InstallationLocation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "installation_location_id", nullable = false, length = 150)
	private String installationLocationId;
	@Column(name = "location_description", nullable = false, length = 150)
	private String locationDescription;
	@Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	Boolean isActive;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getInstallationLocationId() {
		return installationLocationId;
	}
	public void setInstallationLocationId(String installationLocationId) {
		this.installationLocationId = installationLocationId;
	}
	public String getLocationDescription() {
		return locationDescription;
	}
	public void setLocationDescription(String locationDescription) {
		this.locationDescription = locationDescription;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
	
}
