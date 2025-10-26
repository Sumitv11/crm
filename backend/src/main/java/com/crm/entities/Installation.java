package com.crm.entities;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.crm.enums.InstallationStatus;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
@Entity
public class Installation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "date", nullable = false)
	private LocalDate installationDate;
	
	@Column(name = "installation_report_no")
	private Long installationReportNo;
	
	@Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	Boolean isAgainstPo;
	
	@Column(name = "po_id", nullable = false)
	private String poId;

	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false)
	private Customer customer;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JoinTable(
			name = "installation_location_mapping",
			joinColumns = @JoinColumn(name = "installation_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "installation_location_id", referencedColumnName = "id")
	)
	private List<InstallationLocation> installationLocations;

//
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//	@JoinColumn(name = "installation_product")
//	List<InstallationProduct> installtionProducts;

	@ManyToOne
	@JoinColumn(name = "installationdone_by")
	private UserDetails installationDoneBy;

	@ManyToOne
	@JoinColumn(name = "installationVerified_by")
	private UserDetails installationVerifiedBy;

	@Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	private Boolean isExtraActivitiesCarriedOut;

	@Enumerated(EnumType.STRING)
	@Column(name = "installation_status")
	InstallationStatus installationStatus;

	@Column(name = "installation_remark")
	private String installationRemark;


//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//	@JoinColumn(name = "installation_id")
//	List<InstallationAttachment> installationAttachments;

}
