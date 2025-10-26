import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import ServiceForm from "./form";
import Loading from "@/components/common/Loading";
import {
  useDeleteDesignation,
  useGetDesignations,
  useDesignationRegister,
  useUpdateDesignation,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";

const DesignationRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetDesignations(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useDesignationRegister();
  const UpdateServiceMutation = useUpdateDesignation(serviceId);
  const DeleteServiceMutation = useDeleteDesignation(serviceId);
  const serviceData = rowData?.data || [];
  console.log("rowData", rowData);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "code", headerName: "Code" },
    { field: "designation", headerName: "Designation" },
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
    setIsModalOpen(false);
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
      <h1 className="heading-primary">Designation</h1>
      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          exportFileName="Designation"
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={serviceId ? "Edit Designation" : "Create Designation"}
        dialogDescription={
          serviceId ? "Edit Designation here..." : "Create Designation here..."
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

export default DesignationRoute;
