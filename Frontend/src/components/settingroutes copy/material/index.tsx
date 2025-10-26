import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import Loading from "@/components/common/Loading";
import {
  useDeleteMaterial,
  useGetMaterials,
  useMaterialRegister,
  useUpdateMaterial,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import Form from "./form";

const MaterialRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | 0>(0);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetMaterials();
  const addRegisterMutation = useMaterialRegister();
  const UpdateServiceMutation = useUpdateMaterial(serviceId);
  const DeleteServiceMutation = useDeleteMaterial(serviceId);
  const serviceData = rowData?.data || [];
  console.log("rowData", rowData);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "materialName", headerName: "Material Name" },
    { field: "materialQuantityUOM.uom", headerName: "Unit MeasureMaterial " },
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
      <h1 className="heading-primary">Material</h1>
      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={serviceId ? "Edit Material" : "Create Material"}
        dialogDescription={
          serviceId ? "Edit Material here..." : "Create Material here..."
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

export default MaterialRoute;
