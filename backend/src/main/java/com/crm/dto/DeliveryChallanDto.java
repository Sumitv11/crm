package com.crm.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.crm.entities.ProductQuantity;
import com.crm.entities.UserDetails;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeliveryChallanDto {

    private Long id;
    @NotNull(message = "DeliveryBy Name  is required")
    private String deliverBy;

    @NotNull(message = "Po no is required")
    private String customerPoNo;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Address is required")
    private String address;

    @NotNull(message = "JobId is required")
    private String jobId;

    @NotNull(message = "Invoice No is required")
    private String invoiceNo;

    @NotNull(message = "Name is required")
    private String installationBy;

    @NotNull(message = "Sales Person is required")
    private String salesPerson;

    @NotNull(message = "Challan No  is required")
    private Long deliveryChallanNo;

    private LocalDate localDateTime;
    
    private UserDetails storeInChargeId;

    private UserDetails transporterId;
    
    private UserDetails projectInChargeId;
    
    private UserDetails authorizeDetailsById;
    
    private List<ProductQuantity> productQuantities;
}
