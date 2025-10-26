import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import ServiceForm from "./form";
import Loading from "@/components/common/Loading";
import {
  useDeleteReferenceDetail,
  useGetReferenceDetail,
  useReferenceDetailRegister,
  useUpdateReferenceDetail,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";

const ReferenceDetailsRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const {
    data: rowData,
    isLoading,
    isError,
    refetch,
  } = useGetReferenceDetail(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useReferenceDetailRegister();
  const UpdateServiceMutation = useUpdateReferenceDetail(serviceId);
  const DeleteServiceMutation = useDeleteReferenceDetail(serviceId);
  const serviceData = rowData?.data || [];
  console.log("rowData", rowData);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "referenceDetail", headerName: "Reference Detail" },
    {
      field: "sourceReference.sourceReference",
      headerName: "Source Of Reference",
    },
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
      <h1 className="heading-primary">Reference Details</h1>
      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Reference_Details"
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={
          serviceId ? "Edit Reference Detail" : "Create Reference Detail"
        }
        dialogDescription={
          serviceId
            ? "Edit Reference Detail here..."
            : "Create Reference Detail here..."
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

export default ReferenceDetailsRoute;
