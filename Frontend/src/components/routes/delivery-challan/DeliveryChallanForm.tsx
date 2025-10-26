import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
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
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useGetUsers } from "../user/hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormValues, ProductQuantity } from "./Type";
import { useGetInvoiceNoList, useGetSalesByInvoiceNo } from "../sales/hook";
import { Select } from "@radix-ui/react-select";
import {
  useDeliveryChallanRegister,
  useGetDeliveryChallanNo,
  useGetDeliveryChallans,
  useUpdateDeliveryChallan,
} from "./hook";
// import { useDeliveryChallanRegister, useGetDeliveryChallanNo} from "./hook";

const DeliveryChallanForm = () => {
  const [invoiceNo, setInvoiceNo] = useState<string | null>(null);
  let [id, setId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [productQuantities, setproductQuantities] = useState<ProductQuantity[]>(
    []
  );

  const [saleProductQuantities, setSaleProductQuantities] = useState<
    ProductQuantity[]
  >([]);

  const { mutate: fetchSales, data: salesData } =
    useGetSalesByInvoiceNo(invoiceNo);

  const { mutate: fetchInvoiceNoList, data: invoiceNoList } =
    useGetInvoiceNoList();

  const { mutate: fetchChallanNo, data: nextChallanNo } =
    useGetDeliveryChallanNo();

  const addRegisterMutation = useDeliveryChallanRegister();
  const UpdateServiceMutation = useUpdateDeliveryChallan(id);
  const { data: challanData, refetch } = useGetDeliveryChallans();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const [selectedDC, setSelectedDC] = useState({
    id: "",
    deliveryChallanNo: "",
    invoiceNo: "",
  });

  useEffect(() => {
    fetchInvoiceNoList();
    fetchChallanNo();
  }, []);

  useEffect(() => {
    if (id) {
      formik.setFieldValue("deliveryChallanNo", selectedDC.deliveryChallanNo);
    } else if (nextChallanNo?.data) {
      formik.setFieldValue("deliveryChallanNo", nextChallanNo?.data);
    }
  }, [nextChallanNo]);

  useEffect(() => {
    if (invoiceNo) {
      console.log("in invoice");
      fetchSales();
    }
  }, [invoiceNo]);

  useEffect(() => {
    if (salesData?.data?.salesProductQuantities) {
      console.log("1in sales", salesData);
      if (!id) {
        setproductQuantities(salesData.data.salesProductQuantities);
        setSaleProductQuantities(salesData.data.salesProductQuantities);
      } else {
        console.log("in sales", salesData);
        const updatedQuantities = productQuantities.map((product) => {
          // Find the matching product from salesData
          const matchingProduct = salesData?.data?.salesProductQuantities.find(
            (p: any) => p.product.id === product.product.id
          );
          console.log(matchingProduct, "matchin");

          if (matchingProduct) {
            return {
              ...product,
              dispatchedQuantity: matchingProduct.dispatchedQuantity,
              quantity: matchingProduct.quantity,
            };
          }

          return product;
        });

        setproductQuantities(updatedQuantities);
        setSaleProductQuantities(updatedQuantities);
      }
    }
  }, [salesData]);

  useEffect(() => {
    if (productQuantities && !id) {
      formik.setFieldValue("productQuantities", productQuantities);
      formik.setFieldValue("customerPoNo", salesData?.data?.poNo || "");
      formik.setFieldValue("salesPerson", salesData?.data?.contactPerson || "");
      formik.setFieldValue(
        "name",
        salesData?.data?.customer?.customerName || ""
      );

      formik.setFieldValue("address", salesData?.data?.deliveryAddress || "");
    }
  }, [productQuantities]);

  useEffect(() => {
    let queryId = queryParams.get("id");
    setId(queryId);

    if (queryId && challanData && !isInitialized) {
      const challan = challanData?.data.find((item: any) => {
        return item.id.toString() === queryId;
      });
      if (challan) {
        console.log("chlla", challan);
        setSelectedDC(challan);
        // setSaleProductQuantities(salesData?.salesProductQuantities)
        setSaleProductQuantities(challan?.productQuantities);
        setproductQuantities(challan?.productQuantities);
        setInvoiceNo(challan?.invoiceNo);
        formik.setValues({
          ...formik.initialValues,
          ...challan,
        });
        // isInitialized = true;
        setIsInitialized(true);
      }
      console.log(challan);
    }
  }, [challanData, queryParams]);

  const formik = useFormik<FormValues>({
    initialValues: {
      deliverBy: "",
      customerPoNo: "",
      name: "",
      address: "",
      jobId: "",
      invoiceNo: "",
      installationBy: "",
      salesPerson: "",
      deliveryChallanNo: "",
      localDateTime: "",
      storeInChargeId: { user_id: "", firstName: "" },
      transporterId: { user_id: "", firstName: "" },
      projectInChargeId: { user_id: "", firstName: "" },
      authorizeDetailsById: { user_id: "", firstName: "" },
      productQuantities: [
        { id: "", product: { id: "", productName: "", mrp: "" }, quantity: "" },
      ],
    },
    validationSchema: Yup.object({
      deliverBy: Yup.string().required("Required"),
      customerPoNo: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      jobId: Yup.string().required("Required"),
      invoiceNo: Yup.string().required("Required"),
      installationBy: Yup.string().required("Required"),
      salesPerson: Yup.string().required("Required"),
      localDateTime: Yup.date().required("Date is required"),

      // deliveryChallanNo: Yup.string().required("Required"),
      storeInChargeId: Yup.object()
        .shape({
          user_id: Yup.string().required("Store Incharge ID is required."),
          firstName: Yup.string().required("Store Incharge Name is required."),
        })
        .required("Store Incharge is required."),

      transporterId: Yup.object()
        .shape({
          user_id: Yup.string().required("Transporter is required."),
          firstName: Yup.string().required("Transporter Name is required."),
        })
        .required("Transporter is required."),

      projectInChargeId: Yup.object()
        .shape({
          user_id: Yup.string().required("ProjectIncharge is required."),
          firstName: Yup.string().required("ProjectIncharge Name is required."),
        })
        .required("ProjectIncharge is required."),

      authorizeDetailsById: Yup.object()
        .shape({
          user_id: Yup.string().required("AuthorizedPerson ID is required."),
          firstName: Yup.string().required("AuthorizedPerson is required."),
        })
        .required("AuthorizedPerson is required."),
    }),
    onSubmit: (values) => {
      if (id) {
        console.log("in update", id, values);
        UpdateServiceMutation.mutate(values, {
          onSuccess: () => {
            refetch();
            navigate("/app/delivery-challan");
          },
        });
        id = null;
      } else {
        console.log("Form submitted:", values);
        addRegisterMutation.mutate(values, {
          onSuccess: () => {
            refetch();
            navigate("/app/delivery-challan");
          },
        });
      }
    },
  });
  useEffect(() => {
    formik.setFieldValue("productQuantities", productQuantities);
  }, [productQuantities]);

  useEffect(() => {}, [formik.values?.invoiceNo]);

  const { data: userData } = useGetUsers();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/app/delivery-challan");
  };

  const removeItem = (index: number) => {
    console.log("Removing index:", index);

    const updatedProductQuantities = productQuantities.filter(
      (_, i) => i !== index
    );

    const updatedSaleProductQuantities = saleProductQuantities.filter(
      (_, i) => i !== index
    );

    setproductQuantities(updatedProductQuantities);
    setSaleProductQuantities(updatedSaleProductQuantities);
    formik.setFieldValue("productQuantities", updatedProductQuantities);

    console.log("Updated Quantities:", updatedProductQuantities);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("action handle submit");
    formik.handleSubmit();
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
          <h1 className="text-xl font-bold mb-4">Delivery Challan</h1>

          {/* Form Inputs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            <div>
              <Label>Invoice No</Label>
              <Select
                onValueChange={(value) => {
                  formik.setFieldValue("invoiceNo", value);
                  setInvoiceNo(value);
                }}
                value={String(formik.values?.invoiceNo)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {invoiceNoList?.data.map((invoiceNo: any) => (
                    <SelectItem key={invoiceNo} value={String(invoiceNo)}>
                      {invoiceNo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formik.touched.invoiceNo && formik.errors.invoiceNo && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.invoiceNo}
                </div>
              )}
            </div>

            <div>
              <label className="block font-medium">Challan No</label>
              <input
                type="text"
                className="w-full border rounded-md px-2 py-1"
                disabled
                value={formik.values.deliveryChallanNo || ""}
              />
              {formik.touched.deliveryChallanNo &&
                formik.errors.deliveryChallanNo && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.deliveryChallanNo}
                  </p>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium">Name</label>
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="mt-1 w-full"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Sales Persons</label>
              <Input
                type="text"
                name="salesPerson"
                value={formik.values.salesPerson}
                onChange={formik.handleChange}
                className="mt-1 w-full"
              />
              {formik.touched.salesPerson && formik.errors.salesPerson && (
                <p className="text-red-500 text-sm">
                  {formik.errors.salesPerson}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Installed By</label>
              <Input
                type="text"
                name="installationBy"
                value={formik.values.installationBy}
                onChange={formik.handleChange}
                className="mt-1 w-full"
              />
              {/* Display error message if any */}
              {formik.touched.installationBy &&
                formik.errors.installationBy && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.installationBy}
                  </p>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium">Address</label>
              <textarea
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="mt-1 w-full p-2 border rounded-md"
                rows={1}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Deliver By</label>
              <Input
                type="text"
                name="deliverBy"
                value={formik.values.deliverBy}
                onChange={formik.handleChange}
                className="mt-1 w-full"
              />
              {formik.touched.deliverBy && formik.errors.deliverBy && (
                <p className="text-red-500 text-sm">
                  {formik.errors.deliverBy}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Job Id</label>
              <Input
                type="number"
                name="jobId"
                min={0}
                value={formik.values.jobId}
                onChange={formik.handleChange}
                className="mt-1 w-full"
              />
              {/* Display error message if any */}
              {formik.touched.jobId && formik.errors.jobId && (
                <p className="text-red-500 text-sm">{formik.errors.jobId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">CustomerPoNo</label>
              <Input
                type="number"
                name="customerPoNo"
                value={formik.values.customerPoNo}
                onChange={formik.handleChange}
                className="mt-1 w-full"
              />
              {/* Display error message if any */}
              {formik.touched.customerPoNo && formik.errors.customerPoNo && (
                <p className="text-red-500 text-sm">
                  {formik.errors.customerPoNo}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Date</label>
              <Input
                type="date"
                name="localDateTime"
                value={formik.values.localDateTime}
                // value={formik.values.localDateTime || new Date().toISOString().split("T")[0]}
                onChange={formik.handleChange}
                className="mt-1 w-full"
              />
              {formik.touched.localDateTime && formik.errors.localDateTime && (
                <p className="text-red-500 text-sm">
                  {formik.errors.localDateTime}
                </p>
              )}
            </div>

            <div>
              <Label>Store Incharge</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.storeInChargeId?.firstName ||
                      "Select Incharge..."}
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
                              formik.setFieldValue("storeInChargeId", client)
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.storeInChargeId?.user_id ===
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
              {formik.touched.storeInChargeId && (
                <>
                  {/* {formik.errors.storeInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.storeInChargeId?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.storeInChargeId.firstName}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Popover-based selection for SO ID */}
            <div>
              <Label>Authorized By</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.authorizeDetailsById?.firstName ||
                      "Select Authorized Person Name..."}
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
                              formik.setFieldValue(
                                "authorizeDetailsById",
                                client
                              )
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.authorizeDetailsById?.user_id ===
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
              {formik.touched.authorizeDetailsById && (
                <>
                  {/* {formik.errors.authorizeDetailsById?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.authorizeDetailsById.user_id}
                    </p>
                  )} */}
                  {formik.errors.authorizeDetailsById?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.authorizeDetailsById.firstName}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Popover-based selection for project in charge ID */}
            <div>
              <Label>Transporter Detail</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.transporterId?.firstName ||
                      "Select Transporter Person Name..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Transporter..." />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {userData?.data?.map((client: any) => (
                          <CommandItem
                            key={client.user_id}
                            value={client.firstName}
                            onSelect={() =>
                              formik.setFieldValue("transporterId", client)
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.transporterId?.user_id ===
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
              {formik.touched.transporterId && (
                <>
                  {/* {formik.errors.transporterId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.transporterId.user_id}
                    </p>
                  )} */}
                  {formik.errors.transporterId?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.transporterId.firstName}
                    </p>
                  )}
                </>
              )}
            </div>
            {/* Popover-based selection for Item ID */}
            <div>
              <Label>Project InCharge</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formik.values.projectInChargeId?.firstName ||
                      "Select Project Incharge  Name..."}
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
                              formik.setFieldValue("projectInChargeId", client)
                            }
                          >
                            {client.firstName}
                            <Check
                              className={
                                formik.values.projectInChargeId?.user_id ===
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
              {formik.touched.projectInChargeId && (
                <>
                  {/* {formik.errors.projectInChargeId?.user_id && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.projectInChargeId.user_id}
                    </p>
                  )} */}
                  {formik.errors.projectInChargeId?.firstName && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.projectInChargeId.firstName}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto ">
            <table className="w-full border-collapse border border-gray-200   mb-6">
              <thead>
                <tr className="bg-gray-100  dark:bg-gray-800">
                  <th className="border px-4 py-2">Sr.No</th>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Total Quantity</th>
                  <th className="border px-4 py-2">Dispatched Quantity</th>
                  <th className="border px-4 py-2">Enter Quantity</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {saleProductQuantities?.map((item, index) => {
                  return (
                    <tr key={item?.id}>
                      <td className="border px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <div>{item.product?.productName}</div>
                      </td>

                      <td className="border px-4 py-2 text-center">
                        <div>{item.quantity}</div>
                      </td>

                      <td className="border px-4 py-2 text-center">
                        <div>{item?.dispatchedQuantity}</div>
                      </td>
                      <td className="border px-1 py-1 text-center">
                        <input
                          min={0}
                          max={
                            !id
                              ? Number(item?.quantity) -
                                item?.dispatchedQuantity
                              : ""
                          }
                          type="number"
                          className="w-full border rounded-md px-2 py-1"
                          value={productQuantities[index]?.quantity || 0}
                          onChange={(e) => {
                            const updatedValue = e.target.value;

                            const updatedProductQuantities = [
                              ...productQuantities,
                            ];
                            updatedProductQuantities[index] = {
                              ...item,
                              quantity: updatedValue,
                            };

                            setproductQuantities(updatedProductQuantities);

                            formik.setFieldValue(
                              "productQuantities",
                              updatedProductQuantities
                            );
                          }}
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => removeItem(index)}
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

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant={"secondary"}
              // className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit">
              {id ? "Update Challan" : "Create Challan"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default DeliveryChallanForm;
