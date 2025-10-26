import DataTable from "@/components/common/DataTable";
import { useState } from "react";

import ServiceForm from "./form";
// import Loading from "@/components/common/Loading";
import CustomModal from "@/components/Modal/DialogModal";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProduct,
  useGetProducts,
  useProductRegister,
  useUpdateProduct,
} from "./hook";

const ProductListRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>("");
  const { data: productData, isLoading, isError, refetch } = useGetProducts(); // Adding refetch to manually trigger data reload
  const addRegisterMutation = useProductRegister();
  const UpdateServiceMutation = useUpdateProduct(serviceId);
  const DeleteServiceMutation = useDeleteProduct(serviceId);
  const serviceData = productData?.data || [];
  console.log(serviceData);
  // const serviceData: any[] =  [];
  const navigate = useNavigate();

  const columnDefs = [
    {
      field: "srNo",
      headerName: "Sr No.",
      cellRenderer: (params: any) => params.node.rowIndex + 1,
    },
    { field: "productCode", headerName: "Product Code" },
    { field: "brandName.brandName", headerName: "Brand Name" },
    { field: "productName", headerName: "Product Name" },
    { field: "modelNo", headerName: "Model No" },
    { field: "itemCategory.categoryName", headerName: "Product Category" },
    { field: "itemType.typeName", headerName: "Product Type" },
    { field: "mrp", headerName: "MRP" },

    { field: "starRating.starRating", headerName: "Star Rating" },

    { field: "refGasType.gasTypeName", headerName: "Gas Type Name" },

    { field: "tonCapacity.tonCapacityName", headerName: "Ton Capacity" },

    { field: "salesUnitMeasurement.uom", headerName: "Sales Unit Measurement" },
    {
      field: "purchaseUnitMeasurement.uom",
      headerName: "Purchase Unit Measurement",
    },
    { field: "baseUnitMeasurement.uom", headerName: "Base Unit Measurement" },
    { field: "itemStatus.statusName", headerName: "Item Status" },

    { field: "reoderLevel", headerName: "ReoderLevel" },
    // { field: "MRP", headerName: "MRP" },
    { field: "reoderLevel", headerName: "ReoderLevel" },
    { field: "minQuantity", headerName: "Min Quantity" },
    { field: "maxQuantity", headerName: "Max Quantity" },

    // { field: "purchase", headerName: "Max Quantity" },
    { field: "sizes", headerName: "Sizes" },

    {
      field: "isActive",
      headerName: "Status (isActive)",
      cellRenderer: (params: any) => (params.value ? "Active" : "Inactive"),
    },
  ];

  const handleOpenChange = () => {
    setEditData(""); // Ensure form is reset for adding a new service
    setServiceId(null); // Reset service ID to indicate adding mode
    // setIsModalOpen(true);
    navigate("/app/product-list/productform");
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
    console.log("action", data.id);
    setEditData(data);
    // setIsModalOpen(true);
    // navigate(`/app/product-list/productform?${data.id}`);
    navigate(`/app/product-list/productform?id=${data.id}`);
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
      <h1 className="heading-primary">Product List</h1>
      <div className="p-6 ">
        {" "}
        <DataTable
          rowData={serviceData}
          colDefs={columnDefs}
          isLoading={isLoading}
          onAddClick={handleOpenChange}
          onEditClick={handleEdit}
          onDeleteClick={handleDelete}
          exportFileName="Product_List"
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
        width="100%"
        height="100%"
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

export default ProductListRoute;
