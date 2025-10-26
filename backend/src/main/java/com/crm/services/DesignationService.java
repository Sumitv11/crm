package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.Designation;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.DesignationRepositories;

@Service
public class DesignationService {
	private final DesignationRepositories designationRepositories;

	public DesignationService(DesignationRepositories designationRepositories) {
		super();
		this.designationRepositories = designationRepositories;
	}
	
	public List<Designation> getAll(Pageable pageable) {
		return designationRepositories.findAll(pageable).getContent();
	}
	
	public List<Designation> v1getAll() {
		return designationRepositories.findAll();
	}

	public void create(Designation designation) {
		designationRepositories.save(designation);
	}

	public Designation getById(long id) {
		Designation designation = designationRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Designation not found with id " + id));
		return designation;
	}

	public void deleteById(long id) {
		if (designationRepositories.existsById(id)) {
			designationRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Designation not found with id " + id);
		}
	}

	public Designation updateDesignation(Designation designation, long id) {
		Designation updatedDesignation = designationRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Designation not present with id" + id));
		updatedDesignation.setCode(designation.getCode());
		updatedDesignation.setDesignation(designation.getDesignation());
		updatedDesignation.setIsActive(designation.getIsActive());
		designationRepositories.save(updatedDesignation);
		return updatedDesignation;
	}

	public List<Designation> searchDesignation(String keyword, Pageable pageable) {
		return designationRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
