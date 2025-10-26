import React, { useEffect, useState } from "react";

interface ProductRowProps {
  salesProductQuantities: any;
  products?: {
    id: string | number;
    productName: string;
    hsnCode: string;
    mrp: number;
    cgst: number;
  }[];
  onRowsChange: (
    rows: {
      id: number;
      product: {
        id: string | number;
        productName: string;
        hsnCode: string;
      };
      quantity: number;
      mrp: number;
      gst: number;
    }[]
  ) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  salesProductQuantities,
  products = [],
  onRowsChange,
}) => {
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      product: { id: "", productName: "", hsnCode: "" },
      quantity: 1,
      mrp: 0,
      gst: 0,
    },
  ]);

  useEffect(() => {
    if (salesProductQuantities) {
      setRows(salesProductQuantities);
    }
  }, [salesProductQuantities]);

  const handleAddRow = () => {
    const updatedRows = [
      ...rows,
      {
        id: Date.now(),
        product: { id: "", productName: "", hsnCode: "" },
        quantity: 1,
        mrp: 0,
        gst: 0,
      },
    ];
    setRows(updatedRows);
    onRowsChange(updatedRows);
  };

  const handleRowChange = (
    id: number,
    field: "product" | "quantity" | "mrp" | "gst",
    value: any
  ) => {
    const updatedRows = rows.map((row) =>
      row.id === id
        ? {
            ...row,
            product:
              field === "product"
                ? {
                    id: value.id,
                    productName: value.productName,
                    hsnCode: value.hsnCode,
                  }
                : row.product,
            quantity: field === "quantity" ? Number(value) : row.quantity,
            mrp:
              field === "product"
                ? value.mrp
                : field === "mrp"
                ? Number(value)
                : row.mrp,
            gst:
              field === "product"
                ? value.cgst
                : field === "gst"
                ? Number(value)
                : row.gst,
          }
        : row
    );

    setRows(updatedRows);
    onRowsChange(updatedRows);
  };

  const handleRemoveRow = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    onRowsChange(updatedRows);
  };

  return (
    <>
      {/* <div>{salesProductQuantities}</div> */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Add Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 mb-6">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border px-4 py-2">Sr.No</th>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">HSN Code</th>
                <th className="border px-4 py-2">MRP</th>
                <th className="border px-4 py-2">GST</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className="border px-4 py-2">{index + 1}</td>

                  {/* Product Dropdown */}
                  <td className="border px-4 py-2">
                    <select
                      className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
                      value={row.product?.id || ""}
                      onChange={(e) => {
                        const selectedProduct = products.find(
                          (product) => product.id.toString() === e.target.value
                        );
                        if (selectedProduct) {
                          handleRowChange(row.id, "product", selectedProduct);
                        }
                      }}
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.productName}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Quantity Field */}
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="bg-transparent border rounded-md px-2 py-1 w-20"
                      min={1}
                      value={row.quantity}
                      onChange={(e) =>
                        handleRowChange(
                          row.id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>

                  {/* HSN Code */}
                  <td className="border px-4 py-2">
                    {row.product?.hsnCode || "-"}
                  </td>

                  {/* MRP Field */}
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min={0}
                      className="bg-transparent border rounded-md px-2 py-1 w-40"
                      value={row.mrp || ""}
                      onChange={(e) =>
                        handleRowChange(row.id, "mrp", Number(e.target.value))
                      }
                    />
                  </td>

                  {/* GST Field */}
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min={0}
                      className="bg-transparent border rounded-md px-2 py-1 w-20"
                      value={row.gst || ""}
                      onChange={(e) =>
                        handleRowChange(row.id, "gst", Number(e.target.value))
                      }
                    />
                  </td>

                  {/* Actions */}
                  <td className="border px-4 py-2 text-center">
                    {rows.length > 1 && (
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>
    </>
  );
};

export default ProductRow;
