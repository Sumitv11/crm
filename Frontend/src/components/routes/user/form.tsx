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
    firstName: defaultValues.firstName || "",
    lastName: defaultValues.lastName || "",
    gender: defaultValues.gender || "",
    contactNo: defaultValues.contactNo || "",
    emailId: defaultValues.emailId || "",
    password: defaultValues.password || "",
    userName: defaultValues.userName || "",
  });

  useEffect(() => {
    setFormData({
      firstName: defaultValues.firstName || "",
      lastName: defaultValues.lastName || "",
      gender: defaultValues.gender || "",
      contactNo: defaultValues.contactNo || "",
      emailId: defaultValues.emailId || "",
      password: defaultValues.password || "",
      userName: defaultValues.userName || "",
    });
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      contactNo: "",
      emailId: "",
      password: "",
      userName: "",
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              required
              value={formData.firstName}
              placeholder="Enter first Name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label>last Name</Label>
            <Input
              required
              value={formData.lastName}
              placeholder="Enter last Name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label>Mobile No</Label>
            <Input
              required
              value={formData.contactNo}
              placeholder="Enter 10 digit Mobile No"
              pattern="^\d{10}$"
              onChange={(e) =>
                setFormData({ ...formData, contactNo: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              required
              value={formData.emailId}
              placeholder="Enter Email"
              onChange={(e) =>
                setFormData({ ...formData, emailId: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>User Name</Label>
            <Input
              required
              value={formData.userName}
              placeholder="Enter User Name"
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              required
              value={formData.password}
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="mr-2"
                checked={formData.gender === "male"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <label htmlFor="male" className="text-sm font-medium">
                Male
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="mr-2"
                checked={formData.gender === "female"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              <label htmlFor="female" className="text-sm font-medium">
                Female
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
