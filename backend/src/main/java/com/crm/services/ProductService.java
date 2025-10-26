package com.crm.services;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.entities.Product;
import com.crm.enums.ProductType;
import com.crm.exceptionHandler.ResourceNotFoundException;
import com.crm.repositories.ProductRepositories;

@Service
public class ProductService {
    private final ProductRepositories productRepositories;
    private final ItemStatusService itemStatusService;
    private final StarRatingService starRatingService;
    private final BrandNameService brandNameService;
    private final ItemCategoryService itemCategoryService;
    private final ItemTypeService itemTypeService;
    private final RefGasTypeService refGasTypeService;
    private final TonCapacityService tonCapacityService;
    private final UnitMeasurementService unitMeasurementService;

    public ProductService(ProductRepositories productRepositories, ItemStatusService itemStatusService,
                          StarRatingService starRatingService, BrandNameService brandNameService,
                          ItemCategoryService itemCategoryService, ItemTypeService itemTypeService,
                          RefGasTypeService refGasTypeService, TonCapacityService tonCapacityService,
                          UnitMeasurementService unitMeasurementService) {
        this.productRepositories = productRepositories;
        this.itemStatusService = itemStatusService;
        this.starRatingService = starRatingService;
        this.brandNameService = brandNameService;
        this.itemCategoryService = itemCategoryService;
        this.itemTypeService = itemTypeService;
        this.refGasTypeService = refGasTypeService;
        this.tonCapacityService = tonCapacityService;
        this.unitMeasurementService = unitMeasurementService;
    }


    public List<Product> getAll(Pageable pageable) {
        return productRepositories.findAll(pageable).getContent();
    }
    
    public List<Product> v1getAll() {
        return productRepositories.findAll();
    }

    public Product create(Product product) {

       return productRepositories.save(product);
    }

    public Product getById(long id) {
        Product product = productRepositories.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
        return product;
    }

    public void deleteById(long id) {
        if (productRepositories.existsById(id)) {
            productRepositories.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Product not found with id " + id);
        }
    }

    public Product updateProduct(Product product, long id) {
        Product updatedProduct = productRepositories.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not present with id" + id));

        updatedProduct.setCGST(product.getCGST());
        updatedProduct.setIGST(product.getIGST());
        updatedProduct.setSGST(product.getSGST());
        updatedProduct.setIsActive(product.getIsActive());
        updatedProduct.setProductCode(product.getProductCode());
        updatedProduct.setProductName(product.getProductName());
        updatedProduct.setIsGSTApllicable(product.getIsGSTApllicable());
        updatedProduct.setIsStockable(product.getIsStockable());
        updatedProduct.setIsKit(product.getIsKit());
        updatedProduct.setNameInvoice(product.getNameInvoice());
        updatedProduct.setYearOfIntroduction(product.getYearOfIntroduction());
        updatedProduct.setHsnCode(product.getHsnCode());
        updatedProduct.setMaxQuantity(product.getMaxQuantity());
        updatedProduct.setMinQuantity(product.getMinQuantity());
        updatedProduct.setModelNo(product.getModelNo());
        updatedProduct.setPurchasePrice(product.getPurchasePrice());
        updatedProduct.setReoderLevel(product.getReoderLevel());
        updatedProduct.setMRP(product.getMRP());
        updatedProduct.setSalesPrice(product.getSalesPrice());
        updatedProduct.setSizes(product.getSizes());
        updatedProduct.setProductType(product.getProductType());

        updatedProduct.setBaseUnitMeasurement(product.getBaseUnitMeasurement());
        updatedProduct.setPurchaseUnitMeasurement(product.getPurchaseUnitMeasurement());
        updatedProduct.setSalesUnitMeasurement(product.getSalesUnitMeasurement());
        updatedProduct.setBrandName(product.getBrandName());
        updatedProduct.setItemCategory(product.getItemCategory());
        updatedProduct.setItemStatus(product.getItemStatus());
        updatedProduct.setItemType(product.getItemType());
        updatedProduct.setRefGasType(product.getRefGasType());
        updatedProduct.setStarRating(product.getStarRating());
        updatedProduct.setTonCapacity(product.getTonCapacity());
        productRepositories.save(updatedProduct);
        return updatedProduct;
    }

    public List<Product> searchProduct(String keyword, Pageable pageable) {
        return productRepositories.searchByKeyword(keyword, pageable).getContent();
    }
    
    public List<Product> findByProductType(ProductType productType) {
        return productRepositories.findByProductType(productType);
    }
}
