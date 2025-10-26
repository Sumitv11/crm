package com.crm.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class InstallationProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;

    Integer quantity;

    Long installationId;
}
