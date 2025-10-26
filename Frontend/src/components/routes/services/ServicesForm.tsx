"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import * as Yup from "yup";
import toast from "react-hot-toast";
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
import { useFormik } from "formik";
import { useGetUsers } from "../user/hook";
import { ServiceForm } from "./Types";
import { useGetCustomerList } from "../customerlist/hook";
import { useGetInstallationLocations } from "../installation-location/hook";
import {
  useGetServiceById,
  useGetServiceNo,
  useServiceRegister,
  useUpdateService,
} from "./hook";
import { useGetProducts } from "../productlist/hook";
import { useGetMaterials } from "@/components/settingroutes copy/material/hook";
import MaterialRow, { MaterialRowData } from "./MaterialRow";
import { BASE_URL } from "@/serviceApi/serviceApi";
import AttachmentTable from "./AttachmentTable";

const ServicesForm = () => {
  let [id, setId] = React.useState<string | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  // const[services,setServices]=React.useState(null);
  const [materialQuantityList, setMaterialQuantityList] = React.useState([]);

  const navigate = useNavigate();
  const { data: installationLocationData } = useGetInstallationLocations();

  const { data: customerData } = useGetCustomerList();

  const { data: userData } = useGetUsers();

  const { data: productData } = useGetProducts();

  const { data: materialData } = useGetMaterials();

  const { mutate: fetchServiceNo, data: nextServiceNo } = useGetServiceNo();

  const { mutate: getServicesById, data: serviceDataById } =
    useGetServiceById(id);

  const addRegisterMutation = useServiceRegister();
  const UpdateServiceMutation = useUpdateService(id);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  React.useEffect(() => {
    fetchServiceNo();
  }, []);

  React.useEffect(() => {
    if (id) {
      formik.setFieldValue("serviceNo", nextServiceNo?.data);
    } else if (nextServiceNo?.data) {
      formik.setFieldValue("serviceNo", nextServiceNo?.data);
    }
  }, [nextServiceNo]);

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
      getServicesById();
    }
  }, [isInitialized]);

  React.useEffect(() => {
    if (serviceDataById) {
      console.log(serviceDataById?.data);
      // setServices(serviceDataById?.data);
      const serviceDataId = serviceDataById?.data;
      const materialQuantity = serviceDataId?.materialQuantity;
      const uploadedList = serviceDataId?.attachments;

      formik.setFieldValue("materialQuantity", materialQuantity);
      formik.setFieldValue("attachments", uploadedList);
      formik.setFieldValue("serviceDate", serviceDataId?.serviceDate);
      setMaterialQuantityList(materialQuantity);
      setUploadedData(uploadedList);

      formik.setValues({
        ...formik.initialValues,
        ...serviceDataById?.data,
      });
    }
  }, [serviceDataById]);

  const initialValues = {
    serviceNo: "",
    contactPerson: "",
    serviceDate: "",
    client: { id: "", customerName: "" },
    product: { id: "", productName: "" },
    installationLocation: { id: "", installationLocationId: "" },
    problem: "",
    actionTaken: "",
    serviceManager: { user_id: "", firstName: "" },
    serviceProvidedBy: { user_id: "", firstName: "" },
    supportedBy: { user_id: "", firstName: "" },
    natureOfService: { natureOfService: "" },
    natureOfComplaint: { natureOfComplaint: "" },
    materialQuantity: [
      { material: { materialName: "", id: "" }, quantity: "" },
    ],
    attachments: [],
    isApproved: false,
  };
  const validationSchema = Yup.object().shape({
    serviceNo: Yup.string().required("Service number is required"),
    contactPerson: Yup.string().required("Contact person is required"),
    serviceDate: Yup.date().required("Service date is required"),
    client: Yup.object()
      .shape({
        id: Yup.string().required("Client is required."),
        customerName: Yup.string().required("Client is required."),
      })
      .required("Client  is required."),
    product: Yup.object()
      .shape({
        id: Yup.string().required("Product is required."),
        productName: Yup.string().required("Product is required."),
      })
      .required("Product is required."),
    problem: Yup.string().required("Problem description is required"),
    actionTaken: Yup.string().required("Action taken is required"),
    installationLocation: Yup.object()
      .shape({
        installationLocationId: Yup.string().required(
          "InstallationId  is required."
        ),
      })
      .required("InstallationId  is required."),
    serviceManager: Yup.object()
      .shape({
        user_id: Yup.string().required("Manager ID is required."),
        firstName: Yup.string().required("Manager Name is required."),
      })
      .required("Manager is required."),
    serviceProvidedBy: Yup.object()
      .shape({
        user_id: Yup.string().required("Service Provider is required."),
        firstName: Yup.string().required("Service Provider Name is required."),
      })
      .required("Service Provider is required."),
    supportedBy: Yup.object()
      .shape({
        user_id: Yup.string().required("Support Person is required."),
        firstName: Yup.string().required("Support Person Name is required."),
      })
      .required("Support Person is required."),
    natureOfService: Yup.object()
      .shape({
        // id: Yup.number().required("Nature of service ID is required"),
        natureOfService: Yup.string().required("Nature of service is required"),
      })
      .required("Nature of service is required"),
    natureOfComplaint: Yup.object()
      .shape({
        // id: Yup.number().required("Nature of complaint ID is required"),
        natureOfComplaint: Yup.string().required(
          "Nature of complaint is required"
        ),
      })
      .required("Nature of complaint is required"),
    // materialQuantity: Yup.array().of(
    //   Yup.object().shape({
    //     materialName: Yup.string().required("Material name is required"),
    //     quantity: Yup.number()
    //       .required("Quantity is required")
    //       .positive("Must be positive"),
    //   })
    // ),
  });

  const formik = useFormik<ServiceForm>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        UpdateServiceMutation.mutate(values, {
          onSuccess: () => {
            // refetch(); // Refetch data after a successful update
            navigate("/app/services");
          },
        });
        id = null;
      } else {
        console.log("Form submitted:", values);
        addRegisterMutation.mutate(values, {
          onSuccess: () => {
            // refetch();
            navigate("/app/services");
          },
        });
      }
    },
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const [uploadedData, setUploadedData] = React.useState<any[]>([]);

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
      const response = await fetch(`${BASE_URL}/api/services/uploadFile`, {
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

  const remove = (id: any) => {
    const updatedAttachment = uploadedData.filter((row) => row.id !== id);
    setUploadedData(updatedAttachment);
    console.log();

    formik.setFieldValue("attachments", updatedAttachment);
  };

  const handleRowsChange = (rows: MaterialRowData[]) => {
    console.log("Updated Rows:", rows);
    formik.setFieldValue("materialQuantity", rows);
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

  const handleCancel = () => {
    navigate("/app/services");
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("action handle submit");
    formik.handleSubmit();
    console.log("Formik Errors:", formik.errors);
    console.log("Formik Touched:", formik.touched);
  };

  return (
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
        <form onSubmit={handleSubmit} className="grid gap-4">
          <h1 className="text-xl font-bold mb-4">Service Form</h1>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-6">
            <div>
              <label className="block font-medium">Services No</label>
              <input
                type="text"
                className="w-full border rounded-md px-2 py-1 bg-transparent"
                disabled
                name="serviceNo"
                value={formik.values.serviceNo || ""}
              />
              {formik.touched.serviceNo && formik.errors.serviceNo && (
                <p className="text-red-500 text-sm">
                  {formik.errors.serviceNo}
                </p>
              )}
            </div>

            <div>
              <Label>ServiceDate</Label>
              <Input
                type="date"
                name="serviceDate"
                className="w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.serviceDate}
              />

              {formik.touched.serviceDate && formik.errors.serviceDate && (
                <p className="text-red-500 text-sm">
                  {formik.errors.serviceDate}
                </p>
              )}
            </div>

            <div>
              <Label>Client</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.client?.customerName || "Select Option..."}
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
                              formik.setFieldValue("client", customer)
                            }
                          >
                            {customer?.customerName}
                            <Check
                              className={
                                formik.values.client?.id === customer.id
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
              {formik.touched.client && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.client?.customerName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.client?.customerName}
                    </p>
                  )}
                </>
              )}
            </div>

            <div>
              <Label>Contact Person</Label>
              <Input
                type="text"
                name="contactPerson"
                className="w-full"
                placeholder="Enter Contact Person"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactPerson}
              />
              {formik.touched.contactPerson && (
                <p className="text-red-500 text-sm">
                  {formik.errors.contactPerson}
                </p>
              )}
            </div>

            <div>
              <Label>Service Provided By</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.serviceProvidedBy?.firstName ||
                      "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Inch..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {userData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.user_id}
                            value={client.firstName}
                            onSelect={() =>
                              formik.setFieldValue("serviceProvidedBy", client)
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.serviceProvidedBy?.user_id ===
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
              {formik.touched.serviceProvidedBy && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.serviceProvidedBy?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.serviceProvidedBy?.firstName}
                    </p>
                  )}
                </>
              )}
            </div>

            <div>
              <Label>Supported By</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.supportedBy?.firstName || "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Inch..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {userData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.user_id}
                            value={client.firstName}
                            onSelect={() =>
                              formik.setFieldValue("supportedBy", client)
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.supportedBy?.user_id ===
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
              {formik.touched.supportedBy && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.supportedBy?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.supportedBy?.firstName}
                    </p>
                  )}
                </>
              )}
            </div>

            <div>
              <Label>Service Manager</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.serviceManager?.firstName ||
                      "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Inch..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {userData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.user_id}
                            value={client.firstName}
                            onSelect={() =>
                              formik.setFieldValue("serviceManager", client)
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.serviceManager?.user_id ===
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
              {formik.touched.serviceManager && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.serviceManager?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.serviceManager?.firstName}
                    </p>
                  )}
                </>
              )}
            </div>

            <div>
              <Label>Nature Of Service</Label>
              <Input
                type="text"
                name="natureOfService.natureOfService"
                className="w-full"
                placeholder="Enter Nature Of Service"
                value={formik.values.natureOfService.natureOfService}
                onChange={formik.handleChange}
              />
              {formik.touched.natureOfService &&
                typeof formik.errors.natureOfService && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.natureOfService?.natureOfService}
                  </p>
                )}
            </div>
            <div>
              <Label>Nature Of Complaint</Label>
              <Input
                type="text"
                name="natureOfComplaint.natureOfComplaint"
                className="w-full"
                placeholder="Enter Nature Of Complaint"
                value={formik.values.natureOfComplaint.natureOfComplaint}
                onChange={formik.handleChange}
              />
              {formik.touched.natureOfComplaint &&
                typeof formik.errors.natureOfComplaint && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.natureOfComplaint?.natureOfComplaint}
                  </p>
                )}
            </div>

            {/* Popover-based selection for Item ID */}
            <div>
              <Label>Item </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.product?.productName || "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Opti..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {productData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.id}
                            value={client?.id}
                            onSelect={() =>
                              formik.setFieldValue("product", client)
                            }
                          >
                            {client?.productName}
                            <Check
                              className={
                                formik.values.product?.productName === client.id
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
              {formik.touched.product && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.product?.productName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.product?.productName}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Popover-based selection for Installation ID */}
            <div>
              <Label>Installation ID</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.installationLocation
                      ?.installationLocationId || "Select Option..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Opti..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {installationLocationData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.id}
                            value={client?.installationLocationId}
                            onSelect={() =>
                              formik.setFieldValue(
                                "installationLocation",
                                client
                              )
                            }
                          >
                            {client?.installationLocationId}
                            <Check
                              className={
                                formik.values.installationLocation
                                  ?.installationLocationId === client.id
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
              {formik.touched.installationLocation && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.installationLocation
                    ?.installationLocationId && (
                    <p className="text-red-500 text-sm">
                      {
                        formik.errors.installationLocation
                          ?.installationLocationId
                      }
                      {formik.errors.installationLocation?.id}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <MaterialRow
            materialQuantities={materialQuantityList}
            materials={materialData?.data}
            onRowsChange={handleRowsChange}
          />
          <div>
            <Label>Problem</Label>
            <textarea
              className="w-full p-2 bg-transparent border rounded-md"
              name="problem"
              placeholder="Enter Problem"
              value={formik.values.problem}
              onChange={formik.handleChange}
            />
            {formik.touched.problem && formik.errors.problem && (
              <p className="text-red-500 text-sm">{formik.errors.problem}</p>
            )}
          </div>
          <div>
            <Label>Action Taken</Label>
            <textarea
              className="w-full p-2 bg-transparent border rounded-md"
              name="actionTaken"
              placeholder="Enter ActionTaken"
              value={formik.values.actionTaken}
              onChange={formik.handleChange}
            />
            {formik.touched.actionTaken && formik.errors.actionTaken && (
              <p className="text-red-500 text-sm">
                {formik.errors.actionTaken}
              </p>
            )}
          </div>

          {/* Uploading file */}
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
              className="h-[35px] text-sm px-10 py-2 rounded-md"
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
                render: (item) => item.docType?.docType,
              },
              {
                key: "actions",
                label: "Actions",
                render: (item) => (
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
                name="isApproved"
                className="mr-2"
                checked={formik.values.isApproved}
                onChange={formik.handleChange}
              />
              <label htmlFor="status" className="text-sm font-medium">
                {" "}
                Is Aprroved{" "}
              </label>
            </div>
            <Button
              className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button type="submit">{!id ? "Create" : "Update"}</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ServicesForm;
