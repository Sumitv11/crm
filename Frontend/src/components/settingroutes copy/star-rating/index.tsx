import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import ServiceForm from "./form";
import Loading from "@/components/common/Loading";
import {
  useDeleteStarRating,
  useGetStarRatings,
  useStarRatingRegister,
  useUpdateStarRating,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";

const StarRatingRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetStarRatings();
  const addRegisterMutation = useStarRatingRegister();
  const UpdateServiceMutation = useUpdateStarRating(serviceId);
  const DeleteServiceMutation = useDeleteStarRating(serviceId);
  const serviceData = rowData?.data || [];
  console.log("rowData", rowData);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "typeCode", headerName: "Type Code" },
    { field: "starRating", headerName: "Star Rating" },
    {
      field: "isActive",
      headerName: "Status (isActive)",
      cellRenderer: (params: any) => (params.value ? "Active" : "Inactive"),
    },
  ];

  const handleOpenChange = () => {
    setEditData("");
    setServiceId(null);
    setIsModalOpen(true);
  };

  const handleCloseAction = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData: any) => {
    if (serviceId) {
      UpdateServiceMutation.mutate(formData, {
        onSuccess: () => {
          refetch();
        },
      });
    } else {
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
      <h1 className="heading-primary">Star Rating</h1>
      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Star_Rating"
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={serviceId ? "Edit Star Rating" : "Create Star Rating"}
        dialogDescription={
          serviceId ? "Edit Star Rating here..." : "Create Star Rating here..."
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

export default StarRatingRoute;
