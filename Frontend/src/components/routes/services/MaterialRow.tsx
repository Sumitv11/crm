import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export interface Material {
  id: string | number;
  materialName: string;
}

export interface MaterialRowData {
  id: number;
  material: Material;
  quantity: number;
}

interface MaterialRowProps {
  materialQuantities?: MaterialRowData[]; // Preloaded materials
  materials?: Material[]; // List of available materials
  onRowsChange: (rows: MaterialRowData[]) => void;
}

const MaterialRow: React.FC<MaterialRowProps> = ({
  materialQuantities = [],
  materials = [],
  onRowsChange,
}) => {
  const [rows, setRows] = useState<MaterialRowData[]>([
    {
      id: Date.now(),
      material: { id: "", materialName: "" },
      quantity: 1,
    },
  ]);

  // Sync with props when materialQuantities changes
  useEffect(() => {
    if (materialQuantities.length > 0) {
      setRows(materialQuantities);
    }
  }, [materialQuantities]);

  // Handle row changes
  const handleRowChange = (
    id: number,
    field: "material" | "quantity",
    value: any
  ) => {
    const updatedRows = rows.map((row) =>
      row.id === id
        ? {
            ...row,
            material: field === "material" ? value : row.material,
            quantity: field === "quantity" ? Number(value) : row.quantity,
          }
        : row
    );

    setRows(updatedRows);
    onRowsChange(updatedRows);
  };

  // Add new row
  const handleAddRow = () => {
    const newRow: MaterialRowData = {
      id: Date.now(),
      material: { id: "", materialName: "" },
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
      <h2 className="text-lg font-semibold mb-4">Add Materials</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 mb-6">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border px-4 py-2 text-left">Sr.No</th>
              <th className="border px-4 py-2 text-left">Material</th>
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
                    value={row.material.id || ""}
                    onChange={(e) => {
                      const selectedMaterial = materials.find(
                        (mat) => mat.id.toString() === e.target.value
                      );
                      if (selectedMaterial) {
                        handleRowChange(row.id, "material", selectedMaterial);
                      }
                    }}
                  >
                    <option value="">Select Material</option>
                    {materials.map((mat) => (
                      <option key={mat.id} value={mat.id}>
                        {mat.materialName}
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
      <Button
        type="button"
        onClick={handleAddRow}
        className="h-[35px] text-sm px-10 py-2 rounded-md"
      >
        Add Material
      </Button>
    </div>
  );
};

export default MaterialRow;
