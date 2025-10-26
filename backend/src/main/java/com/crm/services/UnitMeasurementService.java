package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.UnitMeasurement;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.UnitMeasurementRepositories;

@Service
public class UnitMeasurementService {
	
	private final UnitMeasurementRepositories unitMeasurementRepositories;
	
    public UnitMeasurementService(UnitMeasurementRepositories unitMeasurementRepositories) {
		super();
		this.unitMeasurementRepositories = unitMeasurementRepositories;
	}


	public List<UnitMeasurement> getAll(Pageable pageable) {
		return unitMeasurementRepositories.findAll(pageable).getContent();
	}
	
	public List<UnitMeasurement> v1getAll() {
		return unitMeasurementRepositories.findAll();
	}

	public UnitMeasurement create(UnitMeasurement unitMeasurement) {
		return unitMeasurementRepositories.save(unitMeasurement);
	}

	public UnitMeasurement getById(long id) {
		UnitMeasurement unitMeasurement = unitMeasurementRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Unit of Measurement not found with id " + id));
		return unitMeasurement;
	}

	public void deleteById(long id) {
		if (unitMeasurementRepositories.existsById(id)) {
			unitMeasurementRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("Unit of Measurement not found with id " + id);
		}
	}

	public UnitMeasurement updateUnitMeasurement(UnitMeasurement unitMeasurement, long id) {
		UnitMeasurement updatedUnitMeasurement = unitMeasurementRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Unit of Measurement not present with id" + id));
		updatedUnitMeasurement.setSymbol(unitMeasurement.getSymbol());
		updatedUnitMeasurement.setUom(unitMeasurement.getUom());
		updatedUnitMeasurement.setIsActive(unitMeasurement.getIsActive());
		unitMeasurementRepositories.save(updatedUnitMeasurement);
		return updatedUnitMeasurement;
	}

	public List<UnitMeasurement> searchUnitMeasurements(String keyword, Pageable pageable) {
		return unitMeasurementRepositories.searchByKeyword(keyword, pageable).getContent();
	}


}
