
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RequiredLabel } from "./RequiredLabel";

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
    brandName: defaultValues.brandName || "",
  });

  useEffect(() => {
    setFormData({
      brandName: defaultValues.brandName || "",
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      brandName: "",
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
        
          <div className="space-y-2">
            <Label>Brand Name</Label>
            <RequiredLabel text="Required" />
            <Input
            required
              value={formData.brandName}
              placeholder="Enter Brand Name"
              onChange={(e) =>
                setFormData({ ...formData, brandName: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
