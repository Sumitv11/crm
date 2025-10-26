package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.ItemStatus;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.ItemStatusRepositories;

@Service
public class ItemStatusService {

   private final ItemStatusRepositories itemStatusRepositories;
	
	public ItemStatusService(ItemStatusRepositories itemStatusRepositories) {
		super();
		this.itemStatusRepositories = itemStatusRepositories;
	}

	
	public List<ItemStatus> getAll(Pageable pageable) {
        return itemStatusRepositories.findAll(pageable).getContent();
    }
	
	public List<ItemStatus> v1getAll() {
        return itemStatusRepositories.findAll();
    }
	
	public ItemStatus create(ItemStatus itemStatus) {
		return itemStatusRepositories.save(itemStatus);
	}

	public ItemStatus getById(long id) {
		ItemStatus item =itemStatusRepositories.findById(id).
				orElseThrow(()->new ResourceNotFoundException("ItemStatus not found with id " + id));
		return item;
	}

	public void deleteById(long id) {
		if(itemStatusRepositories.existsById(id)) {
			itemStatusRepositories.deleteById(id);
		}
		else {
			throw new ResourceNotFoundException("ItemStatus not found with id " + id);
		}
	}

	public ItemStatus updateItem(ItemStatus itemStatus, long id) {
		ItemStatus item =itemStatusRepositories.findById(id).
				orElseThrow(()->new ResourceNotFoundException("ItemStatus not present with id"+id));
		item.setIsActive(itemStatus.getIsActive());
		item.setStatusCode(itemStatus.getStatusCode());
		item.setStatusName(itemStatus.getStatusName());
		itemStatusRepositories.save(item);
		return item;
	}
	
	
	public List<ItemStatus> searchItemStatus(String keyword, Pageable pageable) {
        return itemStatusRepositories.searchByKeyword(keyword, pageable).getContent();
    }


}
