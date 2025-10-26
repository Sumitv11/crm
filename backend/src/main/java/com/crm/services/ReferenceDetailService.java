package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.ReferenceDetail;
import com.crm.entities.SourceReference;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.ReferenceDetailRepositories;
import com.crm.repositories.SourceReferenceRepositories;

@Service
public class ReferenceDetailService {
		
	private final ReferenceDetailRepositories referenceDetailRepositories;
	private final SourceReferenceRepositories sourceReferenceRepositories;

	public ReferenceDetailService(ReferenceDetailRepositories referenceDetailRepositories, SourceReferenceRepositories sourceReferenceRepositories) {
		super();
		this.referenceDetailRepositories = referenceDetailRepositories;
		this.sourceReferenceRepositories = sourceReferenceRepositories;
	}
	
	public List<ReferenceDetail> getAll(Pageable pageable) {
		return referenceDetailRepositories.findAll(pageable).getContent();
	}
	
	public List<ReferenceDetail> v1getAll() {
		return referenceDetailRepositories.findAll();
	}

	public ReferenceDetail create(ReferenceDetail referenceDetail) {
//		SourceReference sourceReference =sourceReferenceRepositories.getById(referenceDetail.getSourceReference())
		return referenceDetailRepositories.save(referenceDetail);
	}

	public ReferenceDetail getById(long id) {
		ReferenceDetail gasType = referenceDetailRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ReferenceDetail not found with id " + id));
		return gasType;
	}

	public void deleteById(long id) {
		if (referenceDetailRepositories.existsById(id)) {
			referenceDetailRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("ReferenceDetail not found with id " + id);
		}
	}

	public ReferenceDetail updateReferenceDetail(ReferenceDetail referenceDetail, long id) {
		ReferenceDetail updatedReferenceDetail = referenceDetailRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ReferenceDetail Type not present with id" + id));
		updatedReferenceDetail.setReferenceDetail(referenceDetail.getReferenceDetail());
		updatedReferenceDetail.setSourceReference(referenceDetail.getSourceReference());
		updatedReferenceDetail.setIsActive(referenceDetail.getIsActive());
		referenceDetailRepositories.save(updatedReferenceDetail);
		return updatedReferenceDetail;
	}

	public List<ReferenceDetail> searchReferenceDetail(String keyword, Pageable pageable) {
		return referenceDetailRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
