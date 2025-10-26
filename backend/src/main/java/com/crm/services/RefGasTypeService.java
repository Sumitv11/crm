package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.RefGasType;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.RefGasTypeRepositories;

@Service
public class RefGasTypeService {

	private final RefGasTypeRepositories refGasTypeRepositories;

	public RefGasTypeService(RefGasTypeRepositories refGasTypeRepositories) {
		super();
		this.refGasTypeRepositories = refGasTypeRepositories;
	}
	
	public List<RefGasType> getAll(Pageable pageable) {
		return refGasTypeRepositories.findAll(pageable).getContent();
	}
	
	public List<RefGasType> v1getAll() {
		return refGasTypeRepositories.findAll();
	}

	public RefGasType create(RefGasType gasType) {
		return refGasTypeRepositories.save(gasType);
	}

	public RefGasType getById(long id) {
		RefGasType gasType = refGasTypeRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("RefGasType not found with id " + id));
		return gasType;
	}

	public void deleteById(long id) {
		if (refGasTypeRepositories.existsById(id)) {
			refGasTypeRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Gas Type not found with id " + id);
		}
	}

	public RefGasType updateGasType(RefGasType gasType, long id) {
		RefGasType updatedGasType = refGasTypeRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ref Gas Type not present with id" + id));
		updatedGasType.setGasTypeName(gasType.getGasTypeName());
		updatedGasType.setIsActive(gasType.getIsActive());
		updatedGasType.setTypeCode(gasType.getTypeCode());
		refGasTypeRepositories.save(updatedGasType);
		return updatedGasType;
	}

	public List<RefGasType> searchRefGasTypes(String keyword, Pageable pageable) {
		return refGasTypeRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
