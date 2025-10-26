import DataTable from "@/components/common/DataTable";
import { useState } from "react";
import ServiceForm from "./form";
import Loading from "@/components/common/Loading";
import {
  useDeleteCustomerList,
  useGetCustomerList,
  useCustomerListRegister,
  useUpdateCustomerList,
} from "./hook";
import CustomModal from "@/components/Modal/DialogModal";
import { useNavigate } from "react-router-dom";

const CustomerListRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: rowData, isLoading, isError, refetch } = useGetCustomerList();
  const addRegisterMutation = useCustomerListRegister();
  const UpdateServiceMutation = useUpdateCustomerList(serviceId);
  const DeleteServiceMutation = useDeleteCustomerList(serviceId);
  const serviceData = rowData?.data || [];
  const navigate = useNavigate();

  navigate;
  // edit
  // const [hasEdit, setHasEdit] = useState<boolean>(false);

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "customerType.customerType", headerName: "Types" },
    { field: "customerName", headerName: "Customer Name" },
    { field: "address1", headerName: "Address" },
    { field: "contactNumber", headerName: "Contact No " },
    { field: "email", headerName: "Email" },
    {
      field: "isActive",
      headerName: "Status (isActive)",
      cellRenderer: (params: any) => (params.value ? "Active" : "Inactive"),
    },
    { field: "designation.designation", headerName: "Designation" },
    { field: "sourceReference.sourceReference", headerName: "Reference" },
    {
      field: "referenceDetail.referenceDetail",
      headerName: "Reference Detail",
    },
    { field: "referenceRemark", headerName: "Reference Remark" },
  ];

  const handleOpenChange = () => {
    setIsModalOpen(true);
    setEditData(""); // Ensure form is reset for adding a new service
    setServiceId(null); // Reset service ID to indicate adding mode
    // setIsModalOpen(true);
    // navigate("/app/customer-list/customerform");
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
          refetch();
        },
      });
    }
    setIsModalOpen(false);
  };

  const handleEdit = (data: any) => {
    setIsModalOpen(true);
    // setHasEdit(true);
    setServiceId(data.id);
    console.log("edit", data.id);
    setEditData(data);
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
    // return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1 className="heading-primary">Customer List</h1>
      <div className="p-6 ">
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          // showEdit={editData}
          exportFileName="Customer_List"
          onDeleteClick={handleDelete}
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
        formId="service-form"
        width="max-w-5xl"
        height="min-h-[200px] max-h-[80vh] h-auto overflow-y-auto"
        showCloseButton={false}
        showSaveButton={false}
      >
        <ServiceForm
          onSubmit={handleSubmit}
          formId="service-form"
          defaultValues={editData}
          setIsModalOpen={setIsModalOpen}
        />
      </CustomModal>
    </div>
  );
};

export default CustomerListRoute;
