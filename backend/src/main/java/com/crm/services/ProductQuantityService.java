package com.crm.services;

import java.util.List;

import com.crm.entities.Product;
import com.crm.exceptionHandler.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.crm.entities.ProductQuantity;
import com.crm.repositories.ProductQuantityRepository;

@Service
public class ProductQuantityService {

	private final ProductQuantityRepository repo;
	
	private final ProductService productService;
	
	public ProductQuantityService(ProductQuantityRepository repo, ProductService productService) {
		// TODO Auto-generated constructor stub
		super();
		this.repo = repo;
		this.productService = productService;
	}
	
	public ProductQuantity create(ProductQuantity productQuantity) {
		return repo.save(productQuantity);
	}
	
	public List<ProductQuantity> findByDeliveryChallanId(Long deliveryChallanId) {
	    return repo.findByDeliveryChallanId(deliveryChallanId);
	}

	public ProductQuantity updateProductQuantity(Long id,ProductQuantity productQuantity){
		ProductQuantity pq=repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("ProductQuantity not found with id " + id));
		return repo.save(productQuantity);
	}
	public void deleteById(Long id){
		if(repo.existsById(id)) repo.deleteById(id);
		else throw new RuntimeException("Product Quantity not present with id="+id);
	}

}
