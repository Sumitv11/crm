import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSourceReference } from "@/components/settingroutes/source-of-reference/hook";
import { useGetCustomerStatus } from "@/components/settingroutes/customer-status/hook";
import { useGetCustomerType } from "@/components/settingroutes/customer-type/hook";
import { useGetDesignations } from "@/components/settingroutes/designation/hook";
import { useGetReferenceDetail } from "@/components/settingroutes/reference-details/hook";
import { useCustomerListRegister, useUpdateCustomerList } from "./hook";
import { CustomerFormProps } from "./CustomerFormProps";

const CustomerForm: React.FC<CustomerFormProps> = ({
  hasEdit,
  selectedCustomer,
}) => {
  const [serviceId, setServiceId] = useState<number | null>(null);
  setServiceId;
  hasEdit;
  const navigate = useNavigate();
  const addRegisterMutation = useCustomerListRegister();
  const UpdateServiceMutation = useUpdateCustomerList(serviceId);
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
  const [formData, setFormData] = useState<FormDataType>({
    customerType: null,
    customerStatus: null,
    sourceReference: null,
    referenceDetail: null,
    referenceRemark: "",
    customerName: "",
    gstNo: "",
    panNo: "",
    address1: "",
    address2: "",
    address3: "",
    // country: "",
    // state: "",
    // city: "",
    // area: "",
    // pincode: "",
    contactPerson: "",
    designation: null,
    customerWeightage: "",
    contactNumber: "",
    email: "",
    isActive: false,
  });

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSelectChange = (name: string, value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleCancel = () => {
    navigate("/app/customer-list");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    if (serviceId) {
      // Call update mutation if editing
      UpdateServiceMutation.mutate(formData, {
        onSuccess: () => {
          // refetch(); // Refetch data after a successful update
        },
      });
    } else {
      // Call register mutation if adding new service
      addRegisterMutation.mutate(formData, {
        onSuccess: () => {
          // refetch(); // Refetch data after a successful add
        },
      });
    }
  };

  const { data: sourceReferenceData, isError: isSourceError } =
    useGetSourceReference();
  const { data: customerTypeData, isError: isTypeError } = useGetCustomerType();
  const { data: customerStatusData, isError: isStatusError } =
    useGetCustomerStatus();
  const { data: referenceDetailData, isError: isDetailError } =
    useGetReferenceDetail();
  const { data: designationData, isError: isDesignationError } =
    useGetDesignations();

  console.log("Data=", sourceReferenceData?.data);

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
    console.log(value);
  };

  return (
    <motion.div
      className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-5xl mx-auto bg-white dark:bg-gray-700 p-4 sm:p-6 shadow-md rounded-md"
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
          <h1 className="text-xl font-bold mb-6">Customer Form</h1>
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
                value={selectedCustomer?.customerType}
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
                      <SelectItem key={type.id} value={type.id}>
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
                value={selectedCustomer?.customerStatus}
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
                value={selectedCustomer?.referenceSource}
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
                value={selectedCustomer?.referenceDetail}
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
                value={selectedCustomer?.referenceRemark}
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
                value={selectedCustomer?.customerName}
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
                value={selectedCustomer?.gstNo}
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
                value={selectedCustomer?.panNo}
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
                value={selectedCustomer?.address1}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label>Address Line 2</Label>
              <Input
                type="text"
                name="address2"
                value={selectedCustomer?.address2}
                onChange={handleInputChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <Label>Address Line 3</Label>
              <Input
                type="text"
                name="address3"
                value={selectedCustomer?.address3}
                onChange={handleInputChange}
                className="mt-1 w-full "
              />
            </div>
          </div>

          <hr />

          {/* Contact Person Section */}
          <div className="mb-6 mt-4">
            <Label>Contact Persons</Label>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Input
                required
                type="text"
                placeholder="Name"
                name="contactPerson"
                value={selectedCustomer?.contactPerson}
                className="w-full"
                onChange={handleInputChange}
              />
              <div>
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
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Designation">
                      {selectedCustomer?.designation?.designation ||
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
              <Input
                type="text"
                placeholder="Contact No"
                name="contactNumber"
                value={selectedCustomer?.contactNumber}
                className="w-full"
                onChange={handleInputChange}
              />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={selectedCustomer?.email}
                className="w-full"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <Label>Customer Weightage</Label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              rows={3}
              onChange={handleInputChange}
              name="customerWeightage"
              value={selectedCustomer?.customerWeightage}
            ></textarea>
          </div>
          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="mr-2"
                value={selectedCustomer?.isActive}
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
              <Button type="submit">Create</Button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default CustomerForm;
