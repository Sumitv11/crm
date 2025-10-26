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
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "customer_type")
	private CustomerType customerType;
	@ManyToOne
	@JoinColumn(name = "customer_status")
	private CustomerStatus customerStatus;
	@ManyToOne
	@JoinColumn(name = "source_reference")
	SourceReference sourceReference;

	@ManyToOne
	@JoinColumn(name = "reference_detail")
	private ReferenceDetail referenceDetail;
	
	@Column(name = "reference_remark", length = 150)
	private String referenceRemark;
	@Column(name = "customer_name", length = 30)
	private String customerName;
	@Column(name = "gst_no", length = 20)
	private String gstNo;
	@Column(name = "pan_no",length = 20)
	private String panNo;
	@Column(name = "tan_no", length = 25)
	private String tanNo;

	@Column(name = "address1")
	private String address1;
	@Column(name = "address2")
	private String adress2;
	@Column(name = "address3")
	private String adress3;

	@Column(name = "contactPerson", length = 30)
	private String contactPerson;
	@ManyToOne
	@JoinColumn(name = "designation")
	Designation designation;
	@Column(name = "contactNumber", length = 10)
	private String contactNumber;
	@Column(name = "email", length = 20)
	private String email;
	@Column(name = "customer_weightage", nullable = false, length = 100)
	private String customerWeightage;
	@Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
	Boolean isActive;

}
