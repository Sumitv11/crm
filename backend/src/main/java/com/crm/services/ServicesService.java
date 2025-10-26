package com.crm.services;

import com.crm.dto.ServiceDto;
import com.crm.entities.*;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.*;
import com.crm.util.Util;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ServicesService {

	private final ServicesRepository servicesRepository;
	private final DocTypeRepositories docTypeRepository;
	private final ServiceAttachmentRepository serviceAttachmentRepository;
	private final MaterialQuantityRepository materialQuantityRepository;
	private final NatureOfServiceRepository natureOfServiceRepository;
	private final NatureOfComplaintRepository natureOfComplaintRepository;


	private final ModelMapper modelMapper;



	public ServicesService(ServicesRepository servicesRepository, DocTypeRepositories docTypeRepository, ServiceAttachmentRepository serviceAttachmentRepository, MaterialQuantityRepository materialQuantityRepository, NatureOfServiceRepository natureOfServiceRepository, NatureOfComplaintRepository natureOfComplaintRepository, ModelMapper modelMapper) {
		super();
		this.servicesRepository = servicesRepository;
        this.docTypeRepository = docTypeRepository;
        this.serviceAttachmentRepository = serviceAttachmentRepository;
        this.materialQuantityRepository = materialQuantityRepository;
        this.natureOfServiceRepository = natureOfServiceRepository;
        this.natureOfComplaintRepository = natureOfComplaintRepository;
        this.modelMapper = modelMapper;
    }

	  public Services create(ServiceDto serviceDto) {
		  Services entity = modelMapper.map(serviceDto, Services.class);

		  Long nextServiceNo = servicesRepository.findMaxServiceNo();
		  if (nextServiceNo == null) entity.setServiceNo(1L);
		  else entity.setServiceNo(nextServiceNo + 1);

		  Services savedService = servicesRepository.save(entity);

		  serviceDto.getAttachments().forEach(attachment -> {
			  attachment.setServiceId(savedService.getService_id());
			  serviceAttachmentRepository.save(attachment);
		  });

		  createMaterialQuantity(savedService,serviceDto.getMaterialQuantity());


		  return savedService;
	  }

	  private void createMaterialQuantity(Services service,List<MaterialQuantity> materialQuantities){
		System.out.println("In create material"+materialQuantities);
		for(MaterialQuantity materialQuantity:materialQuantities){
			materialQuantity.setServiceId(service.getService_id());
			materialQuantityRepository.save(materialQuantity);
		}
	  }

	public List<Services> getAll(Pageable pageable) {
		return servicesRepository.findAll(pageable).getContent();
	}

	public List<Services> getAll() {
		return servicesRepository.findAll();
	}

	private ServiceDto convertToDto(Services services){
		ServiceDto serviceDto=modelMapper.map(services,ServiceDto.class);
		List<MaterialQuantity> materialQuantities=materialQuantityRepository.findByServiceId(services.getService_id());
		List<ServiceAttachment> serviceAttachments=serviceAttachmentRepository.findByServiceId(services.getService_id());
		serviceDto.setMaterialQuantity(materialQuantities);
		serviceDto.setAttachments(serviceAttachments);
		return serviceDto;
	}

	public ServiceDto getById(long id) {
		Services services = servicesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id " + id));
        return convertToDto(services);
	}

	public void deleteById(long id) {
		if (servicesRepository.existsById(id)) {
			List<MaterialQuantity> list=materialQuantityRepository.findByServiceId(id);
			for(MaterialQuantity materialQuantity : list){
				materialQuantityRepository.deleteById(materialQuantity.getId());
			}
			servicesRepository.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Service not found with id " + id);
		}
	}

	public Services updateService(ServiceDto service, long id) {
		Services updatedService = servicesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not present with id " + id));
		updatedService.setActionTaken(service.getActionTaken());
		updatedService.setClient(service.getClient());
		updatedService.setContactPerson(service.getContactPerson());
		updatedService.setIsApproved(service.getIsApproved());
		updatedService.setProblem(service.getProblem());
		updatedService.setServiceDate(service.getServiceDate());
		updatedService.setServiceManager(service.getServiceManager());
		updatedService.setServiceNo(service.getServiceNo());
		updatedService.setServiceProvidedBy(service.getServiceProvidedBy());
		updatedService.setSupportedBy(service.getSupportedBy());

		NatureOfComplaint complaint=natureOfComplaintRepository.save(service.getNatureOfComplaint());
		NatureOfService natureOfService=natureOfServiceRepository.save(service.getNatureOfService());
		updatedService.setNatureOfComplaint(complaint);
		updatedService.setNatureOfService(natureOfService);

		updateServiceAttachments(service.getAttachments(),id);
		updateProductQuantity(service.getMaterialQuantity(),id);

		servicesRepository.save(updatedService);

		return updatedService;
	}

	public void updateServiceAttachments(List<ServiceAttachment> serviceAttachments,Long id){
		List<ServiceAttachment> serviceAttachmentList=serviceAttachmentRepository.findByServiceId(id);

		Map<Long,ServiceAttachment> mappedServiceAttachment =serviceAttachmentList.stream().
				collect(Collectors.toMap(ServiceAttachment::getId,Function.identity()));

		for (ServiceAttachment attachment : serviceAttachments) {
			if (attachment.getId() != null && mappedServiceAttachment.containsKey(attachment.getId())) {
				// Existing attachment,that present in db and dto,keep it
				//removing attachment that present in both dto and db
				mappedServiceAttachment.remove(attachment.getId());
			} else {
				//new attachments add
				attachment.setServiceId(id);
				serviceAttachmentRepository.save(attachment);
			}
		}
		//Remaining attachments that present in db not in dto,remove them
		for (ServiceAttachment attachmentToRemove : mappedServiceAttachment.values()) {
			serviceAttachmentRepository.delete(attachmentToRemove);
		}
	}

	public void updateProductQuantity(List<MaterialQuantity> materialQuantities,Long id){
		List<MaterialQuantity> existingMaterialQuantityList=materialQuantityRepository.findByServiceId(id);

		Map<Long,MaterialQuantity> mappedMaterialQuantity=existingMaterialQuantityList.stream().
				collect(Collectors.toMap(MaterialQuantity::getId, Function.identity()));

		List<MaterialQuantity> materialList=new ArrayList<>();
		for (MaterialQuantity materialQuantity : materialQuantities) {
			if (materialQuantity.getId() != null && mappedMaterialQuantity.containsKey(materialQuantity.getId())) {
				materialQuantityRepository.save(materialQuantity);
				materialList.add(mappedMaterialQuantity.remove(materialQuantity.getId()));
			} else {
				materialQuantity.setServiceId(id);
				materialList.add(materialQuantityRepository.save(materialQuantity));
			}
		}
		//Remaining attachments that present in db not in dto,remove them
		for (MaterialQuantity materialToRemove : mappedMaterialQuantity.values()) {
			materialQuantityRepository.delete(materialToRemove);
		}
//		 serviceDto.setMaterialQuantity(materialList);
//		return serviceDto;
	}

	public List<Services> searchService(String keyword, Pageable pageable) {
		return servicesRepository.searchServices(keyword, pageable).getContent();
	}

	public Long getNextServiceNo() {
		Long serviceNo=servicesRepository.findMaxServiceNo();
		return serviceNo == null ? 1L :serviceNo+1;
	}



	public ServiceAttachment uploadFile(String path, MultipartFile file) throws IOException {
//	    String name = file.getOriginalFilename();
		String name = System.currentTimeMillis() + "_" + file.getOriginalFilename();
		if (name == null || name.isBlank()) {
			throw new IOException("Invalid file name.");
		}
		name = name.replace("\\", "/");
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

		ServiceAttachment serviceAttachment = new ServiceAttachment();
		serviceAttachment.setFileName(name);
		serviceAttachment.setLocation(filePath);
		serviceAttachment.setDocType(docType);

		return serviceAttachmentRepository.save(serviceAttachment);
	}

}
