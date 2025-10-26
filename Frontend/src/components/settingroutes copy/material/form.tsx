import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUnitMeasurements } from "../unit-of-measurements/hook";

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
  const { data: unitData } = useGetUnitMeasurements();

  const formik = useFormik({
    initialValues: {
      materialName: defaultValues.materialName || "",
      materialQuantityUOM: defaultValues.materialQuantityUOM || null,
    },
    validationSchema: Yup.object({
      materialName: Yup.string().required("Material Name is required"),
      materialQuantityUOM: Yup.object()
        .nullable()
        .required("Unit Measurement is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      console.log("value", values);
    },
  });

  return (
    <form id={formId} onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Material Name */}
          <div className="space-y-2">
            <Label>Material Name</Label>
            <Input
              type="text"
              name="materialName"
              placeholder="Enter Material Name"
              value={formik.values.materialName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {typeof formik.touched.materialName &&
              typeof formik.errors.materialName === "string" && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.materialName}
                </div>
              )}
          </div>

          {/* Unit Measurement */}
          <div>
            <Label>Unit Measurement</Label>
            <Select
              onValueChange={(value) => {
                const selectedUOM = unitData?.data.find(
                  (unit: any) => unit.id == value
                );
                formik.setFieldValue("materialQuantityUOM", selectedUOM);
              }}
              value={formik.values.materialQuantityUOM?.id || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {unitData?.data.map((unit: any) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.uom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formik.touched.materialQuantityUOM &&
              typeof formik.errors.materialQuantityUOM === "string" && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.materialQuantityUOM}
                </div>
              )}
          </div>

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default Form;
