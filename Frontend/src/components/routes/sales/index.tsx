import DataTable from "@/components/common/DataTable";
import { useState } from "react";
import ServiceForm from "./form";
// import Loading from "@/components/common/Loading";
import {
  useDeleteSales,
  useGetSales,
  useSalesRegister,
  useUpdateSales,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ProductListRoute from "../productlist";
import MaterialRoute from "@/components/settingroutes copy/material";
import CustomerListRoute from "../customerlist";
import ServicesRoute from "../services";

const SalesRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetSales(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useSalesRegister();
  const UpdateServiceMutation = useUpdateSales(serviceId);
  const DeleteServiceMutation = useDeleteSales(serviceId);
  const serviceData = rowData?.data || [];
  // const serviceData: any[] =  [];
  console.log("rowData", rowData);
  const navigate = useNavigate();

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "inVoiceNo", headerName: "Invoice No" },
    { field: "orderType.name", headerName: "Types" },
    { field: "customer.customerName", headerName: "Customer Name" },
    { field: "billingAddress", headerName: "Address" },
    { field: "deliveryAddress", headerName: "Delivery Address" },
    { field: "contactNumber", headerName: "Contact No " },
    { field: "email", headerName: "Email" },
    { field: "purchaseOrderDate", headerName: "Purchase OrderDate" },
    { field: "salesOrderDate", headerName: "Sales OrderDate" },
    { field: "company", headerName: "Company" },
  ];

  const handleOpenChange = () => {
    setEditData(""); // Ensure form is reset for adding a new service
    setServiceId(null); // Reset service ID to indicate adding mode
    // setIsModalOpen(true);
    navigate("/app/sales/createform");
  };

  const handleCloseAction = () => {
    // setIsModalOpen(false);
    navigate("/app/sales");
  };

  const handleSubmit = (formData: any) => {
    if (serviceId) {
      // Call update mutation if editing
      UpdateServiceMutation.mutate(formData, {
        onSuccess: () => {
          refetch(); // Refetch data after a successful update
        },
      });
    } else {
      // Call register mutation if adding new service
      addRegisterMutation.mutate(formData, {
        onSuccess: () => {
          refetch(); // Refetch data after a successful add
        },
      });
    }
    setIsModalOpen(false);
  };

  const handleEdit = (data: any) => {
    setServiceId(data.id);
    setEditData(data);
    navigate(`/app/sales/createform?id=${data.id}`);
  };

  const handleDelete = (data: any) => {
    setServiceId(data.id);
    DeleteServiceMutation.mutate(data.id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  if (isLoading) {
    // return <Loading />;
  }

  if (isError) {
    // return <div>Error loading data</div>;
  }

  return (
    <div>
      <Tabs defaultValue="sales">
        <div className="flex flex-col gap-4">
          {/* Tabs list aligned to left and content-width only */}
          <div className="self-start">
            <TabsList className="inline-flex gap-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 p-1 shadow-sm">
              {[
                { value: "sales", label: "Sales" },
                { value: "productList", label: "Product List" },
                { value: "material", label: "Material" },
                { value: "customerList", label: "Customer List" },
                { value: "services", label: "Services" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-2.5 py-1 text-xs font-medium rounded border border-transparent transition-colors
    hover:bg-gray-100 dark:hover:bg-gray-800 
    data-[state=active]:bg-primary data-[state=active]:text-white 
    dark:data-[state=active]:text-black 
    data-[state=active]:border-primary"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tabs content */}
          <div>
            <TabsContent value="sales">
              <h1 className="heading-primary">Sales</h1>
              <div className="p-6">
                <DataTable
                  rowData={serviceData}
                  colDefs={columnDefs}
                  isLoading={isLoading}
                  onAddClick={handleOpenChange}
                  onEditClick={handleEdit}
                  onDeleteClick={handleDelete}
                  exportFileName="Sales"
                />
              </div>
              <CustomModal
                isOpen={isModalOpen}
                onClose={handleCloseAction}
                dialogTitle={
                  serviceId ? "Edit Customer List" : "Create Customer"
                }
                dialogDescription={
                  serviceId
                    ? "Edit your Customer List details here..."
                    : "Create Customer here..."
                }
                formId="service-form"
                width="100%"
                height="100%"
              >
                <ServiceForm
                  onSubmit={handleSubmit}
                  formId="service-form"
                  defaultValues={editData}
                />
              </CustomModal>
            </TabsContent>

            <TabsContent value="productList">
              <ProductListRoute />
            </TabsContent>

            <TabsContent value="material">
              <MaterialRoute />
            </TabsContent>

            <TabsContent value="customerList">
              <CustomerListRoute />
            </TabsContent>

            <TabsContent value="services">
              <ServicesRoute />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SalesRoute;
