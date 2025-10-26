import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetSourceReference } from "../source-of-reference/hook";

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
    referenceDetail: defaultValues.referenceDetail || "",
    sourceReference: defaultValues.sourceReference || null,
    isActive: defaultValues.isActive || false,
  });

  const { data: rowData, isError, isLoading } = useGetSourceReference();

  // Directly use `rowData` to populate the dropdown
  const sourceReferenceOptions = rowData?.data || [];
  console.log(sourceReferenceOptions);

  useEffect(() => {
    setFormData({
      referenceDetail: defaultValues.referenceDetail || "",
      sourceReference: defaultValues.sourceReference || null,
      isActive: defaultValues.isActive || false,
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onSubmit(formData); 
    setFormData({
      referenceDetail: "",
      sourceReference: null,
      isActive: false,
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Reference Detail</Label>
            <Input
            required
              value={formData.referenceDetail}
              placeholder="Enter Reference Detail"
              onChange={(e) =>
                setFormData({ ...formData, referenceDetail: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Source of Reference</Label>
            <select
            required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              value={formData.sourceReference?.id || ""}
              onChange={(e) => {
                const selectedObject = sourceReferenceOptions?.find(
                  (item: any) => String(item.id) === e.target.value
                );
                setFormData({ ...formData, sourceReference: selectedObject || null });
              }}
              disabled={isLoading || isError}
            >
              <option value="">-- Select Source of Reference --</option>
              {sourceReferenceOptions?.map((option: any) => (
                <option key={option.id} value={option.id}>
                  {option.sourceReference}
                </option>
              ))}
            </select>
            {isError && <p className="text-red-500">Failed to load options</p>}
          </div>


          <div className="flex items-center">
            <input
              type="checkbox"
              id="status"
              className="mr-2"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
            />
            <label htmlFor="status" className="text-sm font-medium">
              Is Active
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServiceForm;
