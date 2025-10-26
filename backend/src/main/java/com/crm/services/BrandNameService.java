package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.BrandName;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.BrandNameRepositories;

@Service
public class BrandNameService {
    private final BrandNameRepositories brandNameRepositories;

    public BrandNameService(BrandNameRepositories brandNameRepositories) {
        this.brandNameRepositories = brandNameRepositories;
    }

    public List<BrandName> getAll( Pageable pageable) {
        return brandNameRepositories.findAll(pageable).getContent();
    }

    public void create(BrandName brandName) {
        brandNameRepositories.save(brandName);
    }

    public BrandName getById(long id) {
        BrandName brandName = brandNameRepositories.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BrandName not found with id " + id));
        return brandName;
    }

    public void deleteById(long id) {
        if (brandNameRepositories.existsById(id)) {
            brandNameRepositories.deleteById(id);
        } else {
            throw new ResourceNotFoundException("BrandName not found with id " + id);
        }
    }

    public BrandName updateBrandName(BrandName brandName, long id) {
        BrandName updatedBrandName = brandNameRepositories.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BrandName not present with id" + id));
        updatedBrandName.setBrandName(brandName.getBrandName());
        brandNameRepositories.save(updatedBrandName);
        return updatedBrandName;
    }

    public List<BrandName> searchBrandName(String keyword, Pageable pageable) {
        return brandNameRepositories.searchByKeyword(keyword, pageable).getContent();
    }
    
    public List<BrandName> v1getAll() {
        return brandNameRepositories.findAll();
    }

}
