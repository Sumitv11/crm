
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddUserDialogProps {
  formId: string;
  onSubmit: (formData: any) => void;
  defaultValues?: any;
}

const Form: React.FC<AddUserDialogProps> = ({
  onSubmit,
  formId,
  defaultValues = {},
}) => {
  const [formData, setFormData] = useState({
    typeCode: defaultValues.typeCode || "",
    typeName: defaultValues.typeName || "",
    isActive: defaultValues.isActive || false,
  });

  useEffect(() => {
    setFormData({
      typeCode: defaultValues.typeCode || "",
    typeName: defaultValues.typeName || "",
    isActive: defaultValues.isActive || false,
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      typeCode: "",
      typeName: "",
      isActive: false,
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
            <Label>Code</Label>
            <Input
            required
              value={formData.typeCode}
              placeholder="Enter Code"
              onChange={(e) =>
                setFormData({ ...formData, typeCode: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Item Type</Label>
            <Input
            required
              value={formData.typeName}
              placeholder="Enter Item Type"
              onChange={(e) =>
                setFormData({ ...formData, typeName: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
        <input type="checkbox" id="status" className="mr-2" value={formData.isActive}
         checked={formData.isActive}  onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              } />
        <label htmlFor="status" className="text-sm font-medium">
        Is Active
        </label>
      </div>
      
         
         
        </div>
      </div>
    </form>
  );
};

export default Form;
