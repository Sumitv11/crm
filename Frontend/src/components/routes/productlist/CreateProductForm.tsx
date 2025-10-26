import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetBrandNames } from "@/components/settingroutes copy/brandName/hook";
import { useGetItemCategories } from "@/components/settingroutes copy/item-category/hook";
import { useGetItemType } from "@/components/settingroutes copy/item-type/hook";
import { useGetStarRatings } from "@/components/settingroutes copy/star-rating/hook";
import { useGetRefGasType } from "@/components/settingroutes copy/ref-gas-type/hook";
import { useGetTonCapacitys } from "@/components/settingroutes copy/ton-capacity/hook";
import { useGetItemStatus } from "@/components/settingroutes copy/item-status/hook";
import { useGetUnitMeasurements } from "@/components/settingroutes copy/unit-of-measurements/hook";
import { useGetProducts, useProductRegister, useUpdateProduct } from "./hook";
import { ProductType } from "../sales/Types";
import toast from "react-hot-toast";
import { FormDataType } from "./type";

const CreateProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetProducts();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let [id, setId] = useState<string | null>(null);

  const isInitialized = useRef(false);
  useEffect(() => {
    let queryId = queryParams.get("id");
    setId(queryId);

    if (queryId && data && !isInitialized.current) {
      const product = data?.data.find((item: any) => {
        console.log("Item ID:", item.id);
        return item.id.toString() === queryId;
      });
      if (product) {
        setFormData(product);
        isInitialized.current = true;
      }
      console.log(product);
      //  else {
      //   setFormData(null); // Handle case where the ID doesn't match any product
      // }
    }
  }, [data, queryParams]);

  const [formData, setFormData] = useState<FormDataType>({
    productCode: "",
    modelNo: "",
    productName: "",
    sizes: "",
    brandName: { id: "", brandName: "" },
    itemCategory: { id: "", categoryName: "" },
    itemType: { id: "", typeName: "" },
    starRating: { id: "", starRating: "" },
    refGasType: { id: "", gasTypeName: "" },
    tonCapacity: { id: "", tonCapacityName: "" },
    isGSTApllicable: false,
    salesUnitMeasurement: { id: "", uom: "" },
    purchaseUnitMeasurement: { id: "", uom: "" },
    baseUnitMeasurement: { id: "", uom: "" },
    itemStatus: { id: "", statusName: "" },
    reoderLevel: "",
    minQuantity: 0,
    maxQuantity: 0,
    purchasePrice: 0,
    salesPrice: 0,
    hsnCode: "",
    yearOfIntroduction: "",
    nameInvoice: "",
    isStockable: false,
    isKit: false,
    isActive: false,
    mrp: 0,
    sgst: "",
    igst: "",
    cgst: "",
    productType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("clicked", e.target.value);
    const { name, value } = e.target;
    const values = e.target.value;
    console.log(values);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const { data: itemCategoryData, isError: isItemCategoryError } =
    useGetItemCategories();
  const { data: brandNameData, isError: isBrandNameError } = useGetBrandNames();
  const { data: itemTypeData, isError: isItemTypeError } = useGetItemType();
  const { data: itemStatusData, isError: isItemStatusError } =
    useGetItemStatus();
  const { data: starRatingData, isError: isStarRatingError } =
    useGetStarRatings();
  const { data: refGasTypeData, isError: isRefGasTypeError } =
    useGetRefGasType();
  const { data: tonCapacityData, isError: isTonCapacityError } =
    useGetTonCapacitys();
  const { data: unitMeasurementData, isError: isUnitMeasurementError } =
    useGetUnitMeasurements();

  const productTypes = Object.values(ProductType);

  const addRegisterMutation = useProductRegister();
  const UpdateServiceMutation = useUpdateProduct(id);

  const handleSubmit = () => {
    console.log("IN SUBMIT");

    const requiredFields: (keyof FormDataType)[] = [
      "productCode",
      "modelNo",
      "productName",
      "sizes",
      "reoderLevel",
      "hsnCode",
      "yearOfIntroduction",
      "nameInvoice",
      "productType",
    ];

    const numericFields: (keyof FormDataType)[] = [
      "minQuantity",
      "maxQuantity",
      "purchasePrice",
      "salesPrice",
      "mrp",
    ];

    const gstFields: (keyof FormDataType)[] = ["sgst", "igst", "cgst"];

    const dropdownFields: (keyof FormDataType)[] = [
      "brandName",
      "itemCategory",
      "itemType",
      "starRating",
      "refGasType",
      "tonCapacity",
      "salesUnitMeasurement",
      "purchaseUnitMeasurement",
      "baseUnitMeasurement",
      "itemStatus",
    ];

    // Validate required text fields
    for (const field of requiredFields) {
      if (!formData[field]?.toString().trim()) {
        toast.error(`${field.replace(/([A-Z])/g, " $1")} is required.`);
        return;
      }
    }

    // Validate dropdown fields (must have an ID)
    for (const field of dropdownFields) {
      const fieldValue = formData[field] as { id: string }; // Ensure TypeScript knows it's an object with `id`
      if (!fieldValue?.id) {
        toast.error(
          `${field.replace(/([A-Z])/g, " $1")} selection is required.`
        );
        return;
      }
    }

    // Validate numeric fields (must be greater than 0)
    for (const field of numericFields) {
      const fieldValue = formData[field] as number; // Explicitly define as number
      if (fieldValue <= 0) {
        toast.error(
          `${field.replace(/([A-Z])/g, " $1")} must be greater than 0.`
        );
        return;
      }
    }

    // Validate GST fields (should not be empty)
    for (const field of gstFields) {
      if (!formData[field]?.toString().trim()) {
        toast.error(`${field.replace(/([A-Z])/g, " $1")} is required.`);
        return;
      }
    }

    // Proceed with submission if validation passes
    if (id) {
      UpdateServiceMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          refetch();
          navigate("/app/product-list");
        },
      });
      id = null;
    } else {
      addRegisterMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Product added successfully!");
          refetch();
          navigate("/app/product-list");
        },
      });
    }
  };

  const handleDropdownChange = (
    fieldName: string,
    value: string,
    options: any[]
  ) => {
    const selectedObject = options.find(
      (item: any) => String(item.id) === value
    );
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedObject || null,
    }));

    console.log(value, selectedObject);
  };

  const handleCancel = () => {
    navigate("/app/product-list");
  };
  return (
    // <form onSubmit={handleSubmit}>
    <div className="p-6 bg-gray-100 dark:bg-gray-900  min-h-screen">
      {/* <div> */}
      <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md border border-gray-300 dark:border-gray-600">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium">Product Code</label>
            <Input
              required
              type="text"
              name="productCode"
              placeholder="Enter Product Code"
              value={formData?.productCode}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Model No</label>
            <Input
              required
              type="text"
              name="modelNo"
              placeholder="Enter Model No"
              value={formData?.modelNo}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <Input
              required
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              value={formData?.productName}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Brand Name</label>
            <Select
              required
              onValueChange={(value) =>
                handleDropdownChange("brandName", value, brandNameData?.data)
              }
              value={formData?.brandName?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Customer Type">
                  {formData.brandName?.brandName || "Select Brand name"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isBrandNameError &&
                  brandNameData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.brandName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Sizes</label>
            <Input
              required
              type="number"
              name="sizes"
              placeholder="Enter Sizes"
              value={formData?.sizes}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Item Category</label>
            <Select
              required
              onValueChange={(value) =>
                handleDropdownChange(
                  "itemCategory",
                  value,
                  itemCategoryData?.data
                )
              }
              value={formData?.itemCategory?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Item Category">
                  {formData.itemCategory?.categoryName ||
                    "Select Item Category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isItemCategoryError &&
                  itemCategoryData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.categoryName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Product Types</label>
            <Select
              required
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, productType: value }))
              }
              value={formData.productType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product Type">
                  {formData?.productType || "Select Product Type"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Item Types</label>
            <Select
              required
              onValueChange={(value) =>
                handleDropdownChange("itemType", value, itemTypeData?.data)
              }
              value={formData?.itemType?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Item Type">
                  {formData.itemType?.typeName || "Select Item Type"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isItemTypeError &&
                  itemTypeData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.typeName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Star Ratings</label>
            <Select
              required
              onValueChange={(value) =>
                handleDropdownChange("starRating", value, starRatingData?.data)
              }
              value={formData?.starRating?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Star Rating">
                  {formData.starRating?.starRating || "Select Star Rating"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isStarRatingError &&
                  starRatingData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.starRating}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Ref. Gas Type</label>
            <Select
              required
              onValueChange={(value) =>
                handleDropdownChange("refGasType", value, refGasTypeData?.data)
              }
              value={formData?.refGasType?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select refGasType">
                  {formData.refGasType?.gasTypeName || "Select refGasType"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isRefGasTypeError &&
                  refGasTypeData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.gasTypeName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Ton Capacity</label>
            <Select
              required
              onValueChange={(value) =>
                handleDropdownChange(
                  "tonCapacity",
                  value,
                  tonCapacityData?.data
                )
              }
              value={formData?.tonCapacity?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select tonCapacity">
                  {formData.tonCapacity?.tonCapacityName ||
                    "Select tonCapacity"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isTonCapacityError &&
                  tonCapacityData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.tonCapacityName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isGSTApllicable"
              className="mr-2"
              checked={formData.isGSTApllicable}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="status" className="text-sm font-medium">
              Is GST Applicable
            </label>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">IGST</label>
            <Input
              type="text"
              name="igst"
              value={formData?.igst}
              onChange={handleInputChange}
              placeholder="Enter IGST"
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">CGST</label>
            <Input
              type="text"
              name="cgst"
              placeholder="Enter CGST"
              value={formData?.cgst}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">SGST</label>
            <Input
              type="text"
              name="sgst"
              placeholder="Enter SGST"
              value={formData?.sgst}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-4 mb-6 mt-4">
          <div>
            <label className="block text-sm font-medium">Purchase UoM</label>
            <Select
              onValueChange={(value) =>
                handleDropdownChange(
                  "purchaseUnitMeasurement",
                  value,
                  unitMeasurementData?.data
                )
              }
              value={formData?.purchaseUnitMeasurement?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sales Unit Measurement">
                  {formData.purchaseUnitMeasurement?.uom ||
                    "Select Sales Unit Measurement"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isUnitMeasurementError &&
                  unitMeasurementData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.uom}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Sales UoM</label>
            <Select
              onValueChange={(value) =>
                handleDropdownChange(
                  "salesUnitMeasurement",
                  value,
                  unitMeasurementData?.data
                )
              }
              value={formData?.salesUnitMeasurement?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Purchase Unit Measurement">
                  {formData.salesUnitMeasurement?.uom ||
                    "Select Purchase Unit Measurement"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isUnitMeasurementError &&
                  unitMeasurementData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.uom}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Base UoM</label>
            <Select
              onValueChange={(value) =>
                handleDropdownChange(
                  "baseUnitMeasurement",
                  value,
                  unitMeasurementData?.data
                )
              }
              value={formData?.baseUnitMeasurement?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Base Unit Measurement">
                  {formData.baseUnitMeasurement?.uom ||
                    "Select Base Unit Measurement"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isUnitMeasurementError &&
                  unitMeasurementData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.uom}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Reorder Level</label>
            <Input
              required
              type="text"
              name="reoderLevel"
              placeholder="Enter Reorder Level"
              value={formData?.reoderLevel}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Min Quantity</label>
            <Input
              required
              type="number"
              min={0}
              placeholder="Enter Min Quantity"
              name="minQuantity"
              value={formData?.minQuantity}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Quantity</label>
            <Input
              required
              min={0}
              type="number"
              name="maxQuantity"
              placeholder="Enter Max Quantity"
              value={formData?.maxQuantity}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Purchase Price</label>
            <Input
              type="number"
              min={0}
              required
              name="purchasePrice"
              placeholder="Enter Purchase Price"
              value={formData?.purchasePrice}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">MRP</label>
            <Input
              type="number"
              min={0}
              required
              name="mrp"
              value={formData?.mrp}
              onChange={handleInputChange}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sales Price</label>
            <Input
              type="number"
              name="salesPrice"
              min={0}
              required
              value={formData?.salesPrice}
              onChange={handleInputChange}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">HSN Code</label>
            <Input
              required
              type="text"
              name="hsnCode"
              value={formData?.hsnCode}
              placeholder="Enter HSN Code"
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Year Of Introduction
            </label>
            <Input
              type="text"
              required
              name="yearOfIntroduction"
              placeholder="Enter Year Of Introduction"
              value={formData?.yearOfIntroduction}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Item Status</label>
            <Select
              onValueChange={(value) =>
                handleDropdownChange("itemStatus", value, itemStatusData?.data)
              }
              value={formData?.itemStatus?.id || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Item Status">
                  {formData.itemStatus?.statusName || "Select Item Status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {!isItemStatusError &&
                  itemStatusData?.data.map((type: any) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.statusName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium">Name Of Invoice</label>
            <Input
              type="text"
              name="nameInvoice"
              placeholder="Enter Name Of Invoice"
              value={formData?.nameInvoice}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-4 mb-6 mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isStockable"
              className="mr-2"
              checked={formData.isStockable}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isStockable" className="text-sm font-medium">
              Is Stockable
            </label>
          </div>

          {/* Is Kit Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isKit"
              className="mr-2"
              checked={formData.isKit}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isKit" className="text-sm font-medium">
              Is Kit
            </label>
          </div>

          {/* Is Active Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              className="mr-2"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Is Active
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={handleSubmit}>
            {id ? "Update Product" : "Create Product"}
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
    // </form>
  );
};

export default CreateProductForm;
