package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.ItemCategory;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.ItemCategoryRepositories;

@Service
public class ItemCategoryService {

	private final ItemCategoryRepositories itemCategoryRepositories;

	public ItemCategoryService(ItemCategoryRepositories itemCategoryRepositories) {
		super();
		this.itemCategoryRepositories = itemCategoryRepositories;
	}

	public List<ItemCategory> getAll(Pageable pageable) {
		return itemCategoryRepositories.findAll(pageable).getContent();
	}
	
	public List<ItemCategory> v1getAll() {
		return itemCategoryRepositories.findAll();
	}

	public ItemCategory create(ItemCategory itemCategory) {
		return itemCategoryRepositories.save(itemCategory);
	}

	public ItemCategory getById(long id) {
		ItemCategory item = itemCategoryRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCategory not found with id " + id));
		return item;
	}

	public void deleteById(long id) {
		if (itemCategoryRepositories.existsById(id)) {
			itemCategoryRepositories.deleteById(id);
		} else {
			throw new ResourceNotFoundException("ItemCategory not found with id " + id);
		}
	}

	public ItemCategory updateItem(ItemCategory itemCategory, long id) {
		ItemCategory item = itemCategoryRepositories.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCategory not present with id" + id));

		item.setCode(itemCategory.getCode());
		item.setCategoryName(itemCategory.getCategoryName());
		item.setIsActive(itemCategory.getIsActive());
		itemCategoryRepositories.save(item);
		return item;
	}

	public List<ItemCategory> searchItemCategories(String keyword, Pageable pageable) {
		return itemCategoryRepositories.searchByKeyword(keyword, pageable).getContent();
	}

}
