package com.crm.dto;

import com.crm.entities.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class ServiceDto {

    private Long service_id;

    @NotNull(message = "Service number cannot be null")
    private Long serviceNo;

    @NotBlank(message = "Contact person is required")
    @Size(max = 150, message = "Contact person name cannot exceed 150 characters")
    private String contactPerson;

    @NotNull(message = "Service date cannot be null")
    private LocalDate serviceDate;

    @NotNull(message = "Client ID cannot be null")
    private Customer client;

    @NotNull(message = "Installation location ID cannot be null")
    private InstallationLocation installationLocation;

    @NotNull(message = "Product ID cannot be null")
    private Product product;

    @NotBlank(message = "Problem description is required")
    @Size(max = 250, message = "Problem description cannot exceed 150 characters")
    private String problem;

    @NotBlank(message = "Action taken is required")
    @Size(max = 250, message = "Action taken cannot exceed 150 characters")
    private String actionTaken;

    @NotNull(message = "Service provider cannot be null")
    private UserDetails serviceProvidedBy;

    @NotNull(message = "Supported by cannot be null")
    private UserDetails supportedBy;

    @NotNull(message = "Service manager cannot be null")
    private UserDetails serviceManager;

    private List<MaterialQuantity> materialQuantity;

    @NotNull(message = "Approval status cannot be null")
    private Boolean isApproved;

    @NotNull(message = "Nature of service cannot be null")
    private NatureOfService natureOfService;

    @NotNull(message = "Nature of complaint cannot be null")
    private NatureOfComplaint natureOfComplaint;

    private List<ServiceAttachment> attachments;
}
