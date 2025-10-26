package com.crm.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Entity
@Data
public class SalesProductQuantity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
	Product product;
	int quantity;
	
	
	@Min(0)
	private Double mrp;
	@Min(0)
	private Double gst;
	
	Long salesId;
	@Transient
	Long dispatchedQuantity;
	
}
