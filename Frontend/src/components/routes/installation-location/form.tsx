
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
    installationLocationId: defaultValues.installationLocationId || '',
    locationDescription: defaultValues.LocationDescription || "",
    isActive: defaultValues.isActive || false,
  });

  useEffect(() => {
    setFormData({
      installationLocationId: defaultValues.installationLocationId || '',
      locationDescription: defaultValues.LocationDescription || "",
      isActive: defaultValues.isActive || false,
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      installationLocationId: '',
      locationDescription: "",
      isActive: false,
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
            <Label>InstallationLocationId</Label>
            <Input
              value={formData.installationLocationId}
              placeholder="Enter Code"
              onChange={(e) =>
                setFormData({ ...formData, installationLocationId: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Location Description</Label>
            <Input
              value={formData.locationDescription}
              placeholder="Enter Category Name"
              onChange={(e) =>
                setFormData({ ...formData, locationDescription: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
        <input type="checkbox" id="status" className="mr-2"  checked={formData.isActive}  
        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })
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
