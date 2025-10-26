import DataTable from "@/components/common/DataTable";
import { useState } from "react";
import ServiceForm from "./form";
// import Loading from "@/components/common/Loading";
import {
  useDeleteInstallation,
  useGetInstallations,
  useInstallationRegister,
  useUpdateInstallation,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import { useNavigate } from "react-router-dom";

const InstallationRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetInstallations(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useInstallationRegister();
  const UpdateServiceMutation = useUpdateInstallation(serviceId);
  const DeleteServiceMutation = useDeleteInstallation(serviceId);
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
    { field: "installationReportNo", headerName: "Report No." },
    { field: "installationDate", headerName: "Date" },
    { field: "poId", headerName: "PoId" },
    { field: "customer.customerName", headerName: "Customer" },

    { field: "installationDoneBy.firstName", headerName: "Inst Done By" },
    { field: "installationVerifiedBy.firstName", headerName: "Verified By" },

    { field: "installationStatus", headerName: "Status" },
    { field: "installationRemark", headerName: "Remark" },
  ];

  const handleOpenChange = () => {
    setEditData(""); // Ensure form is reset for adding a new service
    setServiceId(null); // Reset service ID to indicate adding mode
    // setIsModalOpen(true);
    navigate("/app/installation/installation-form");
  };

  const handleCloseAction = () => {
    // setIsModalOpen(false);
    navigate("/app/installation");
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
    navigate(`/app/installation/installation-form?id=${data.id}`);
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
    // return <Loading />;
  }

  if (isError) {
    // return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1 className="heading-primary">Installation</h1>

      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Installation"
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

export default InstallationRoute;
