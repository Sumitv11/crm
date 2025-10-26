package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.ItemType;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.ItemTypeRepositories;

@Service
public class ItemTypeService {

    private final ItemTypeRepositories itemTypeRepository;
    
    public ItemTypeService(ItemTypeRepositories itemTypeRepository) {
        this.itemTypeRepository = itemTypeRepository;
    }

    public ItemType create(ItemType itemType) {
        return itemTypeRepository.save(itemType);
    }

    public List<ItemType> getAll(Pageable pageable) {
        return itemTypeRepository.findAll(pageable).getContent();
    }
    
    public List<ItemType> v1getAll() {
        return itemTypeRepository.findAll();
    }

    public ItemType getById(Long id) {
    	ItemType item = itemTypeRepository.findById(id).
				orElseThrow(()->new ResourceNotFoundException("ItemType not found with id " + id));
		return item;
    }

    public void deleteById(Long id) {
    	if(itemTypeRepository.existsById(id)) {
    		itemTypeRepository.deleteById(id);
		}
		else {
			throw new ResourceNotFoundException("ItemType not found with id " + id);
		}
    }

    public ItemType updateItem(ItemType itemType, Long id) {
    	ItemType item =itemTypeRepository.findById(id).
				orElseThrow(()->new ResourceNotFoundException("ItemType not present with id"+id));
		item.setTypeCode(itemType.getTypeCode());
		item.setTypeName(itemType.getTypeName());
		item.setIsActive(itemType.getIsActive());
		itemTypeRepository.save(item);
		return item;
    }
    public List<ItemType> searchItemType(String keyword, Pageable pageable) {
		return itemTypeRepository.searchByKeyword(keyword, pageable).getContent();
	}
}
