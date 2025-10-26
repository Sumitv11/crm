package com.crm.services;

import com.crm.entities.BrandName;
import com.crm.entities.Material;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.MaterialRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }


    public List<Material> getAll(Pageable pageable) {
        return materialRepository.findAll(pageable).getContent();
    }

    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    public Material create(Material material) {
      return  materialRepository.save(material);
    }

    public Material getById(long id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found with id " + id));
        return material;
    }

    public void deleteById(long id) {
        if (materialRepository.existsById(id)) {
            materialRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Material not found with id " + id);
        }
    }

    public Material updateMaterial(Material material, long id) {
        Material updatedMaterial = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not present with id" + id));
        updatedMaterial.setMaterialName(material.getMaterialName());
        updatedMaterial.setMaterialQuantityUOM(material.getMaterialQuantityUOM());
        materialRepository.save(updatedMaterial);
        return updatedMaterial;
    }

    public List<Material> searchMaterial(String keyword, Pageable pageable) {
        return materialRepository.searchByKeyword(keyword, pageable).getContent();
    }

    public List<Material> v1getAll() {
        return materialRepository.findAll();
    }

}
