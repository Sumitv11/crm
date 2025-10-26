import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetSourceReference } from "@/components/settingroutes/source-of-reference/hook";
import { useGetCustomerType } from "@/components/settingroutes/customer-type/hook";
import { useGetCustomerStatus } from "@/components/settingroutes/customer-status/hook";
import { useGetReferenceDetail } from "@/components/settingroutes/reference-details/hook";
import { useGetDesignations } from "@/components/settingroutes/designation/hook";
import { Textarea } from "@/components/ui/textarea";

interface AddUserDialogProps {
  formId: string;
  onSubmit: (formData: any) => void;
  defaultValues?: any;
  setIsModalOpen: any;
}

const ServiceForm: React.FC<AddUserDialogProps> = ({
  onSubmit,
  formId,
  defaultValues = {},
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    customerType: defaultValues.customerType || null,
    customerStatus: defaultValues.customerStatus || null,
    sourceReference: defaultValues.sourceReference || null,
    referenceDetail: defaultValues.referenceDetail || null,
    referenceRemark: defaultValues.referenceRemark || "",
    customerName: defaultValues.customerName || "",
    gstNo: defaultValues.gstNo || "",
    panNo: defaultValues.panNo || "",
    address1: defaultValues.address1 || "",
    address2: defaultValues.address2 || "",
    address3: defaultValues.address3 || "",
    // country: defaultValues.country || "",
    // city: defaultValues.city || "",
    // area: defaultValues.area || "",
    // pincode: defaultValues.pincode || "",
    contactPerson: defaultValues.contactPerson || "",
    designation: defaultValues.designation || null,
    customerWeightage: defaultValues.customerWeightage || "",
    contactNumber: defaultValues.contactNumber || "",
    email: defaultValues.email || "",
    isActive: defaultValues.isActive || false,
  });

  type FormDataType = {
    customerType: { id: string; customerType: string } | null;
    customerStatus: { id: string; customerStatus: string } | null;
    sourceReference: { id: string; sourceReference: string } | null;
    referenceDetail: { id: string; referenceDetail: string } | null;
    designation: { id: string; designation: string } | null;
    referenceRemark: string;
    customerName: string;
    gstNo: string;
    panNo: string;
    address1: string;
    address2: string;
    address3: string;
    contactPerson: string;
    customerWeightage: string;
    contactNumber: string;
    email: string;
    isActive: boolean;
  };

  useEffect(() => {
    setFormData({
      ...formData,
      ...defaultValues,
    });
  }, [defaultValues]);

  const { data: sourceReferenceData, isError: isSourceError } =
    useGetSourceReference();
  const { data: customerTypeData, isError: isTypeError } = useGetCustomerType();
  const { data: customerStatusData, isError: isStatusError } =
    useGetCustomerStatus();
  const { data: referenceDetailData, isError: isDetailError } =
    useGetReferenceDetail();
  const { data: designationData, isError: isDesignationError } =
    useGetDesignations();
  formId;

  // console.log("Data=",sourceReferenceData?.data);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FormData", formData);
    onSubmit(formData);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleCancel = () => {
    // Navigate("/app/customer-list");
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="p-4 sm:p-6  min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-5xl mx-auto  p-4 sm:p-6 shadow-md rounded-md"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <motion.form
          onSubmit={handleSubmit}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* <h1 className="text-xl font-bold mb-6">Customer Form</h1> */}
          {/* First Section */}
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6"
            variants={fadeInUp}
          >
            <div>
              <Label>Customer Type</Label>

              <Select
                required
                onValueChange={(value) =>
                  handleDropdownChange(
                    "customerType",
                    value,
                    customerTypeData?.data
                  )
                }
                value={formData?.customerType?.id || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Customer Type">
                    {formData.customerType?.customerType ||
                      "Select Customer Type"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {!isTypeError &&
                    customerTypeData?.data.map((type: any) => (
                      <SelectItem key={type.id} value={String(type.id)}>
                        {type.customerType}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Customer Status</Label>
              <Select
                required
                onValueChange={(value) =>
                  handleDropdownChange(
                    "customerStatus",
                    value,
                    customerStatusData?.data
                  )
                }
                value={formData?.customerStatus?.id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Customer Status">
                    {formData.customerStatus?.customerStatus ||
                      "Select Customer Status"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {!isStatusError &&
                    customerStatusData?.data.map((type: any) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.customerStatus}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reference Source</Label>
              <Select
                required
                onValueChange={(value) =>
                  handleDropdownChange(
                    "sourceReference",
                    value,
                    sourceReferenceData?.data
                  )
                }
                value={formData.sourceReference?.id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Source Reference">
                    {formData.sourceReference?.sourceReference ||
                      "Select Source Reference"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {!isSourceError &&
                    sourceReferenceData?.data.map((type: any) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.sourceReference}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reference Detail</Label>
              <Select
                required
                onValueChange={(value) =>
                  handleDropdownChange(
                    "referenceDetail",
                    value,
                    referenceDetailData?.data
                  )
                }
                value={formData?.referenceDetail?.id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Reference Detail">
                    {formData.referenceDetail?.referenceDetail ||
                      "Select Reference Detail"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {!isDetailError &&
                    referenceDetailData?.data.map((type: any) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.referenceDetail}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label>Reference Remark</Label>
              <Input
                type="text"
                name="referenceRemark"
                value={formData?.referenceRemark}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
          </motion.div>

          <hr />

          {/* Address Section */}
          <div className="grid gap-4 sm:grid-cols-2 mb-6 mt-4">
            <div>
              <Label>Customer Name</Label>
              <Input
                required
                type="text"
                name="customerName"
                value={formData?.customerName}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label>GST No</Label>
              <Input
                required
                type="text"
                name="gstNo"
                value={formData?.gstNo}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label>PAN No</Label>
              <Input
                required
                type="text"
                name="panNo"
                value={formData?.panNo}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label>Address Line 1</Label>
              <Input
                required
                type="text"
                name="address1"
                value={formData?.address1}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label>Address Line 2</Label>
              <Input
                type="text"
                name="address2"
                value={formData?.address2}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label>Address Line 3</Label>
              <Input
                type="text"
                name="address3"
                value={formData?.address3}
                onChange={handleInputChange}
                className="mt-1 w-full "
              />
            </div>
          </div>

          <hr />

          {/* Contact Person Section */}
          <div className="mb-6 mt-4 d-flex justify-content-between">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Contact Persons</Label>
                <Input
                  required
                  type="text"
                  placeholder="Name"
                  name="contactPerson"
                  value={formData?.contactPerson}
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Designation</Label>
                <Select
                  required
                  onValueChange={(value) =>
                    handleDropdownChange(
                      "designation",
                      value,
                      designationData?.data
                    )
                  }
                  value={formData?.designation?.id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Designation">
                      {formData.designation?.designation ||
                        "Select Designation"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {!isDesignationError &&
                      designationData?.data.map((type: any) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.designation}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Contact No</Label>
                <Input
                  type="text"
                  required
                  placeholder="Enter 10 digit contact No"
                  name="contactNumber"
                  value={defaultValues?.contactNumber}
                  className="w-full"
                  pattern="^\d{10}$"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  value={defaultValues?.email}
                  className="w-full"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <Label>Customer Weightage</Label>
            <Textarea
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              rows={3}
              onChange={handleInputChange}
              name="customerWeightage"
              value={defaultValues?.customerWeightage}
            />
          </div>
          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                checked={formData?.isActive}
                onChange={handleCheckboxChange}
                className="mr-2"
                value={""}
              />
              <Label htmlFor="status">Status (IsActive)</Label>
            </div>
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="secondary"
                // className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit">
                {defaultValues?.id ? "Edit" : "Create"}{" "}
              </Button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ServiceForm;
