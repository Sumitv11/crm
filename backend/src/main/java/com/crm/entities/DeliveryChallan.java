package com.crm.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
public class DeliveryChallan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "deliver_by")
    private String deliverBy;

    @Column(name = "customer_po_no")
    private String customerPoNo;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "job_id")
    private String jobId;

    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "installation_by")
    private String installationBy;

    @Column(name = "sales_person")
    private String salesPerson;

    @Column(name = "delivery_challan_no")
    private Long deliveryChallanNo;

    @Column(name = "date")
    private LocalDate localDateTime;
    
    @ManyToOne
    @JoinColumn(name = "store_incharge_id")
    private UserDetails storeInChargeId;

    @ManyToOne
    @JoinColumn(name = "transporter_id")
    private UserDetails transporterId;
    
    @ManyToOne
    @JoinColumn(name = "project_incharge_id")
    private UserDetails projectInChargeId;
    @ManyToOne
    @JoinColumn(name = "authorized_by_id")
    private UserDetails authorizeDetailsById;
}
