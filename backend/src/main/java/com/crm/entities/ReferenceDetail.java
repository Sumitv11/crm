package com.crm.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ReferenceDetail {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "reference_Detail", nullable = true, length = 150)
	private String referenceDetail;
	@ManyToOne
	@JoinColumn(name = "source_Reference", nullable = true)
	private SourceReference sourceReference;
	@Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	Boolean isActive;
	
}
