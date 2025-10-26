import DataTable from "@/components/common/DataTable";
import { useState } from "react";
import ServiceForm from "./form";
// import Loading from "@/components/common/Loading";
import {
  useDeleteDeliveryChallan,
  useGetDeliveryChallans,
  useDeliveryChallanRegister,
  useUpdateDeliveryChallan,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/common/Loading";

const DeliveryChallanRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const {
    data: rowData,
    isLoading,
    isError,
    refetch,
  } = useGetDeliveryChallans(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useDeliveryChallanRegister();
  const UpdateServiceMutation = useUpdateDeliveryChallan(serviceId);
  const DeleteServiceMutation = useDeleteDeliveryChallan(serviceId);
  const serviceData = rowData?.data || [];
  const navigate = useNavigate();

  // console.log('data',serviceData);
  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "name", headerName: "Name" },
    { field: "address", headerName: "Address" },
    { field: "customerPoNo", headerName: "PoNo" },
    { field: "deliveryChallanNo", headerName: "ChallanNo" },
    { field: "invoiceNo", headerName: "Invoice No" },
    { field: "storeInChargeId.firstName", headerName: "Store Incharge" },
    { field: "authorizeDetailsById.firstName", headerName: "AuthorizedBy" },
    { field: "salesPerson", headerName: "Sales Person" },
    { field: "installationBy", headerName: "InstallationBy" },

    { field: "transporterId.firstName", headerName: "Transporter" },
  ];

  const handleOpenChange = () => {
    setEditData("");
    setServiceId(null);
    // setIsModalOpen(true);
    navigate("/app/delivery-challan/delivery-challan-form");
  };

  const handleCloseAction = () => {
    // setIsModalOpen(false);
    navigate("/app/delivery-challan");
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
    // setIsModalOpen(true);
    navigate(`/app/delivery-challan/delivery-challan-form?id=${data.id}`);
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
      <h1 className="heading-primary">Delivery Challan</h1>

      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Delivery_Challan"
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

export default DeliveryChallanRoute;
