package com.crm.entities;

import java.time.LocalDate;

import com.crm.enums.Company;
import com.crm.enums.JobType;
import com.crm.enums.ProductType;
import com.crm.enums.ProjectType;
import com.crm.enums.Reference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Sales {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long invoiceNo;
	@Column(name = "salesOrderDate")
	private LocalDate salesOrderDate;
	@Enumerated(EnumType.STRING)
	private ProductType productType;
	@Enumerated(EnumType.STRING)
	private JobType jobType;
	@ManyToOne
	@JoinColumn(name = "customer")
	private Customer customer;
	
	private String billingAddress;
	private String deliveryAddress;
	private String contactPerson;
	private String contactNumber;
	private String email;
	private String poNo;
	
	@Column(name = "purchaseOrderDate")
	private LocalDate purchaseOrderDate;
	
	private String warrantyPeriod;
	private String termsAndCondition;

	@ManyToOne
	@JoinColumn()
	private UserDetails orderPreparedBy;

	@ManyToOne
	@JoinColumn()
	private UserDetails orderVerifiedBy;
	
	@ManyToOne
	@JoinColumn()
	private UserDetails salesPerson;

	@Enumerated(EnumType.STRING)
	private Company company;

	@Enumerated(EnumType.STRING)
	private Reference reference;
	
	@ManyToOne
	@JoinColumn()
	private UserDetails projectEngineer;

	@Enumerated(EnumType.STRING)
	private ProjectType projectType;
	
//	@ManyToOne
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//	@JoinColumn(name = "sales_id")
//	private List<SalesAttachment> salesAttachments;
	
	private Double totalAmount;
	private Double totalGstAmount;
	private Double netTotalAmount;
	
	@ManyToOne
	@JoinColumn()
	private OrderType orderType;
	
	
	
}
