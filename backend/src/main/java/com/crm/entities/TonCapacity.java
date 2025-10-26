package com.crm.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class TonCapacity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ton_code", nullable = false, length = 50)
    private String tonCode;

    @Column(name = "ton_capacity_name", nullable = false, length = 100)
    private String tonCapacityName;

    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isActive;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTonCode() {
		return tonCode;
	}

	public void setTonCode(String tonCode) {
		this.tonCode = tonCode;
	}

	public String getTonCapacityName() {
		return tonCapacityName;
	}

	public void setTonCapacityName(String tonCapacityName) {
		this.tonCapacityName = tonCapacityName;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
    
    
}
