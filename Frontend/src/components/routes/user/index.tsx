import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import Loading from "@/components/common/Loading";
import {
  useDeleteUser,
  useGetUsers,
  useUserRegister,
  useUpdateUser,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import Form from "./form";

const UserRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetUsers(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useUserRegister();
  const UpdateServiceMutation = useUpdateUser(serviceId);
  const DeleteServiceMutation = useDeleteUser(serviceId);
  const serviceData = rowData?.data || [];
  console.log("rowData", rowData);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "gender", headerName: "Gender" },
    { field: "contactNo", headerName: "Mobile No" },
    { field: "emailId", headerName: "Email" },
    // { field: "active", headerName: "Status (isActive)" },
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
    console.log("formdata", formData);
    if (serviceId) {
      // Call update mutation if editing
      UpdateServiceMutation.mutate(formData, {
        onSuccess: () => {
          refetch(); // Refetch data after a successful update
          setIsModalOpen(false);
        },
      });
    } else {
      // Call register mutation if adding new service
      addRegisterMutation.mutate(formData, {
        onSuccess: () => {
          refetch(); // Refetch data after a successful add
          setIsModalOpen(false);
        },
      });
    }
  };

  const handleEdit = (data: any) => {
    setServiceId(data.user_id);
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (data: any) => {
    setServiceId(data.user_id);
    DeleteServiceMutation.mutate(data.user_id, {
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
      <h1 className="heading-primary">User</h1>
      <div className="p-6 ">
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="User"
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseAction}
        dialogTitle={serviceId ? "Edit User" : "Create User"}
        dialogDescription={
          serviceId ? "Edit User here..." : "Create User here..."
        }
        formId="service-form"
        width="max-w-5xl"
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

export default UserRoute;
