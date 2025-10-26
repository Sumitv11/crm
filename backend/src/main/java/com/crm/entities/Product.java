package com.crm.entities;

import com.crm.enums.ProductType;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "model_no")
    private String modelNo;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "sizes")
    private String sizes;

    @ManyToOne
    @JoinColumn(name = "brand_name_id")
    private BrandName brandName;

    @ManyToOne
    @JoinColumn(name = "item_category_id")
    private ItemCategory itemCategory;

    @ManyToOne
    @JoinColumn(name = "item_type_id")
    private ItemType itemType;

    @ManyToOne
    @JoinColumn(name = "star_rating_id")
    private StarRating starRating;

    @ManyToOne
    @JoinColumn(name = "ref_gas_type_id")
    private RefGasType refGasType;

    @ManyToOne
    @JoinColumn(name = "ton_capacity_id")
    private TonCapacity tonCapacity;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isGSTApllicable;

    @Column(name = "igst")
    private Double IGST;

    @Column(name = "cgst")
    private Double CGST;

    @Column(name = "sgst")
    private Double SGST;

    @ManyToOne
    @JoinColumn(name = "sales_unit_measurement_id")
    private UnitMeasurement salesUnitMeasurement;

    @ManyToOne
    @JoinColumn(name = "unit_purchase_measurement_id")
    private UnitMeasurement purchaseUnitMeasurement;

    @ManyToOne
    @JoinColumn(name = "base_unit_measurement_id")
    private UnitMeasurement baseUnitMeasurement;

    @ManyToOne
    @JoinColumn(name = "item_status_id")
    private ItemStatus itemStatus;

    @Column(name = "reoder_level")
    private String reoderLevel;

    @Min(0)
    private Integer minQuantity;
    @Min(0)
    private Integer maxQuantity;
    @Min(0)
    private Double purchasePrice;
    @Min(0)
    private Double MRP;
    @Min(0)
    private Double salesPrice;


    @Column(name = "hsn_code")
    private String hsnCode;

    @Column(name = "year_of_introduction")
    private String yearOfIntroduction;

    @Column(name = "name_invoice")
    private String nameInvoice;
    
    @Enumerated(EnumType.STRING)
	private ProductType productType;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isStockable;
    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isKit;
    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isActive;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	public String getModelNo() {
		return modelNo;
	}
	public void setModelNo(String modelNo) {
		this.modelNo = modelNo;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getSizes() {
		return sizes;
	}
	public void setSizes(String sizes) {
		this.sizes = sizes;
	}
	public BrandName getBrandName() {
		return brandName;
	}
	public void setBrandName(BrandName brandName) {
		this.brandName = brandName;
	}
	public ItemCategory getItemCategory() {
		return itemCategory;
	}
	public void setItemCategory(ItemCategory itemCategory) {
		this.itemCategory = itemCategory;
	}
	public ItemType getItemType() {
		return itemType;
	}
	public void setItemType(ItemType itemType) {
		this.itemType = itemType;
	}
	public StarRating getStarRating() {
		return starRating;
	}
	public void setStarRating(StarRating starRating) {
		this.starRating = starRating;
	}
	public RefGasType getRefGasType() {
		return refGasType;
	}
	public void setRefGasType(RefGasType refGasType) {
		this.refGasType = refGasType;
	}
	public TonCapacity getTonCapacity() {
		return tonCapacity;
	}
	public void setTonCapacity(TonCapacity tonCapacity) {
		this.tonCapacity = tonCapacity;
	}
	public Boolean getIsGSTApllicable() {
		return isGSTApllicable;
	}
	public void setIsGSTApllicable(Boolean isGSTApllicable) {
		this.isGSTApllicable = isGSTApllicable;
	}
	public Double getIGST() {
		return IGST;
	}
	public void setIGST(Double iGST) {
		IGST = iGST;
	}
	public Double getCGST() {
		return CGST;
	}
	public void setCGST(Double cGST) {
		CGST = cGST;
	}
	public Double getSGST() {
		return SGST;
	}
	public void setSGST(Double sGST) {
		SGST = sGST;
	}
	public UnitMeasurement getSalesUnitMeasurement() {
		return salesUnitMeasurement;
	}
	public void setSalesUnitMeasurement(UnitMeasurement salesUnitMeasurement) {
		this.salesUnitMeasurement = salesUnitMeasurement;
	}
	public UnitMeasurement getPurchaseUnitMeasurement() {
		return purchaseUnitMeasurement;
	}
	public void setPurchaseUnitMeasurement(UnitMeasurement purchaseUnitMeasurement) {
		this.purchaseUnitMeasurement = purchaseUnitMeasurement;
	}
	public UnitMeasurement getBaseUnitMeasurement() {
		return baseUnitMeasurement;
	}
	public void setBaseUnitMeasurement(UnitMeasurement baseUnitMeasurement) {
		this.baseUnitMeasurement = baseUnitMeasurement;
	}
	public ItemStatus getItemStatus() {
		return itemStatus;
	}
	public void setItemStatus(ItemStatus itemStatus) {
		this.itemStatus = itemStatus;
	}
	public String getReoderLevel() {
		return reoderLevel;
	}
	public void setReoderLevel(String reoderLevel) {
		this.reoderLevel = reoderLevel;
	}
	public Integer getMinQuantity() {
		return minQuantity;
	}
	public void setMinQuantity(Integer minQuantity) {
		this.minQuantity = minQuantity;
	}
	public Integer getMaxQuantity() {
		return maxQuantity;
	}
	public void setMaxQuantity(Integer maxQuantity) {
		this.maxQuantity = maxQuantity;
	}
	public Double getPurchasePrice() {
		return purchasePrice;
	}
	public void setPurchasePrice(Double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}
	public Double getMRP() {
		return MRP;
	}
	public void setMRP(Double mRP) {
		MRP = mRP;
	}
	public Double getSalesPrice() {
		return salesPrice;
	}
	public void setSalesPrice(Double salesPrice) {
		this.salesPrice = salesPrice;
	}
	public String getHsnCode() {
		return hsnCode;
	}
	public void setHsnCode(String hsnCode) {
		this.hsnCode = hsnCode;
	}
	public String getYearOfIntroduction() {
		return yearOfIntroduction;
	}
	public void setYearOfIntroduction(String yearOfIntroduction) {
		this.yearOfIntroduction = yearOfIntroduction;
	}
	public String getNameInvoice() {
		return nameInvoice;
	}
	public void setNameInvoice(String nameInvoice) {
		this.nameInvoice = nameInvoice;
	}
	public Boolean getIsStockable() {
		return isStockable;
	}
	public void setIsStockable(Boolean isStockable) {
		this.isStockable = isStockable;
	}
	public Boolean getIsKit() {
		return isKit;
	}
	public void setIsKit(Boolean isKit) {
		this.isKit = isKit;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
    
    


}
