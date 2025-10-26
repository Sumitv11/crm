package com.crm.entities;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long service_id;

    @Column(name = "service_number")
    private Long serviceNo;

    @Column(name = "contact_person", nullable = false, length = 150)
    private String contactPerson;

    @Column(name = "service_date")
    private LocalDate serviceDate;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id", nullable = false)
    private Customer client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "installation_location_id", nullable = false)
    private InstallationLocation installationLocation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "problem", nullable = false, length = 150)
    private String problem;

    @Column(name = "action_taken", nullable = false, length = 150)
    private String actionTaken;

    @ManyToOne()
    @JoinColumn(name = "service_provided_by", nullable = false)
    private UserDetails serviceProvidedBy;

    @ManyToOne()
    @JoinColumn(name = "supported_by", nullable = false)
    private UserDetails supportedBy;

    @ManyToOne()
    @JoinColumn(name = "service_manager", nullable = false)
    private UserDetails serviceManager;

    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isApproved;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "nature_of_service_id")
    private NatureOfService natureOfService;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "nature_of_complaint_id")
    private NatureOfComplaint natureOfComplaint;

}
