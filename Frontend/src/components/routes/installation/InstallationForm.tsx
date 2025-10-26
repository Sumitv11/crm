"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InstallationStatus } from "./type";
import { useGetProducts } from "../productlist/hook";
import InstallationProductRow from "./InstallationProduct";
import { BASE_URL } from "@/serviceApi/serviceApi";
import AttachmentTable from "../services/AttachmentTable";
import { useGetCustomerList } from "../customerlist/hook";
import { useFormik } from "formik";
import { useGetInstallationLocations } from "../installation-location/hook";
import { useGetUsers } from "../user/hook";
import {
  useGetInstallationById,
  useGetNextInstallationNo,
  useInstallationRegister,
  useUpdateInstallation,
} from "./hook";

const InstallationForm = () => {
  let [id, setId] = React.useState<string | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const navigate = useNavigate();
  const installationStatus = Object.values(InstallationStatus);
  const [installationProductList, setInstallationProductList] = React.useState(
    []
  );
  const { data: productData } = useGetProducts();

  const { data: customerData } = useGetCustomerList();
  const { data: installationLocData } = useGetInstallationLocations();
  const { data: userData } = useGetUsers();
  const { mutate: fetchInstallationNo, data: nextInstallationNo } =
    useGetNextInstallationNo();
  const addRegisterMutation = useInstallationRegister();
  const UpdateServiceMutation = useUpdateInstallation(id);

  const { mutate: getInstallationById, data: installationDataById } =
    useGetInstallationById(id);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  // setId(null);
  // setInstallationProductList([]);

  React.useEffect(() => {
    fetchInstallationNo();
  }, []);

  React.useEffect(() => {
    if (id == null) {
      formik.setFieldValue("installationReportNo", nextInstallationNo?.data);
    }
  }, [nextInstallationNo, id]);

  React.useEffect(() => {
    let queryId = queryParams.get("id");
    console.log("idaaa", queryId);
    setId(queryId);
    console.log("ida=", id);
    if (queryId) {
      setIsInitialized(true);
    }
  }, [queryParams]);

  React.useEffect(() => {
    if (isInitialized) {
      getInstallationById();
    }
  }, [isInitialized]);

  React.useEffect(() => {
    if (installationDataById) {
      console.log(installationDataById?.data);
      // // setServices(serviceDataById?.data);
      const installationDataId = installationDataById?.data;
      const productQuantity = installationDataId?.installationProduct;
      const uploadedList = installationDataId?.attachments;

      formik.setFieldValue("installationProduct", productQuantity);
      formik.setFieldValue("attachments", uploadedList);
      formik.setFieldValue(
        "installationReportNo",
        installationDataId?.installationReportNo
      );
      setInstallationProductList(productQuantity);
      setUploadedData(uploadedList);

      formik.setValues({
        ...formik.initialValues,
        ...installationDataById?.data,
      });
    }
  }, [installationDataById]);

  const initialValues = {
    installationReportNo: "",
    installationDate: "",
    customer: { id: "", customerName: "" },
    installationLocations: [],
    installationStatus: "",
    installationVerifiedBy: { user_id: "", firstName: "" },
    installationDoneBy: { user_id: "", firstName: "" },
    installationRemark: "",
    poId: "",
    installationProduct: [
      { product: { productName: "", id: "" }, quantity: "" },
    ],
    attachments: [],
    isAgainstPo: false,
    isExtraActivitiesCarriedOut: false,
  };

  const validationSchema = Yup.object().shape({
    installationReportNo: Yup.string().required("Service number is required"),
    installationDate: Yup.date().required("Service date is required"),
    installationRemark: Yup.string().required("Remark is required"),
    installationStatus: Yup.string().required("Status is required"),
    poId: Yup.string().required("Order Id is required"),
    customer: Yup.object()
      .shape({
        id: Yup.string().required("Client is required."),
        customerName: Yup.string().required("Client is required."),
      })
      .required("Client  is required."),
    // product: Yup.object()
    //   .shape({
    //     id: Yup.string().required("Product is required."),
    //     productName: Yup.string().required("Product is required."),
    //   })
    //   .required("Product is required."),
    // installationLocation: Yup.array()
    //   .min(1, "At least one location is required.") // Ensures at least one location
    //   .of(
    //     Yup.object().shape({
    //       id: Yup.string().required("Location ID is required."),
    //       installationLocationId: Yup.string().required(
    //         "Installation Location ID is required."
    //       ),
    //     })
    //   )
    //   .required("Installation Location is required."),

    installationDoneBy: Yup.object()
      .shape({
        user_id: Yup.string().required("User ID is required."),
        firstName: Yup.string().required("User Name is required."),
      })
      .required("User is required."),

    installationVerifiedBy: Yup.object()
      .shape({
        user_id: Yup.string().required("User Verifier is required."),
        firstName: Yup.string().required("User Verifier Name is required."),
      })
      .required("User Verifier is required."),

    // installationProduct: Yup.array()
    // .of(
    //   Yup.object({
    //     productName: Yup.string().required("Product is required"),
    //     quantity: Yup.number()
    //       .typeError("Quantity must be a number")
    //       .required("Quantity is required")
    //       .positive("Must be positive"),
    //   })
    // )
    // .test(
    //   "product-required-if-row-exists",
    //   "Product must be selected if a row exists",
    //   (value) => !value?.length || value.every((item) => !!item.productName)
    // ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        console.log("update", values);
        UpdateServiceMutation.mutate(values, {
          onSuccess: () => {
            navigate("/app/installation");
          },
        });
        id = null;
      } else {
        console.log("Form submitted:", values);
        addRegisterMutation.mutate(values, {
          onSuccess: () => {
            // refetch();
            navigate("/app/installation");
          },
        });
      }
    },
  });

  React.useEffect(() => {
    console.log("instllation", formik.values.installationLocations);
  }, [formik.values.installationLocations]);

  const handleRowsChange = (
    rows: {
      id: number;
      product: {
        id: string | number;
        productName: string;
      };
      quantity: number;
    }[]
  ) => {
    console.log("Updated Rows:", rows);
    formik.setFieldValue("installationProduct", rows);
    // formik.setFieldValue(`installationProduct[${index}].productName`, selectedProduct);

    // formik.validateField("installationProduct");
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    console.log("upload successful");

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${BASE_URL}/api/installation/uploadFile`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("File uploaded successfully.");

        const updatedAttachments = [
          ...(formik.values.attachments || []),
          data?.data,
        ];

        setUploadedData(updatedAttachments);
        formik.setFieldValue("attachments", updatedAttachments);

        console.log("Updated Formik Attachments:", formik.values.attachments);
        console.log("Updated local uploadedData:", uploadedData);
      } else {
        const errorData = await response.json();
        toast.error(`Upload failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleLinkClick = async (event: any, location: any) => {
    event.preventDefault();

    try {
      const url = `${BASE_URL}/api/resources/serveFile?filePath=${encodeURIComponent(
        location
      )}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        window.open(objectUrl, "_blank");

        setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
      } else {
        toast.error("API Error: " + response.statusText);
      }
    } catch (error: any) {
      toast.error("Fetch Error: " + error.message);
    }
  };

  const [uploadedData, setUploadedData] = React.useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const remove = (id: any) => {
    const updatedAttachment = uploadedData.filter((row) => row.id !== id);
    setUploadedData(updatedAttachment);
    console.log("");

    formik.setFieldValue("attachments", updatedAttachment);
  };
  const handleCancel = () => {
    navigate("/app/installation");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("action handle submit");
    formik.handleSubmit();
    console.log(formik.errors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="max-w-5xl mx-auto border p-4 sm:p-6 shadow-md rounded-md"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-xl font-bold mb-4">Installation Form</h1>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-6">
            <div>
              <Label>Installation Date</Label>
              <Input
                type="date"
                className="w-full"
                name="installationDate"
                onChange={formik.handleChange}
                value={formik.values.installationDate}
              />
              {formik.touched.installationDate &&
                formik.errors.installationDate && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.installationDate}
                  </p>
                )}
            </div>

            <div>
              <Label>Installation Report No</Label>
              <Input
                type="text"
                className="w-full"
                placeholder="Enter Report No"
                name="installationReportNo"
                readOnly
                value={formik.values.installationReportNo}
              />
              {formik.touched.installationReportNo &&
                typeof formik.errors.installationReportNo && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.installationReportNo}
                  </p>
                )}
            </div>

            <div>
              <Label>Customer</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.customer?.customerName || "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Inch..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {customerData?.data?.map((customer: any) => (
                          <CommandItem
                            key={customer.id}
                            value={customer?.customerName}
                            onSelect={() =>
                              formik.setFieldValue("customer", customer)
                            }
                          >
                            {customer?.customerName}
                            <Check
                              className={
                                formik.values.customer?.id === customer.id
                                  ? "ml-auto opacity-100"
                                  : "ml-auto opacity-0"
                              }
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {formik.touched.customer && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                              <p className="text-red-500 text-sm">
                                {formik.errors.storeInChargeId.user_id}
                              </p>
                            )} */}
                  {formik.errors.customer?.customerName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.customer?.customerName}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* <div> */}
            {/* <Label>Installation Locations</Label> */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-700">
                Installation Locations
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-transparent">
                    {formik.values.installationLocations?.length > 0
                      ? formik.values.installationLocations
                          .map((loc: any) => loc.installationLocationId)
                          .join(" , ")
                      : "Select Locations..."}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Installation Locations</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {installationLocData?.data?.map((location: any) => {
                    // Ensure installationLocation is always an array
                    const selectedLocations = Array.isArray(
                      formik.values.installationLocations
                    )
                      ? formik.values.installationLocations
                      : [];

                    // Check if the location is already selected
                    const isSelected = selectedLocations.some(
                      (loc: any) => loc.id === location.id
                    );

                    // Handle selection toggle
                    const handleToggleLocation = () => {
                      const updatedLocations = isSelected
                        ? selectedLocations.filter(
                            (loc: any) => loc.id !== location.id
                          )
                        : [...selectedLocations, location];

                      formik.setFieldValue(
                        "installationLocations",
                        updatedLocations
                      );
                    };

                    return (
                      <DropdownMenuCheckboxItem
                        key={location.id}
                        checked={isSelected}
                        onCheckedChange={handleToggleLocation}
                      >
                        {location.installationLocationId}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* </div> */}

            <div>
              <Label>Installation Verified By</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.installationVerifiedBy?.firstName ||
                      "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Name..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {userData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.user_id}
                            value={client.firstName}
                            onSelect={() =>
                              formik.setFieldValue(
                                "installationVerifiedBy",
                                client
                              )
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.installationVerifiedBy
                                  ?.user_id === client.user_id
                                  ? "ml-auto opacity-100"
                                  : "ml-auto opacity-0"
                              }
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {formik.touched.installationVerifiedBy && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                              <p className="text-red-500 text-sm">
                                {formik.errors.storeInChargeId.user_id}
                              </p>
                            )} */}
                  {formik.errors.installationVerifiedBy?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.installationVerifiedBy?.firstName}
                    </p>
                  )}
                </>
              )}
            </div>

            <div>
              <Label>Installation Done By</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.installationDoneBy?.firstName ||
                      "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Name..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {userData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.user_id}
                            value={client.firstName}
                            onSelect={() =>
                              formik.setFieldValue("installationDoneBy", client)
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.installationDoneBy?.user_id ===
                                client.user_id
                                  ? "ml-auto opacity-100"
                                  : "ml-auto opacity-0"
                              }
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {formik.touched.installationDoneBy && (
                <>
                  {formik.errors.installationDoneBy?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.installationDoneBy?.firstName}
                    </p>
                  )}
                </>
              )}
            </div>

            <div>
              <Label>Installation Status</Label>
              <Select
                onValueChange={(value) => {
                  formik.setFieldValue("installationStatus", value);
                }}
                value={formik.values?.installationStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {installationStatus.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.installationStatus &&
                formik.errors.installationStatus && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.installationStatus}
                  </div>
                )}
            </div>

            <div>
              <Label>Installation Remarks</Label>
              <Input
                type="text"
                className="w-full"
                onChange={formik.handleChange}
                value={formik.values.installationRemark}
                name="installationRemark"
                placeholder="Enter Installation Remarks"
              />
              {formik.touched.installationRemark &&
                formik.errors.installationRemark && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.installationRemark}
                  </p>
                )}
            </div>

            <div>
              <Label>PO Id</Label>
              <Input
                type="text"
                className="w-full"
                placeholder="Enter PO ID"
                value={formik.values.poId}
                onChange={formik.handleChange}
                name="poId"
              />
              {formik.touched.poId && formik.errors.poId && (
                <p className="text-red-500 text-sm">{formik.errors.poId}</p>
              )}
            </div>
          </div>
          {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-6"> */}
          <InstallationProductRow
            installationProductQuantities={id ? installationProductList : []}
            products={productData?.data}
            onRowsChange={handleRowsChange}
          />
          {/* {formik.touched.installationLocation && formik.errors.installationLocation && (
  <p className="text-red-500 text-sm">
    {Array.isArray(formik.errors.installationLocation)
      ? formik.errors.installationLocation[0]?.installationLocationId. // Show error for the first location if present
      : formik.errors.installationLocation}
  </p>
)} */}

          {/* File uploading */}
          <div>
            <div>
              <label className="block font-medium">Upload Files</label>
              <input
                type="file"
                className="flex-1 p-2 text-xs border-none outline-none"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>
            {uploading && (
              <div className="mb-4">
                <p>Uploading...</p>
                <progress
                  value={progress}
                  max="100"
                  className="w-full"
                ></progress>
              </div>
            )}
            <Button
              onClick={handleFileUpload}
              disabled={uploading}
              className="h-[35px] text-sm px-10 py-2 rounded-md mt-2 mb-4"
            >
              {" "}
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>

          <AttachmentTable
            columns={[
              {
                key: "index",
                label: "Sr.No",
                render: (_, index: any) => index + 1,
              },
              {
                key: "location",
                label: "File Name",
                render: (item) => (
                  <a
                    href={item.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline"
                    onClick={(e) =>
                      handleLinkClick && handleLinkClick(e, item.location)
                    }
                  >
                    {item.location}
                  </a>
                ),
              },
              {
                key: "docType",
                label: "Doctype",
                render: (item: any) => item.docType?.docType,
              },
              {
                key: "actions",
                label: "Actions",
                render: (item: any) => (
                  <button
                    className="text-red-500"
                    onClick={() => remove && remove(item.id)}
                  >
                    Remove
                  </button>
                ),
              },
            ]}
            data={uploadedData}
          />

          <div className="flex justify-end space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                name="isExtraActivitiesCarriedOut"
                className="mr-2"
                checked={formik.values.isExtraActivitiesCarriedOut}
                onChange={formik.handleChange}
              />
              <label htmlFor="status" className="text-sm font-medium">
                {" "}
                Is Extra Activities Carried Out{" "}
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                name="isAgainstPo"
                className="mr-2"
                checked={formik.values.isAgainstPo}
                onChange={() =>
                  formik.setFieldValue(
                    "isAgainstPo",
                    !formik.values.isAgainstPo
                  )
                } // Manually toggle the value
              />
              <label htmlFor="status" className="text-sm font-medium">
                Is Against Po{" "}
              </label>
            </div>
            <Button
              // className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md"
              type="button"
              variant={"secondary"}
              onClick={handleCancel}
            >
              {" "}
              Cancel
            </Button>

            <Button type="submit">{!id ? "Create" : "Update"}</Button>
          </div>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default InstallationForm;
