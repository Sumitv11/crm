
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
    code: defaultValues.code || "",
    categoryName: defaultValues.categoryName || "",
    isActive: defaultValues.isActive || false,
  });

  useEffect(() => {
    setFormData({
      code: defaultValues.code || "",
      categoryName: defaultValues.categoryName || "",
      isActive: defaultValues.isActive || false,
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      code: "",
      categoryName: "",
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
              value={formData.code}
              placeholder="Enter Code"
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input
            required
              value={formData.categoryName}
              placeholder="Enter Category Name"
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
        <input type="checkbox" id="status" className="mr-2"  value={formData.isActive}
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
