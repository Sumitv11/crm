package com.crm.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.crm.entities.*;
import com.crm.repositories.*;
import com.crm.util.Util;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.crm.dto.SalesDto;
import com.crm.exceptionHandler.ResourceNotFoundException;

@Service
public class SalesService {

	private final SalesRepository repository;
	private final ModelMapper modelMapper;
	private final SalesProductQuantityService productQuantityservice;
	private final DocTypeRepositories docTypeRepository;
	private final SalesAttachmentRepository salesAttachmentRepository;
	private final SalesProductQuantityRepository salesProductQuantityRepository;
	private final ProductQuantityRepository productQuantityRepository;

	public SalesService(SalesRepository repository, ModelMapper modelMapper,
                        SalesProductQuantityService productQuantityservice, DocTypeRepositories docTypeRepository, SalesAttachmentRepository salesAttachmentRepository, SalesProductQuantityRepository salesProductQuantityRepository, ProductQuantityRepository productQuantityRepository) {
		super();
		this.repository = repository;
		this.modelMapper = modelMapper;
		this.productQuantityservice = productQuantityservice;
		this.docTypeRepository = docTypeRepository;
		this.salesAttachmentRepository = salesAttachmentRepository;
        this.salesProductQuantityRepository = salesProductQuantityRepository;
        this.productQuantityRepository = productQuantityRepository;
    }


	public List<Sales> getAll(Pageable pageable) {
		return repository.findAll(pageable).getContent();
	}


	public List<SalesDto> v1getAll() {
		// Fetch all DeliveryChallans with associated ProductQuantities
		List<Sales> sales = repository.findAllWithSalesProductQuantities();

		// Map each DeliveryChallan to its DTO
		return sales.stream().map(this::convertToDto).collect(Collectors.toList());
	}



	public Sales create(SalesDto salesDto) {
		Sales entity = modelMapper.map(salesDto, Sales.class);

		Long nextInvoiceNo = repository.findMaxInvoiceNo();
		if(nextInvoiceNo==null) {
			entity.setInvoiceNo(1l);
		}else {
			entity.setInvoiceNo(nextInvoiceNo+1);
		}

		Sales savedSales= repository.save(entity);

		salesDto.getSalesAttachments().forEach(e -> {
			e.setSalesId(savedSales.getId());
			salesAttachmentRepository.save(e);
		});

		createSalesProductQuantity(salesDto.getSalesProductQuantities(),savedSales);
//		return createSalesProductQuantity(salesDto.getSalesProductQuantities(), savedSales);
		return calculateAmounts(salesDto.getSalesProductQuantities(), savedSales);

	}
	//for create
	private void createSalesProductQuantity(List<SalesProductQuantity> salesProductQuantities, Sales sales) {

		for (SalesProductQuantity salesProductQuantity : salesProductQuantities) {
			salesProductQuantity.setSalesId(sales.getId());
			productQuantityservice.create(salesProductQuantity);
		}
//		return repository.save(sales);
	}

	public double calculateGstAmount(double total,double gst) {
		return (total*gst)/100;
	}


	public Sales getById(long id) {
		Sales sales = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Sales not found with id " + id));
		return sales;
	}

	public Long getNextInvoiceNo() {
		Long nextInvoiceNo = repository.findMaxInvoiceNo();
		return (nextInvoiceNo == null) ? 1l : nextInvoiceNo+1;
	}

	public void deleteById(long id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Sales not found with id " + id);
		}
	}

	public Sales updateSales(SalesDto salesDto, long id) {
		Sales updatedSales = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Sales not present with id" + id));
		updatedSales.setBillingAddress(salesDto.getBillingAddress());
		updatedSales.setCompany(salesDto.getCompany());
		updatedSales.setContactNumber(salesDto.getContactNumber());
		updatedSales.setContactPerson(salesDto.getContactPerson());
		updatedSales.setCustomer(salesDto.getCustomer());
		updatedSales.setDeliveryAddress(salesDto.getDeliveryAddress());
		updatedSales.setEmail(salesDto.getEmail());
		updatedSales.setInvoiceNo(salesDto.getInVoiceNo());
		updatedSales.setJobType(salesDto.getJobType());
		updatedSales.setOrderPreparedBy(salesDto.getOrderPreparedBy());
		updatedSales.setOrderType(salesDto.getOrderType());
		updatedSales.setOrderVerifiedBy(salesDto.getOrderVerifiedBy());
		updatedSales.setPoNo(salesDto.getPoNo());
		updatedSales.setProductType(salesDto.getProductType());
		updatedSales.setProjectEngineer(salesDto.getProjectEngineer());
		updatedSales.setProjectType(salesDto.getProjectType());
		updatedSales.setPurchaseOrderDate(salesDto.getPurchaseOrderDate());
		updatedSales.setReference(salesDto.getReference());
		updatedSales.setSalesOrderDate(salesDto.getSalesOrderDate());
		updatedSales.setSalesPerson(salesDto.getSalesPerson());
		updatedSales.setTermsAndCondition(salesDto.getTermsAndCondition());
		updatedSales.setWarrantyPeriod(salesDto.getWarrantyPeriod());

		// Fetch existing attachments from DB and map by ID
		List<SalesAttachment> existingAttachments = salesAttachmentRepository.findBySalesId(id);

		// Convert existing attachments to a Map for quick lookup
		Map<Long, SalesAttachment> existingAttachmentsMap = existingAttachments.stream()
				.collect(Collectors.toMap(SalesAttachment::getId, Function.identity()));


		for (SalesAttachment attachment : salesDto.getSalesAttachments()) {
			if (attachment.getId() != null && existingAttachmentsMap.containsKey(attachment.getId())) {
				// Existing attachment,that present in db and dto,keep it
				//removing attachment that present in both dto and db
				existingAttachmentsMap.remove(attachment.getId());
			} else {
				//new attachments add
				attachment.setSalesId(id);
				salesAttachmentRepository.save(attachment);
			}
		}
		//Remaining attachments that present in db not in dto,remove them
		for (SalesAttachment attachmentToRemove : existingAttachmentsMap.values()) {
			salesAttachmentRepository.delete(attachmentToRemove);
		}

		return updateProductQuantities( repository.save(updatedSales),salesDto.getSalesProductQuantities(),id);
	}

private Sales updateProductQuantities (Sales sales, List<SalesProductQuantity> salesProductQuantities,Long id){
	// Get productQuantity list
		List<SalesProductQuantity> existingProductQuantities = salesProductQuantityRepository.findBySalesId(id);

	Map<Long, SalesProductQuantity> existingProductMap = existingProductQuantities.stream()
			.collect(Collectors.toMap(SalesProductQuantity::getId, Function.identity()));

	 List<SalesProductQuantity> productQuantitiesList=new ArrayList<>();

	for (SalesProductQuantity productQuantity : salesProductQuantities) {
		if (productQuantity.getId() != null && existingProductMap.containsKey(productQuantity.getId())) {
			salesProductQuantityRepository.save(productQuantity);
			productQuantitiesList.add(existingProductMap.remove(productQuantity.getId()));
		} else {
			productQuantity.setSalesId(sales.getId());
			productQuantitiesList.add(salesProductQuantityRepository.save(productQuantity));
		}
	}
	//Remaining attachments that present in db not in dto,remove them
	for (SalesProductQuantity productToRemove : existingProductMap.values()) {
		salesProductQuantityRepository.delete(productToRemove);
	}
	return calculateAmounts(productQuantitiesList,sales);
}
private Sales calculateAmounts(List<SalesProductQuantity> salesProductQuantities,Sales sales){
	double totalAmount=0;
	double totalGstAmount=0;
	double totalNetAmount=0;

	for (SalesProductQuantity salesProductQuantity : salesProductQuantities) {
		double productTotal=(salesProductQuantity.getMrp() * salesProductQuantity.getQuantity());
		totalAmount+=productTotal;
		totalGstAmount+=calculateGstAmount(productTotal,salesProductQuantity.getGst());
	}

	totalNetAmount=totalAmount+totalGstAmount;
	sales.setTotalAmount(totalAmount);
	sales.setTotalGstAmount(totalGstAmount);
	sales.setNetTotalAmount(totalNetAmount);
	return repository.save(sales);
}

	
	public SalesAttachment uploadFile(String path, MultipartFile file) throws IOException {
//	    String name = file.getOriginalFilename();
        String name = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	    System.out.println(name);
	    if (name == null || name.isBlank()) {
	        throw new IOException("Invalid file name.");
	    }
	    name = name.replace("\\", "/");
	    System.out.println(name);
	    String filePath = Paths.get(path, name).toString().replace("\\", "/");
	    System.out.println(filePath);
	    
	    File directory = new File(path);
	    if (!directory.exists()) {
	        if (!directory.mkdirs()) {
	            throw new IOException("Failed to create directory: " + path);
	        }
	    }

	    Files.copy(file.getInputStream(), Paths.get(filePath));

	    DocType docType = new DocType();
	    docType.setDocType(Util.getFileExtension(name));
	    docTypeRepository.save(docType);

	    SalesAttachment salesAttachment = new SalesAttachment();
	    salesAttachment.setFileName(name);
	    salesAttachment.setLocation(filePath);
	    salesAttachment.setDocType(docType);

	    return salesAttachmentRepository.save(salesAttachment);
	}
  
  public List<Long> findAllInVoiceNo(){
	  return repository.findAllInvoiceNumbers();
  }

  public SalesDto findByInvoiceNo(Long invoiceNo){
	  Sales sales = repository.findByInvoiceNo(invoiceNo);

	  List<ProductQuantity> deliveredQuantities =
			  productQuantityRepository.findProductQuantitiesByInvoice(String.valueOf(invoiceNo));

	  // Convert Sales entity to DTO
	  SalesDto salesDto = convertToDto(sales);

	  // Map to store productId -> total dispatched quantity
	  Map<Long, Long> dispatchedQuantityMap = new HashMap<>();

	  // Calculate total delivered quantity for each product
	  for (ProductQuantity pq : deliveredQuantities) {
		  Long productId = pq.getProduct().getId();
		  Long existingQuantity = dispatchedQuantityMap.getOrDefault(productId, 0L);
		  dispatchedQuantityMap.put(productId, existingQuantity + pq.getQuantity());
	  }

	  // Update dispatched quantity in SalesDto
	  for (SalesProductQuantity spq : salesDto.getSalesProductQuantities()) {
		  Long productId = spq.getProduct().getId();
		  spq.setDispatchedQuantity(dispatchedQuantityMap.getOrDefault(productId, 0L));
	  }

	  return salesDto;
  }
  private SalesDto modifySales(){
		return null;
  }

	private SalesDto convertToDto(Sales sales) {
		SalesDto dto = modelMapper.map(sales, SalesDto.class);

		// Fetch the ProductQuantities associated with this DeliveryChallan
		List<SalesProductQuantity> salesProductQuantities = productQuantityservice
				.findBySalesId(sales.getId());
		List<SalesAttachment> salesAttachments=salesAttachmentRepository.findBySalesId(sales.getId());
		dto.setSalesProductQuantities(salesProductQuantities);
		dto.setSalesAttachments(salesAttachments);

		return dto;
	}

}
