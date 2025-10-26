package com.crm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Entity
@Data
public class Material {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "material_used", nullable = false, length = 150)
	private String materialName;
	
	@ManyToOne()
    @JoinColumn(name = "materialquantity_uom_id", nullable = false)
	private UnitMeasurement materialQuantityUOM;

	@CreationTimestamp
	LocalDate createdAt;

	@UpdateTimestamp
	LocalDate updatedAt;



}
