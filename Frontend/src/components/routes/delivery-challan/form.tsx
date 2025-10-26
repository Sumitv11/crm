import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectTrigger,  SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
  formId: string;
  onSubmit: (formData: any) => void;
  defaultValues?: any;
}

const ServiceForm: React.FC<AddUserDialogProps> = ({
  onSubmit,
  formId,
  defaultValues = {},
}) => {
  const [formData, setFormData] = useState({
    CustomerType: defaultValues.CustomerType || "",
    CustomerStatus: defaultValues.CustomerStatus || "",
    SourceOfReference: defaultValues.SourceOfReference || "",
    ReferenceDetail: defaultValues.ReferenceDetail || "",
    ReferenceRemark: defaultValues.ReferenceRemark || "",
    CustomerName: defaultValues.CustomerName || "",
    GSTNo: defaultValues.GSTNo || "",
    PANNo: defaultValues.PANNo || "",
    AddressLine1: defaultValues.AddressLine1 || "",
    AddressLine2: defaultValues.AddressLine2 || "",
    AddressLine3: defaultValues.AddressLine3 || "",
    Country: defaultValues.Country || "",
    State: defaultValues.State || "",
    City: defaultValues.City || "",
    Area: defaultValues.Area || "",
    Pincode: defaultValues.Pincode || "",
    ContactPersons: defaultValues.ContactPersons || [
      { name: "", designation: "", contactNo: "", email: "" },
    ],
    CustomerWeightage: defaultValues.CustomerWeightage || "",
    Status: defaultValues.Status || false,
  });

  // Update formData when defaultValues change
  useEffect(() => {
    setFormData({
      ...defaultValues,
      ContactPersons: defaultValues.ContactPersons || [
        { name: "", designation: "", contactNo: "", email: "" },
      ],
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <ScrollArea className="h-[350px] w-full rounded-md border p-4 space-y-4">
        {/* Basic Details */}
        <div className="grid grid-cols-3 gap-4 ml-2 mr-2">
        <div className="space-y-2">
      <Label>Select Customer Type</Label>
      <Select
       
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Customer Type" />
        </SelectTrigger>
        <SelectContent>
          {/* {data.map((plan:any) => (
            // <SelectItem key={plan.insuranceId} value={plan.name} onClick={() => handleSelect(plan.insuranceId)} >
            //   {plan.planName}
            // </SelectItem>
            <li
            key={plan.insuranceId}
            className={`p-3 cursor-pointer transition-all rounded-md 
              bg-white hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFormData(plan.insuranceId)}
          >
            {plan.planName}
          </li>
          ))} */}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label>Select Customer Status</Label>
      <Select
       
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Customer Status" />
        </SelectTrigger>
        <SelectContent>
          {/* {data.map((plan:any) => (
            // <SelectItem key={plan.insuranceId} value={plan.name} onClick={() => handleSelect(plan.insuranceId)} >
            //   {plan.planName}
            // </SelectItem>
            <li
            key={plan.insuranceId}
            className={`p-3 cursor-pointer transition-all rounded-md 
              bg-white hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFormData(plan.insuranceId)}
          >
            {plan.planName}
          </li>
          ))} */}
        </SelectContent>
      </Select>
    </div>
         
    <div className="space-y-2">
      <Label>Select Customer Status</Label>
      <Select
       
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Customer Status" />
        </SelectTrigger>
        <SelectContent>
          {/* {data.map((plan:any) => (
            // <SelectItem key={plan.insuranceId} value={plan.name} onClick={() => handleSelect(plan.insuranceId)} >
            //   {plan.planName}
            // </SelectItem>
            <li
            key={plan.insuranceId}
            className={`p-3 cursor-pointer transition-all rounded-md 
              bg-white hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFormData(plan.insuranceId)}
          >
            {plan.planName}
          </li>
          ))} */}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label>Source of Reference</Label>
      <Select
       
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Enter Source of Reference" />
        </SelectTrigger>
        <SelectContent>
          {/* {data.map((plan:any) => (
            // <SelectItem key={plan.insuranceId} value={plan.name} onClick={() => handleSelect(plan.insuranceId)} >
            //   {plan.planName}
            // </SelectItem>
            <li
            key={plan.insuranceId}
            className={`p-3 cursor-pointer transition-all rounded-md 
              bg-white hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFormData(plan.insuranceId)}
          >
            {plan.planName}
          </li>
          ))} */}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label>Reference Detail</Label>
      <Select
       
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Enter Reference Detail" />
        </SelectTrigger>
        <SelectContent>
          {/* {data.map((plan:any) => (
            // <SelectItem key={plan.insuranceId} value={plan.name} onClick={() => handleSelect(plan.insuranceId)} >
            //   {plan.planName}
            // </SelectItem>
            <li
            key={plan.insuranceId}
            className={`p-3 cursor-pointer transition-all rounded-md 
              bg-white hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => setFormData(plan.insuranceId)}
          >
            {plan.planName}
          </li>
          ))} */}
        </SelectContent>
      </Select>
    </div>
        
          <div className="space-y-2">
            <Label>Reference Remark</Label>
            <Input
              value={formData.ReferenceRemark}
              placeholder="Enter Reference Remark"
              onChange={(e) =>
                setFormData({ ...formData, ReferenceRemark: e.target.value })
              }
            />
          </div>
      

          <div className="space-y-2">
            <Label>Customer Name</Label>
            <Input
              value={formData.CustomerName}
              placeholder="Enter Customer Name"
              onChange={(e) =>
                setFormData({ ...formData, CustomerName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>GST No</Label>
            <Input
              value={formData.GSTNo}
              placeholder="Enter GST No"
              onChange={(e) =>
                setFormData({ ...formData, GSTNo: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>PAN No</Label>
            <Input
              value={formData.PANNo}
              placeholder="Enter PAN No"
              onChange={(e) =>
                setFormData({ ...formData, PANNo: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Address Line 1</Label>
            <Input
              value={formData.AddressLine1}
              placeholder="Enter Address Line 1"
              onChange={(e) =>
                setFormData({ ...formData, AddressLine1: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Address Line 2</Label>
            <Input
              value={formData.AddressLine2}
              placeholder="Enter Address Line 2"
              onChange={(e) =>
                setFormData({ ...formData, AddressLine2: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input
              value={formData.Country}
              placeholder="Enter Country"
              onChange={(e) =>
                setFormData({ ...formData, Country: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={formData.City}
              placeholder="Enter City"
              onChange={(e) =>
                setFormData({ ...formData, City: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Area</Label>
            <Input
              value={formData.Area}
              placeholder="Enter Area"
              onChange={(e) =>
                setFormData({ ...formData, Area: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Pincode</Label>
            <Input
              value={formData.Pincode}
              placeholder="Enter Pincode"
              onChange={(e) =>
                setFormData({ ...formData, Pincode: e.target.value })
              }
            />
          </div>
        </div>

        {/* Contact Persons */}
      

        {/* Weightage */}
        <div className="space-y-2">
          <Label>Customer Weightage</Label>
          <Input
            value={formData.CustomerWeightage}
            placeholder="Enter Weightage"
            onChange={(e) =>
              setFormData({ ...formData, CustomerWeightage: e.target.value })
            }
          />
        </div>

        {/* Status */}
        <div className="space-y-2  mt-2">
          <Label>
            <input
              type="checkbox"
              checked={formData.Status}
              onChange={(e) =>
                setFormData({ ...formData, Status: e.target.checked })
              }
            />
            Active
          </Label>
        </div>
      </ScrollArea>
   
    </form>
  );
};

export default ServiceForm;



