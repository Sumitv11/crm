
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
    symbol: defaultValues.symbol || "",
    uom: defaultValues.uom || "",
    isActive: defaultValues.status || false,
  });

  useEffect(() => {
    setFormData({
      symbol: defaultValues.symbol || "",
      uom: defaultValues.uom || "",
      isActive: defaultValues.status || false,
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      symbol: "",
      uom: "",
      isActive: "",
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Symbol</Label>
            <Input
            required
              value={formData.symbol}
              placeholder="Enter Symbol"
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Unit Of Measurements</Label>
            <Input
            required
              value={formData.uom}
              placeholder="Enter Unit Of Measurements"
              onChange={(e) =>
                setFormData({ ...formData, uom: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
        <input type="checkbox" id="status" className="mr-2"  value={formData.isActive}  onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.value })
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
