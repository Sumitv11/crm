import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import ServiceForm from "./form";
import Loading from "@/components/common/Loading";
import {
  useDeleteCustomerType,
  useGetCustomerType,
  useCustomerTypeRegister,
  useUpdateCustomerType,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";

const CustomerTypeRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetCustomerType(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useCustomerTypeRegister();
  const UpdateServiceMutation = useUpdateCustomerType(serviceId);
  const DeleteServiceMutation = useDeleteCustomerType(serviceId);
  const serviceData = rowData?.data || [];
  console.log("rowData", rowData);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "customerType", headerName: "Customer Type" },
    {
      field: "isActive",
      headerName: "Status (isActive)",
      cellRenderer: (params: any) => (params.value ? "Active" : "Inactive"),
    },
  ];

  const handleOpenChange = () => {
    setEditData(""); // Ensure form is reset for adding a new service
    setServiceId(null); // Reset service ID to indicate adding mode
    setIsModalOpen(true);
  };

  const handleCloseAction = () => {
    if (!isLoading) {
      setIsModalOpen(false);
    }
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
    setIsModalOpen(true);
  };

  const handleDelete = (data: any) => {
    setServiceId(data.id);
    DeleteServiceMutation.mutate(data.id, {
      onSuccess: () => {
        refetch(); // Refetch data after a successful delete
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1 className="heading-primary">Customer Type</h1>

      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Customer_Type"
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={serviceId ? "Edit Customer Type" : "Create Customer Type"}
        dialogDescription={
          serviceId
            ? "Edit Customer Type here..."
            : "Create Customer Type here..."
        }
        formId="service-form"
        width="max-w-4xl"
        height="h-auto"
      >
        <ServiceForm
          onSubmit={handleSubmit}
          formId="service-form"
          defaultValues={editData}
        />
      </CustomModal>
    </div>
  );
};

export default CustomerTypeRoute;
