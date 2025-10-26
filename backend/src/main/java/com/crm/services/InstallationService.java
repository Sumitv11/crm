package com.crm.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.crm.dto.InstallationDto;
import com.crm.entities.*;
import com.crm.repositories.*;
import com.crm.util.Util;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.exceptionHandler.ResourceNotFoundException;
import org.springframework.web.multipart.MultipartFile;

@Service
public class InstallationService {

	private final InstallationReposotory installationReposotory;
	private final DocTypeRepositories docTypeRepository;
	private final InstallationAttachmentRepository installationAttachmentRepository;
	private final InstallationProductRepository installationProductRepository;
	private final InstallationLocationRepositories installationLocationRepository;
	private final ModelMapper mapper;

	public InstallationService(InstallationReposotory installationReposotory, DocTypeRepositories docTypeRepository, InstallationAttachmentRepository installationAttachmentRepository, InstallationProductRepository installationProductRepository, InstallationLocationRepositories installationLocationRepository, ModelMapper mapper) {
		super();
		this.installationReposotory = installationReposotory;
		this.docTypeRepository = docTypeRepository;
		this.installationAttachmentRepository = installationAttachmentRepository;
		this.installationProductRepository = installationProductRepository;
		this.installationLocationRepository = installationLocationRepository;
		this.mapper = mapper;
	}

	public List<Installation> getAll(Pageable pageable) {
		return installationReposotory.findAll(pageable).getContent();
	}

	public List<Installation> v1getAll() {
		return installationReposotory.findAll();
	}

	public Installation create(InstallationDto installation) {
		Installation entity = mapper.map(installation , Installation.class);
		Long installationNo=installationReposotory.findMaxInstallationReportNo();
		if(installationNo == null) entity.setInstallationReportNo(1L);
		else entity.setInstallationReportNo(installationNo+1);

//		List<InstallationLocation> managedLocations = new ArrayList<>();
//		for (InstallationLocation location : installation.getInstallationLocations()) {
//			InstallationLocation existingLocation = installationLocationRepository.findById(location.getId())
//					.orElseThrow(() -> new EntityNotFoundException("InstallationLocation not found with ID: " + location.getId()));
//			managedLocations.add(existingLocation);
//		}
		entity.setInstallationLocations(getLocations(installation.getInstallationLocations()));


		Installation savedInstallation = installationReposotory.save(entity);


		createInstallationProduct(installation.getInstallationProduct(), savedInstallation.getId());
		installation.getAttachments().forEach(e->{
			e.setInstallationId(savedInstallation.getId());
			installationAttachmentRepository.save(e);
		});

		return savedInstallation;
	}

	private List<InstallationLocation> getLocations(List<InstallationLocation> locations){
		List<InstallationLocation> managedLocations = new ArrayList<>();
		for (InstallationLocation location : locations) {
			InstallationLocation existingLocation = installationLocationRepository.findById(location.getId())
					.orElseThrow(() -> new EntityNotFoundException("InstallationLocation not found with ID: " + location.getId()));
			managedLocations.add(existingLocation);
		}
		return managedLocations;
	}

	public void createInstallationProduct(List<InstallationProduct> installationProducts,long id){
		for(InstallationProduct product :installationProducts){
			product.setInstallationId(id);
			installationProductRepository.save(product);
		}
	}
	public InstallationDto getById(long id) {
		Installation installation = installationReposotory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Installation not found with id " + id));
		return convertToDto(installation);
	}

	private InstallationDto convertToDto(Installation installation){
		InstallationDto dto = mapper.map(installation,InstallationDto.class);
		List<InstallationProduct> installationProducts = installationProductRepository.findByInstallationId(installation.getId());
		List<InstallationAttachment> installationAttachments = installationAttachmentRepository.findByInstallationId(installation.getId());
		dto.setInstallationProduct(installationProducts);
		dto.setAttachments(installationAttachments);
		return dto;

	}

	public void deleteById(long id) {
		if (installationReposotory.existsById(id)) {
			List<InstallationAttachment> installationAttachments = installationAttachmentRepository.findByInstallationId(id);
			List<InstallationProduct> products=installationProductRepository.findByInstallationId(id);
			for (InstallationAttachment attachment : installationAttachments){
				installationAttachmentRepository.deleteById(attachment.getId());
			}
			for (InstallationProduct product : products){
				installationProductRepository.deleteById(product.getId());
			}
			installationReposotory.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Installation not found with id " + id);
		}
	}

	public Installation updateInstallation(InstallationDto installation, long id) {
		Installation updatedInstallation = installationReposotory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Installation not present with id" + id));
		updatedInstallation.setInstallationDate(installation.getInstallationDate());
		updatedInstallation.setInstallationRemark(installation.getInstallationRemark());
		updatedInstallation.setInstallationStatus(installation.getInstallationStatus());
		updatedInstallation.setInstallationDoneBy(installation.getInstallationDoneBy());
		updatedInstallation.setInstallationVerifiedBy(installation.getInstallationVerifiedBy());
		updatedInstallation.setCustomer(installation.getCustomer());
		updatedInstallation.setIsAgainstPo(installation.getIsAgainstPo());
		updatedInstallation.setIsExtraActivitiesCarriedOut(installation.getIsExtraActivitiesCarriedOut());
		updatedInstallation.setPoId(installation.getPoId());
		updatedInstallation.setInstallationLocations(getLocations(installation.getInstallationLocations()));


		updateInstallationProduct(installation.getInstallationProduct(),id);
		updateInstallationAttachment(installation.getAttachments(),id);

		return installationReposotory.save(updatedInstallation);
	}

	private void updateInstallationAttachment(List<InstallationAttachment> attachments,long id){
		List<InstallationAttachment> installationAttachments = installationAttachmentRepository.findByInstallationId(id);
		Map<Long,InstallationAttachment> mappedAttachments = installationAttachments.stream().
				collect(Collectors.toMap(InstallationAttachment::getId,Function.identity()));

		for(InstallationAttachment attachment :attachments){
			if(attachment.getId()!=null && mappedAttachments.containsKey(attachment.getId())){
				mappedAttachments.remove(attachment.getId());
			}else{
				attachment.setInstallationId(id);
				installationAttachmentRepository.save(attachment);
			}
		}

		for (InstallationAttachment attachment : mappedAttachments.values()){
			installationAttachmentRepository.delete(attachment);
		}
	}

	private void updateInstallationProduct(List<InstallationProduct> installationProducts,Long id){
		List<InstallationProduct> products=installationProductRepository.findByInstallationId(id);
		Map<Long,InstallationProduct> mappedproduct = products.stream().
				collect(Collectors.toMap(InstallationProduct::getId, Function.identity()));

		for(InstallationProduct installationProduct : installationProducts){
			if(installationProduct.getId() != null && mappedproduct.containsKey(installationProduct.getId())){
				mappedproduct.remove(installationProduct.getId());
			}else{
				installationProduct.setInstallationId(id);
				installationProductRepository.save(installationProduct);
			}
		}
		for(InstallationProduct installationProduct : mappedproduct.values()){
			installationProductRepository.delete(installationProduct);
		}

	}

	public List<Installation> searchInstallation(String keyword, Pageable pageable) {
//		return installationReposotory.searchByKeyword(keyword, pageable).getContent();
		return null;
	}

	public Long getNextInstallationNo() {
		Long nextReportNo = installationReposotory.findMaxInstallationReportNo();
		return (nextReportNo == null) ? 1l : nextReportNo+1;
	}

	public InstallationAttachment uploadFile(String path, MultipartFile file) throws IOException {
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

		InstallationAttachment installationAttachment = new InstallationAttachment();
		installationAttachment.setFileName(name);
		installationAttachment.setLocation(filePath);
		installationAttachment.setDocType(docType);

		return installationAttachmentRepository.save(installationAttachment);
	}



}
