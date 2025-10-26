package com.crm.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class InstallationAttachment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "file_name", nullable = false, length = 150)
	private String fileName;
	@Column(name = "location", nullable = false, length = 150)
	private String location;
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "doc_type_id", nullable = false)
	private DocType docType;
	Long installationId;
}
