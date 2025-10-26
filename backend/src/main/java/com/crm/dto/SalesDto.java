package com.crm.dto;

import java.time.LocalDate;
import java.util.List;

import com.crm.entities.Customer;
import com.crm.entities.OrderType;
import com.crm.entities.SalesAttachment;
import com.crm.entities.SalesProductQuantity;
import com.crm.entities.UserDetails;
import com.crm.enums.Company;
import com.crm.enums.JobType;
import com.crm.enums.ProductType;
import com.crm.enums.ProjectType;
import com.crm.enums.Reference;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SalesDto {

	Long id;

    @NotNull(message = "Sales Order Date is required")
	LocalDate salesOrderDate;
	ProductType productType;
	JobType jobType;
	@NotNull(message = "Customer is required")
	Customer customer;

	Long inVoiceNo;
	
    @NotNull(message = "Billing Address is required")
	String billingAddress;

    @NotNull(message = "Delivery Address is required")
	String deliveryAddress;
	String contactPerson;
	String contactNumber;
	@Email(message = "Email is required")
	String email;
	String poNo;

    @NotNull(message = "Purchase Order Date is required")
	LocalDate purchaseOrderDate;
	
	String warrantyPeriod;
	String termsAndCondition;

	UserDetails orderPreparedBy;

	UserDetails orderVerifiedBy;
	
	UserDetails salesPerson;

	Company company;
	Reference reference;
	
	UserDetails projectEngineer;

	ProjectType projectType;
	
	OrderType orderType;
	
	List<SalesAttachment> salesAttachments;
	

    List<SalesProductQuantity> salesProductQuantities;
	
}
