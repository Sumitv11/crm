package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.SourceReference;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.SourceReferenceRepositories;

@Service
public class SourceReferenceService {
		
	private final SourceReferenceRepositories sourceReferenceRepositories;

	public SourceReferenceService(SourceReferenceRepositories sourceReferenceRepositories) {
		super();
		this.sourceReferenceRepositories = sourceReferenceRepositories;
	}
	
	
	public List<SourceReference > getAll(Pageable pageable) {
		return sourceReferenceRepositories.findAll(pageable).getContent();
	}
	
	public List<SourceReference > v1getAll() {
		return sourceReferenceRepositories.findAll();
	}

	public SourceReference create(SourceReference sourceReference) {
		return sourceReferenceRepositories.save(sourceReference);
	}

	public SourceReference getById(long id) {
		SourceReference sourceReference = sourceReferenceRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("SourceReference not found with id " + id));
		return sourceReference;
	}

	public void deleteById(long id) {
		if (sourceReferenceRepositories.existsById(id)) {
			sourceReferenceRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("SourceReference not found with id " + id);
		}
	}

	public SourceReference updateSourceReference(SourceReference sourceReference, long id) {
		SourceReference updatedSourceReference = sourceReferenceRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("SourceReference not present with id" + id));
		updatedSourceReference.setCode(sourceReference.getCode());
		updatedSourceReference.setSourceReference(sourceReference.getSourceReference());
		updatedSourceReference.setIsActive(sourceReference.getIsActive());
		sourceReferenceRepositories.save(updatedSourceReference);
		return updatedSourceReference;
	}

	public List<SourceReference> searchSourceReference(String keyword, Pageable pageable) {
		return sourceReferenceRepositories.searchByKeyword(keyword, pageable).getContent();
	}
}
