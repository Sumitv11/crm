import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import Loading from "@/components/common/Loading";
import {
  useDeleteItemCategory,
  useGetItemCategories,
  useItemCategoryRegister,
  useUpdateItemCategory,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import Form from "./form";

const ItemCategoryRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | 0>(0);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetItemCategories(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useItemCategoryRegister();
  const UpdateServiceMutation = useUpdateItemCategory(serviceId);
  const DeleteServiceMutation = useDeleteItemCategory(serviceId);
  const serviceData = rowData?.data || [];
  console.log("rowData", rowData);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "code", headerName: "Code" },
    { field: "categoryName", headerName: "Category Name" },
    {
      field: "isActive",
      headerName: "Status (isActive)",
      cellRenderer: (params: any) => (params.value ? "Active" : "Inactive"),
    },
  ];

  const handleOpenChange = () => {
    setEditData(""); // Ensure form is reset for adding a new service
    setServiceId(0); // Reset service ID to indicate adding mode
    setIsModalOpen(true);
  };

  const handleCloseAction = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData: any) => {
    console.log(serviceId);
    if (serviceId) {
      console.log("true");
      // Call update mutation if editing
      UpdateServiceMutation.mutate(formData, {
        onSuccess: () => {
          refetch(); // Refetch data after a successful update
        },
      });
    } else {
      // Call register mutation if adding new service
      console.log("false");
      console.log(formData);
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
      <h1 className="heading-primary">Item Category</h1>
      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Item_Category"
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={serviceId ? "Edit Item Category" : "Create Item Category"}
        dialogDescription={
          serviceId
            ? "Edit Item Category here..."
            : "Create Item Category here..."
        }
        formId="service-form"
        width="max-w-4xl"
        height="h-auto"
      >
        <Form
          onSubmit={handleSubmit}
          formId="service-form"
          defaultValues={editData}
        />
      </CustomModal>
    </div>
  );
};

export default ItemCategoryRoute;
