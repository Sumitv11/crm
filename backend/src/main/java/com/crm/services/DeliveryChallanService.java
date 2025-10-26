package com.crm.services;

import java.util.List;
import java.util.stream.Collectors;

import com.crm.entities.Sales;
import com.crm.entities.SalesProductQuantity;
import com.crm.repositories.SalesProductQuantityRepository;
import com.crm.repositories.SalesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.dto.DeliveryChallanDto;
import com.crm.entities.DeliveryChallan;
import com.crm.entities.ProductQuantity;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.DeliveryChallanRepositories;

@Service
public class DeliveryChallanService {

	private final ModelMapper modelMapper;

	private final DeliveryChallanRepositories deliveryChallanRepositories;

	private final ProductQuantityService productQuantityService;
	private final SalesRepository salesRepository;
	private final SalesProductQuantityRepository salesProductQuantityRepository;

	public DeliveryChallanService(DeliveryChallanRepositories deliveryChallanRepositories, ModelMapper modelMapper,
                                  ProductQuantityService productQuantityService, SalesRepository salesRepository, SalesProductQuantityRepository salesProductQuantityRepository) {
		super();
		this.deliveryChallanRepositories = deliveryChallanRepositories;
		this.modelMapper = modelMapper;
		this.productQuantityService = productQuantityService;
        this.salesRepository = salesRepository;
        this.salesProductQuantityRepository = salesProductQuantityRepository;
    }

	public List<DeliveryChallan> getAll(Pageable pageable) {
		return deliveryChallanRepositories.findAll(pageable).getContent();
	}

//	public List<DeliveryChallan> v1getAll() {
//		return deliveryChallanRepositories.findAll();
//	}

	public List<DeliveryChallanDto> v1getAll() {
		// Fetch all DeliveryChallans with associated ProductQuantities
		List<DeliveryChallan> deliveryChallans = deliveryChallanRepositories.findAllWithProductQuantities();

		// Map each DeliveryChallan to its DTO
		return deliveryChallans.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	private DeliveryChallanDto convertToDto(DeliveryChallan deliveryChallan) {
		DeliveryChallanDto dto = modelMapper.map(deliveryChallan, DeliveryChallanDto.class);

		// Fetch the ProductQuantities associated with this DeliveryChallan
		List<ProductQuantity> productQuantities = productQuantityService
				.findByDeliveryChallanId(deliveryChallan.getId());
		dto.setProductQuantities(productQuantities);

		return dto;
	}

	public DeliveryChallan create(DeliveryChallanDto deliveryChallan) {
		DeliveryChallan entity = modelMapper.map(deliveryChallan, DeliveryChallan.class);
		Long nextDeliveryChallanNo = deliveryChallanRepositories.findMaxDeliveryChallanNo();

		if (deliveryChallanRepositories.findMaxDeliveryChallanNo() == null) {
			deliveryChallan.setDeliveryChallanNo(1l);
		} else
			deliveryChallan.setDeliveryChallanNo(nextDeliveryChallanNo+1);

		entity = deliveryChallanRepositories.save(entity);

		Sales sales=salesRepository.findByInvoiceNo(Long.parseLong(deliveryChallan.getInvoiceNo()));
//		List<SalesProductQuantity> salesProductQuantityList=salesProductQuantityRepository.findBySalesId(sales.getId());

		for (ProductQuantity productQuantity : deliveryChallan.getProductQuantities()) {
			productQuantity.setDeliveryChallanId(entity.getId());
			productQuantityService.create(productQuantity);
		}
		return entity;
	}

	public DeliveryChallan getById(long id) {
		DeliveryChallan deliveryChallan = deliveryChallanRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DeliveryChallan not found with id " + id));
		return deliveryChallan;
	}

	public void deleteById(long id) {
		if (deliveryChallanRepositories.existsById(id)) {
			List <ProductQuantity>pq=productQuantityService.findByDeliveryChallanId(id);
			for(ProductQuantity productQuantity:pq){
				productQuantityService.deleteById(productQuantity.getId());
			}
			deliveryChallanRepositories.deleteById(id);

		} else {
			throw new ResourceNotFoundException("DeliveryChallan not found with id " + id);
		}
	}

	public DeliveryChallan updateDeliveryChallan(DeliveryChallanDto deliveryChallan, long id) {
		DeliveryChallan updatedDeliveryChallan = deliveryChallanRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DeliveryChallan not present with id" + id));
		updatedDeliveryChallan.setAuthorizeDetailsById(deliveryChallan.getAuthorizeDetailsById());
		updatedDeliveryChallan.setCustomerPoNo(deliveryChallan.getCustomerPoNo());
		updatedDeliveryChallan.setDeliverBy(deliveryChallan.getDeliverBy());
		updatedDeliveryChallan.setDeliveryChallanNo(deliveryChallan.getDeliveryChallanNo());
		updatedDeliveryChallan.setInstallationBy(deliveryChallan.getInstallationBy());
		updatedDeliveryChallan.setInvoiceNo(deliveryChallan.getInvoiceNo());
		updatedDeliveryChallan.setJobId(deliveryChallan.getJobId());
		updatedDeliveryChallan.setLocalDateTime(deliveryChallan.getLocalDateTime());
		updatedDeliveryChallan.setName(deliveryChallan.getName());
		updatedDeliveryChallan.setAddress(deliveryChallan.getAddress());
//		updatedDeliveryChallan.setNameAndAddress(deliveryChallan.getNameAndAddress());
//	    	updatedDeliveryChallan.setProductQuantities(deliveryChallan.getProductQuantities());
		updatedDeliveryChallan.setProjectInChargeId(deliveryChallan.getProjectInChargeId());
		updatedDeliveryChallan.setSalesPerson(deliveryChallan.getSalesPerson());
		updatedDeliveryChallan.setStoreInChargeId(deliveryChallan.getStoreInChargeId());
		updatedDeliveryChallan.setTransporterId(deliveryChallan.getTransporterId());
		for(ProductQuantity productQuantity:deliveryChallan.getProductQuantities()){
			productQuantityService.create(productQuantity);
		}
		deliveryChallanRepositories.save(updatedDeliveryChallan);
		return updatedDeliveryChallan;
	}

	public List<DeliveryChallan> searchDeliveryChallan(String keyword, Pageable pageable) {
		return deliveryChallanRepositories.searchByKeyword(keyword, pageable).getContent();
	}

	public Long getNextChallanNo() {
		Long nextChallanNo = deliveryChallanRepositories.findMaxDeliveryChallanNo();
		return (nextChallanNo == null) ? 1l : nextChallanNo+1;
	}

}
