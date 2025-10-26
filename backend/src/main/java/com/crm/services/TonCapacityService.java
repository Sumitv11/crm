package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.TonCapacity;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.TonCapacityRepositories;

@Service
public class TonCapacityService {

	private final TonCapacityRepositories tonCapacityRepositories;

	public TonCapacityService(TonCapacityRepositories tonCapacityRepositories) {
		super();
		this.tonCapacityRepositories = tonCapacityRepositories;
	}
	
	public List<TonCapacity> getAll(Pageable pageable) {
		return tonCapacityRepositories.findAll(pageable).getContent();
	}
	
	public List<TonCapacity> v1getAll() {
		return tonCapacityRepositories.findAll();
	}


	public TonCapacity create(TonCapacity tonCapacity) {
		return tonCapacityRepositories.save(tonCapacity);
	}

	public TonCapacity getById(long id) {
		TonCapacity tonCapacity = tonCapacityRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("TonCapacity not found with id " + id));
		return tonCapacity;
	}

	public void deleteById(long id) {
		if (tonCapacityRepositories.existsById(id)) {
			tonCapacityRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Ton Capacity not found with id " + id);
		}
	}

	public TonCapacity updateTonCapacity(TonCapacity tonCapacity, long id) {
		TonCapacity updatedTonCapacity = tonCapacityRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ton Capacity not present with id" + id));
		updatedTonCapacity.setTonCapacityName(tonCapacity.getTonCapacityName());
		updatedTonCapacity.setTonCode(tonCapacity.getTonCode());
		updatedTonCapacity.setIsActive(tonCapacity.getIsActive());
		tonCapacityRepositories.save(updatedTonCapacity);
		return updatedTonCapacity;
	}

	public List<TonCapacity> searchTonCapacity(String keyword, Pageable pageable) {
		return tonCapacityRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
