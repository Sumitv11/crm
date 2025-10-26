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
public class CustomerList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "customer_type_id", nullable = false)
	private CustomerType customerType;
	@ManyToOne
	@JoinColumn(name = "customer_status_id", nullable = false)
	private CustomerStatus customerStatus;
	@ManyToOne
	@JoinColumn(name = "source_reference_id", nullable = false)
	SourceReference sourceReference;

	@Column(name = "reference_detail", nullable = false, length = 150)
	private String referenceDetail;
	@Column(name = "reference_remark", nullable = false, length = 150)
	private String referenceRemark;
	@Column(name = "customer_name", nullable = false, length = 20)
	private String customerName;
	@Column(name = "gst_no", nullable = false, length = 20)
	private String gstNo;
	@Column(name = "pan_no", nullable = false, length = 10)
	private String panNo;
	@Column(name = "tan_no", nullable = false, length = 15)
	private String tanNo;

	@Column(name = "adress1", nullable = false, length = 50)
	private String adress1;
	@Column(name = "adress2", nullable = false, length = 50)
	private String adress2;
	@Column(name = "adress3", nullable = false, length = 50)
	private String adress3;

	@Column(name = "conatctPerson", nullable = false, length = 20)
	private String conatctPerson;
	@ManyToOne
	@JoinColumn(name = "designation_id", nullable = false)
	Designation designation;
	@Column(name = "conatctNumber", nullable = false, length = 10)
	private String conatctNumber;
	@Column(name = "email", nullable = false, length = 20)
	private String email;
	@Column(name = "customer_weightage", nullable = false, length = 100)
	private String customerWeightage;
	@Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	Boolean isActive;

}
