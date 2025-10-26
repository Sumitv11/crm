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
public class SourceReference {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "code", nullable = false, length = 50)
	private String code;
	@Column(name = "source_Reference", nullable = false, length = 150)
	private String sourceReference;
	@Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	Boolean isActive;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getSourceReference() {
		return sourceReference;
	}
	public void setSourceReference(String sourceReference) {
		this.sourceReference = sourceReference;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
	
	
}
