import React, { useEffect, useState } from "react";

export interface Product {
  id: string | number;
  productName: string;
}

export interface InstallationRowData {
  id: number;
  product: Product;
  quantity: number;
}

interface InstalltionRowProps {
  installationProductQuantities?: InstallationRowData[];
  products?: Product[];
  onRowsChange: (rows: InstallationRowData[]) => void;
}

const InstallationProductRow: React.FC<InstalltionRowProps> = ({
  installationProductQuantities = [],
  products = [],
  onRowsChange,
}) => {
  const [rows, setRows] = useState<InstallationRowData[]>([
    {
      id: Date.now(),
      product: { id: "", productName: "" },
      quantity: 1,
    },
  ]);

  // Sync with props when materialQuantities changes
  useEffect(() => {
    if (installationProductQuantities.length > 0) {
      setRows(installationProductQuantities);
    }
  }, [installationProductQuantities]);

  // Handle row changes
  const handleRowChange = (
    id: number,
    field: "product" | "quantity",
    value: any
  ) => {
    const updatedRows = rows.map((row) =>
      row.id === id
        ? {
            ...row,
            product: field === "product" ? value : row.product,
            quantity: field === "quantity" ? Number(value) : row.quantity,
          }
        : row
    );

    setRows(updatedRows);
    onRowsChange(updatedRows);
  };

  // Add new row
  const handleAddRow = () => {
    const newRow: InstallationRowData = {
      id: Date.now(),
      product: { id: "", productName: "" },
      quantity: 1,
    };

    setRows((prevRows) => {
      const updatedRows = [...prevRows, newRow];
      onRowsChange(updatedRows);
      return updatedRows;
    });
  };

  // Remove row
  const handleRemoveRow = (id: number) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);
      onRowsChange(updatedRows);
      return updatedRows;
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 mb-6">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border px-4 py-2 text-left">Sr.No</th>
              <th className="border px-4 py-2 text-left">Product</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border px-4 py-2">{index + 1}</td>

                {/* Material Dropdown */}
                <td className="border px-4 py-2">
                  <select
                    className="border rounded-md px-2 py-1 w-full bg-transparent"
                    value={row.product.id || ""}
                    onChange={(e) => {
                      const selectedMaterial = products.find(
                        (mat) => mat.id.toString() === e.target.value
                      );
                      if (selectedMaterial) {
                        handleRowChange(row.id, "product", selectedMaterial);
                      }
                    }}
                  >
                    <option value="">Select Product</option>
                    {products.map((mat) => (
                      <option key={mat.id} value={mat.id}>
                        {mat.productName}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Quantity Field */}
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    className="border rounded-md px-2 py-1 w-20 bg-transparent"
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

                {/* Actions */}
                <td className="border px-4 py-2 text-center">
                  {/* {rows.length > 1 && ( */}
                  <button
                    onClick={() => handleRemoveRow(row.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                  {/* )} */}
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
  );
};

export default InstallationProductRow;
