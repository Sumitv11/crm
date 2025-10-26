package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.OrderType;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.OrderTypeRepository;

import jakarta.validation.Valid;

@Service
public class OrderTypeService {

	private final OrderTypeRepository orderTypeRepository;

	public OrderTypeService(OrderTypeRepository orderTypeRepository) {
		super();
		this.orderTypeRepository = orderTypeRepository;
	}
	
	public List<OrderType> getAll( Pageable pageable) {
        return orderTypeRepository.findAll(pageable).getContent();
    }

    public OrderType create(OrderType orderType) {
    	return orderTypeRepository.save(orderType);
    }

    public OrderType getById(long id) {
    	OrderType orderType = orderTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("OrderType not found with id " + id));
        return orderType;
    }

    public void deleteById(long id) {
        if (orderTypeRepository.existsById(id)) {
        	orderTypeRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("OrderType not found with id " + id);
        }
    }

    public OrderType updateOrderType(OrderType orderType, long id) {
    	OrderType updatedOrderType = orderTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("OrderType not present with id" + id));
    	updatedOrderType.setName(orderType.getName());
    	orderTypeRepository.save(updatedOrderType);
        return updatedOrderType;
    }

//    public List<BrandName> searchBrandName(String keyword, Pageable pageable) {
//        return orderTypeRepository.searchByKeyword(keyword, pageable).getContent();
//    }
    
    public List<OrderType> v1getAll() {
        return orderTypeRepository.findAll();
    }

}
