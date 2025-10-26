import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  useGetSales,
  useGetSalesInvoiceNo,
  useSalesRegister,
  useUpdateSales,
} from "./hook";
import { Company, JobType, ProductType, ProjectType, Reference } from "./Types";
import { useGetCustomerList } from "../customerlist/hook";
import { useGetUsers } from "../user/hook";
// import { useGetProducts, useGetProductsByType } from "../productlist/hook";
import ProductRow from "./ProductRow";
import { BASE_URL } from "@/serviceApi/serviceApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetOrderTypes } from "@/components/settingroutes copy/order-type/hook";
import { useGetProductsByType } from "../productlist/hook";
import { Textarea } from "@/components/ui/textarea";

const CreateForm = () => {
  let [id, setId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [salesProductQuantities, setSalesProductQuantities] = useState([]);

  const { data: salesData, refetch } = useGetSales();
  const [productType, setProductType] = useState("");
  const { data: customerData } = useGetCustomerList();
  const { data: userData } = useGetUsers();
  const { data: orderTypeData } = useGetOrderTypes();
  const { data: productTypeData } = useGetProductsByType(productType);
  const addRegisterMutation = useSalesRegister();
  const UpdateServiceMutation = useUpdateSales(id);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const productTypes = Object.values(ProductType);
  const jobTypes = Object.values(JobType);
  const references = Object.values(Reference);
  const companies = Object.values(Company);
  const projectType = Object.values(ProjectType);

  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalNetAmount, setTotalNetAmount] = useState(0);
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  const { mutate: fetchInvoiceNo, data: nextInvoiceNo } =
    useGetSalesInvoiceNo();

  useEffect(() => {
    fetchInvoiceNo();
  }, []);

  const handleCancel = () => {
    navigate("/app/sales");
  };

  const removeItem = (id: any) => {
    const updatedSalesAttachment = uploadedData.filter((row) => row.id !== id);
    setUploadedData(updatedSalesAttachment);

    formik.setFieldValue("salesAttachments", updatedSalesAttachment);
  };

  const calculateTotals = (data: any) => {
    const totalAmount = data.reduce(
      (sum: number, item: { mrp: number; quantity: number }) =>
        sum + item.mrp * item.quantity,
      0
    );
    setTotal(totalAmount);

    const discount = 5;
    const discountedPrice = totalAmount - (totalAmount * discount) / 100;

    const totalGST = data.reduce((sum: number, item: { gst: number }) => {
      const gstAmount = (discountedPrice * item.gst) / 100;
      return sum + gstAmount;
    }, 0);
    setGst(totalGST);

    const totalNetAmount = totalAmount + totalGST;
    setTotalNetAmount(totalNetAmount);
  };

  const [selectedSale, setSelectedSale] = useState({ id: "", inVoiceNo: "" });

  useEffect(() => {
    let queryId = queryParams.get("id");
    setId(queryId);

    if (queryId && salesData && !isInitialized) {
      const sales = salesData?.data.find((item: any) => {
        return item.id.toString() === queryId;
      });
      if (sales) {
        setSelectedSale(sales);
        setSalesProductQuantities(sales?.salesProductQuantities);
        setUploadedData(sales?.salesAttachments);
        calculateTotals(sales?.salesProductQuantities);
        formik.setValues({
          ...formik.initialValues,
          ...sales,
        });
        // isInitialized = true;
        setIsInitialized(true);
      }
      console.log(sales);
    }
  }, [salesData, queryParams, salesProductQuantities]);

  const formik = useFormik({
    initialValues: {
      inVoiceNo: "",
      orderType: { id: "", name: "" },
      jobType: "",
      customer: {
        id: "",
        customerName: "",
        address1: "",
        contactNumber: "",
        contactPerson: "",
        email: "",
      },
      contactPerson: "",
      email: "",
      contactNumber: "",
      poNo: "",
      company: "",
      reference: "",
      billingAddress: "",
      deliveryAddress: "",
      salesOrderDate: "",
      purchaseOrderDate: "",
      orderPreparedBy: { user_id: "", firstName: "" },
      orderVerifiedBy: { user_id: "", firstName: "" },
      salesPerson: { user_id: "", firstName: "" },
      projectEngineer: { user_id: "", firstName: "" },
      projectType: "",
      warrantyPeriod: "",
      termsAndCondition: "",
      salesAttachments: [],
      salesProductQuantities: [],
      productType: "",
    },
    validationSchema: Yup.object({
      orderType: Yup.object().shape({
        id: Yup.string().required("Order Type is required"),
        name: Yup.string().required("Order Type  is required"),
      }),
      productType: Yup.string().required("Product Type is required"),
      jobType: Yup.string().required("Job Type is required"),
      projectType: Yup.string().required("Job Type is required"),

      customer: Yup.object().shape({
        id: Yup.string().required("Customer is required"),
        customerName: Yup.string().required("Customer  is required"),
      }),

      email: Yup.string().email("Invalid email").required("Email is required"),
      contactNumber: Yup.string()
        .required("Contact Number is required")
        .matches(/^\d+$/, "Contact Number must be a valid number"),
      poNo: Yup.string().required("Purchase order no. is required"),
      billingAddress: Yup.string().required("Billing Address is required"),
      deliveryAddress: Yup.string().required("Delivery Address is required"),
      salesOrderDate: Yup.date().required("Sales Order Date is required"),
      purchaseOrderDate: Yup.date().required("Purchase Order Date is required"),

      orderPreparedBy: Yup.object().shape({
        user_id: Yup.string().required("Person detail is required"),
        firstName: Yup.string().required("Person detail  is required"),
      }),
      orderVerifiedBy: Yup.object().shape({
        user_id: Yup.string().required("Person detail is required"),
        firstName: Yup.string().required("Person detail  is required"),
      }),
      salesPerson: Yup.object().shape({
        user_id: Yup.string().required("Person detail is required"),
        firstName: Yup.string().required("Person detail  is required"),
      }),
      projectEngineer: Yup.object().shape({
        user_id: Yup.string().required("Person detail is required"),
        firstName: Yup.string().required("Person detail  is required"),
      }),

      warrantyPeriod: Yup.string().required("Warranty Period is required"),
      termsAndCondition: Yup.string().required(
        "Terms & conditions is required"
      ),
      contactPerson: Yup.string().required("Contact Person is required"),
      company: Yup.string().required("Company Name is required"),
      reference: Yup.string().required("Reference is required"),
    }),
    onSubmit: (values) => {
      if (id) {
        UpdateServiceMutation.mutate(values, {
          onSuccess: () => {
            refetch(); // Refetch data after a successful update
            navigate("/app/sales");
          },
        });
        id = null;
      } else {
        console.log("Form submitted:", values);
        addRegisterMutation.mutate(values, {
          onSuccess: () => {
            refetch();
            navigate("/app/sales");
          },
        });
      }
    },
  });

  useEffect(() => {
    console.log("productType");
    if (formik.values.productType) {
      setProductType(formik.values.productType);
    }
  }, [formik.values.productType]);

  useEffect(() => {
    if (id) {
      formik.setFieldValue("inVoiceNo", selectedSale.inVoiceNo);
      console.log("invoice", selectedSale.inVoiceNo);
    } else if (nextInvoiceNo?.data) {
      formik.setFieldValue("inVoiceNo", nextInvoiceNo.data);
    }
  }, [id, nextInvoiceNo, selectedSale]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const handleRowsChange = (
    rows: {
      id: number;
      product: {
        id: string | number;
        productName: string;
        hsnCode: string;
      };
      quantity: number;
      mrp: number;
      gst: number;
    }[]
  ) => {
    console.log("Updated Rows:", rows);
    formik.setFieldValue("salesProductQuantities", rows);
    calculateTotals(rows);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
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
      const response = await fetch(`${BASE_URL}/api/sales/uploadFile`, {
        method: "POST",
        body: formData,
        // headers: {
        //   // Add additional headers if required
        // },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("File uploaded successfully.");

        const updatedAttachments = [
          ...(formik.values.salesAttachments || []),
          data?.data,
        ];

        setUploadedData(updatedAttachments);
        formik.setFieldValue("salesAttachments", updatedAttachments);

        console.log(
          "Updated Formik salesAttachments:",
          formik.values.salesAttachments
        );
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

  useEffect(() => {
    console.log(
      "Updated Formik salesAttachments:",
      formik.values.salesAttachments
    );
    console.log("Updated local uploadedData:", uploadedData);
  }, [formik.values.salesAttachments, uploadedData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("action handle submit");
    formik.handleSubmit();
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

  return (
    // <form action=""></form>
    <motion.div
      className="max-w-5xl mx-auto p-4 sm:p-6 shadow-md rounded-md border border-gray-300 dark:border-gray-700"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-xl font-bold mb-4"
      >
        Sales Order
      </motion.h1>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div>
            <label className="block font-medium">Invoice No</label>
            <input
              type="text"
              className="w-full border rounded-md px-2 py-1 bg-transparent"
              disabled
              value={formik.values.inVoiceNo || ""}
            />
          </div>

          <div>
            <Label>Order Type</Label>
            <Select
              onValueChange={(value) => {
                const selectedOrderType = orderTypeData?.data.find(
                  (user: any) => user.id == value
                );
                formik.setFieldValue("orderType", selectedOrderType);
              }}
              value={formik.values.orderType?.id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {orderTypeData?.data.map((user: any) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formik.touched.orderType && formik.errors.orderType?.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.orderType?.name}
              </div>
            )}
          </div>

          <div>
            <Label>Job Type</Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("jobType", value)}
              value={formik.values.jobType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.jobType && formik.errors.jobType && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.jobType}
              </div>
            )}
          </div>

          <div>
            <Label>Reference</Label>
            <Select
              onValueChange={(value) => {
                formik.setFieldValue("reference", value);
              }}
              value={formik.values.reference}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {references.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.reference && formik.errors.reference && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.reference}
              </div>
            )}
          </div>

          <div>
            <Label>Company</Label>
            <Select
              onValueChange={(value) => {
                formik.setFieldValue("company", value);
              }}
              value={formik.values.company}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.company && formik.errors.company && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.company}
              </div>
            )}
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label>Customer</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-transparent hover:bg-transparent shadow-none border border-gray-300 dark:border-gray-700"
                >
                  {formik.values.customer?.customerName || "Select Customer..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              {/* {!isCustomerSelected && ( */}
              <PopoverContent className="w-[320px] p-0">
                <Command>
                  <CommandInput placeholder="Search Customer..." />
                  <CommandList>
                    <CommandEmpty>No Customer Found</CommandEmpty>
                    <CommandGroup>
                      {customerData?.data.map((customer: any) => (
                        <CommandItem
                          key={customer.id}
                          value={customer.customerName}
                          onSelect={() => {
                            // Set customer and related fields
                            formik.setFieldValue("customer", customer);
                            formik.setFieldValue(
                              "contactPerson",
                              customer.contactPerson || ""
                            );
                            formik.setFieldValue("email", customer.email || "");
                            formik.setFieldValue(
                              "contactNumber",
                              customer.contactNumber || ""
                            );
                            formik.setFieldValue(
                              "billingAddress",
                              customer.address1 || ""
                            );
                            formik.setFieldValue(
                              "deliveryAddress",
                              customer.address1 || ""
                            );

                            // Hide the dropdown after selection
                            // setIsCustomerSelected(true);
                          }}
                        >
                          {customer.customerName}
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
              {/* )} */}
            </Popover>
            {formik.touched.customer?.id && formik.errors.customer?.id && (
              <p className="text-red-500 text-sm">
                {formik.errors.customer.id}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Contact Person</label>
            <Input
              type="text"
              className="w-full border rounded-md px-2 py-1"
              name="contactPerson"
              value={formik.values.contactPerson}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readOnly
            />
            {formik.touched.contactPerson && formik.errors.contactPerson && (
              <p className="text-red-500 text-sm">
                {formik.errors.contactPerson}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <Input
              type="text"
              className="w-full border rounded-md px-2 py-1"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readOnly
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Contact No.</label>
            <Input
              type="text"
              className="w-full border rounded-md px-2 py-1"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readOnly
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <p className="text-red-500 text-sm">
                {formik.errors.contactNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Purchase Order No.</label>
            <Input
              type="text"
              className="w-full border rounded-md px-2 py-1"
              name="poNo"
              onChange={formik.handleChange}
              value={formik.values.poNo}
              onBlur={formik.handleBlur}
            />
            {formik.touched.poNo && formik.errors.poNo && (
              <p className="text-red-500 text-sm">{formik.errors.poNo}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Billing Address</label>
            <Input
              type="text"
              className="w-full border rounded-md px-2 py-1"
              name="billingAddress"
              value={formik.values.billingAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.billingAddress && formik.errors.billingAddress && (
              <p className="text-red-500 text-sm">
                {formik.errors.billingAddress}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Delivery Address</label>
            <Input
              type="text"
              className="w-full border rounded-md px-2 py-1"
              name="deliveryAddress"
              value={formik.values.deliveryAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.deliveryAddress &&
              formik.errors.deliveryAddress && (
                <p className="text-red-500 text-sm">
                  {formik.errors.deliveryAddress}
                </p>
              )}
          </div>

          <div>
            <label className="block font-medium">Sales order date</label>
            <Input
              type="date"
              className="w-full border rounded-md px-2 py-1"
              name="salesOrderDate"
              value={formik.values.salesOrderDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.salesOrderDate && formik.errors.salesOrderDate && (
              <p className="text-red-500 text-sm">
                {formik.errors.salesOrderDate}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Purchase order date</label>
            <Input
              type="date"
              className="w-full border rounded-md px-2 py-1"
              name="purchaseOrderDate"
              value={formik.values.purchaseOrderDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.purchaseOrderDate &&
              formik.errors.purchaseOrderDate && (
                <p className="text-red-500 text-sm">
                  {formik.errors.purchaseOrderDate}
                </p>
              )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label>Order Prepared By</Label>
            <Select
              onValueChange={(value) => {
                const selectedUser = userData?.data.find(
                  (user: any) => user.user_id == value
                );
                formik.setFieldValue("orderPreparedBy", selectedUser);
              }}
              value={formik.values.orderPreparedBy?.user_id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {userData?.data.map((user: any) => (
                  <SelectItem key={user.user_id} value={user.user_id}>
                    {user.firstName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formik.touched.orderPreparedBy &&
              formik.errors.orderPreparedBy?.firstName && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.orderPreparedBy?.firstName}
                </div>
              )}
          </div>

          <div>
            <Label>Order Verified By</Label>
            <Select
              onValueChange={(value) => {
                const selectedUser = userData?.data.find(
                  (user: any) => user.user_id == value
                );
                formik.setFieldValue("orderVerifiedBy", selectedUser);
              }}
              value={formik.values.orderVerifiedBy?.user_id || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {userData?.data.map((type: any) => (
                  <SelectItem key={type.user_id} value={type.user_id}>
                    {type.firstName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.orderVerifiedBy &&
              formik.errors.orderVerifiedBy?.firstName && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.orderVerifiedBy?.firstName}
                </div>
              )}
          </div>

          <div>
            <Label>Sales Person</Label>
            <Select
              onValueChange={(value) => {
                const selectedUser = userData?.data.find(
                  (user: any) => user.user_id == value
                );
                formik.setFieldValue("salesPerson", selectedUser);
              }}
              value={formik.values.salesPerson?.user_id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {userData?.data.map((type: any) => (
                  <SelectItem key={type.user_id} value={type.user_id}>
                    {type.firstName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.salesPerson &&
              formik.errors.salesPerson?.firstName && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.salesPerson?.firstName}
                </div>
              )}
          </div>

          <div>
            <Label>Project Engineer</Label>
            <Select
              onValueChange={(value) => {
                const selectedUser = userData?.data.find(
                  (user: any) => user.user_id == value
                );
                formik.setFieldValue("projectEngineer", selectedUser);
              }}
              value={formik.values.projectEngineer?.user_id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {userData?.data.map((type: any) => (
                  <SelectItem key={type.user_id} value={type.user_id}>
                    {type.firstName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.projectEngineer &&
              formik.errors.projectEngineer?.firstName && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.projectEngineer?.firstName}
                </div>
              )}
          </div>

          <div>
            <Label>Project Type</Label>
            <Select
              onValueChange={(value) => {
                formik.setFieldValue("projectType", value);
              }}
              value={formik.values.projectType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {projectType.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.projectType && formik.errors.projectType && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.projectType}
              </div>
            )}
          </div>

          <div>
            <Label>Warranty Period</Label>
            <Input
              type="text"
              className="w-full border rounded-md px-2 py-1"
              name="warrantyPeriod"
              value={formik.values.warrantyPeriod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.warrantyPeriod && formik.errors.warrantyPeriod && (
              <p className="text-red-500 text-sm">
                {formik.errors.warrantyPeriod}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="col-span-3 mb-6">
            <Label>Terms and Conditions</Label>
            <Textarea
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              rows={2}
              name="termsAndCondition"
              value={formik.values.termsAndCondition}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.termsAndCondition &&
              formik.errors.termsAndCondition && (
                <p className="text-red-500 text-sm">
                  {formik.errors.termsAndCondition}
                </p>
              )}
          </div>
        </div>

        <div>
          <div className=" border-none outline-none w-40">
            <Label>Product Type</Label>
            <Select
              onValueChange={(value) =>
                formik.setFieldValue("productType", value)
              }
              value={formik.values.productType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ProductType" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.productType && formik.errors.productType && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.productType}
              </div>
            )}
          </div>
        </div>
        <ProductRow
          salesProductQuantities={id ? salesProductQuantities : null}
          products={productTypeData?.data}
          onRowsChange={handleRowsChange}
        />

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
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">File Details</h2>
        </div>
        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="w-full border-collapse border border-gray-200   mb-6">
            <thead>
              <tr className="bg-gray-100  dark:bg-gray-800">
                <th className="border px-4 py-2">Sr.No</th>
                <th className="border px-4 py-2">File Name</th>
                <th className="border px-4 py-2">Doctype</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedData.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      <a
                        href={item.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:underline"
                        onClick={(e) => handleLinkClick(e, item.location)}
                      >
                        {item.location}
                      </a>
                    </td>
                    <td className="border px-4 py-2">
                      {item.docType?.docType}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals with Input Boxes */}
        <div className="grid gap-4 sm:grid-cols-2 mb-6 mt-4">
          <div>
            <label className="block font-medium ">Total Amount</label>
            <input
              type="text"
              value={total}
              readOnly
              className="w-full border rounded-md px-2 py-1 bg-transparent mt-2 "
            />
          </div>
          <div>
            <Label className="block font-medium mt-2">Total GST</Label>
            <Input
              type="text"
              value={gst}
              readOnly
              className="w-full border rounded-md px-2 py-1 bg-transparent mt-2"
            />
          </div>
          <div>
            <Label className="block font-medium">Net Total Amount</Label>
            <Input
              type="text"
              value={totalNetAmount}
              readOnly
              className="w-full border rounded-md px-2 py-1 bg-transparent mt-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            // className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {id ? "Update Sales Order" : "Create Sales Order"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateForm;
