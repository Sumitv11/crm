import DataTable from "@/components/common/DataTable";
import { useState } from "react";
import ServiceForm from "./form";
// import Loading from "@/components/common/Loading";
import {
  useDeleteService,
  useGetServices,
  useServiceRegister,
  useUpdateService,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import { useNavigate } from "react-router-dom";

const ServicesRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetServices(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useServiceRegister();
  const UpdateServiceMutation = useUpdateService(serviceId);
  const DeleteServiceMutation = useDeleteService(serviceId);
  const serviceData = rowData?.data || [];
  // const serviceData: any[] =  [];
  // console.log("rowData",rowData);
  const navigate = useNavigate();

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },

    { field: "product.productName", headerName: "Product Name" },
    { field: "serviceNo", headerName: "Service No" },
    { field: "client.customerName", headerName: "Customer Name" },
    { field: "serviceManager.firstName", headerName: "Service Manager" },
    { field: "supportedBy.firstName", headerName: "Supporter" },
    { field: "serviceProvidedBy.firstName", headerName: "Provider BY" },
    { field: "natureOfService.natureOfService", headerName: "Nature" },
    {
      field: "natureOfComplaint.natureOfComplaint",
      headerName: "Complaint Nature",
    },
  ];

  const handleOpenChange = () => {
    setEditData(""); // Ensure form is reset for adding a new service
    setServiceId(null); // Reset service ID to indicate adding mode
    // setIsModalOpen(true);
    navigate("/app/services/services-form");
  };

  const handleCloseAction = () => {
    // setIsModalOpen(false);
    navigate("/app/services");
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
    setServiceId(data.service_id);
    console.log("id", data.service_id);
    setEditData(data);
    navigate(`/app/services/services-form?id=${data.service_id}`);
  };

  const handleDelete = (data: any) => {
    setServiceId(data.service_id);
    DeleteServiceMutation.mutate(data.service_id, {
      onSuccess: () => {
        refetch(); // Refetch data after a successful delete
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
      <h1 className="heading-primary">Services</h1>

      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Services"
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={serviceId ? "Edit Customer List" : "Create Customer"}
        dialogDescription={
          serviceId
            ? "Edit your Customer List details here..."
            : "Create Customer here..."
        }
        formId="form"
        width="100%"
        height="100%"
      >
        <ServiceForm
          onSubmit={handleSubmit}
          formId="form"
          defaultValues={editData}
        />
      </CustomModal>
    </div>
  );
};

export default ServicesRoute;
