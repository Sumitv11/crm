"use client";
import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaChartColumn } from "react-icons/fa6";
import { MdAddCircleOutline, MdMoreVert } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import * as XLSX from "xlsx";
import { useTheme } from "next-themes";

interface DataTableProps {
  rowData: any[];
  colDefs: any[];
  isLoading: boolean;
  onAddClick?: () => void;
  addLabel?: string;
  addComponent?: React.ReactNode;
  onEditClick?: (data: any) => void;
  onDeleteClick?: (data: any) => void;
  actionComponents?: React.ComponentType<{ rowData: any }>[];
  showEdit?: boolean;
  showDelete?: boolean;
  showCheckbox?: boolean;
  checkboxPosition?: number;
  exportFileName?: string;
}
const DataTable: React.FC<DataTableProps> = ({
  rowData,
  colDefs,
  isLoading,
  onAddClick,
  addLabel = "Add New",
  addComponent,
  onEditClick,
  onDeleteClick,
  actionComponents = [],
  showEdit = true,
  showDelete = true,
  showCheckbox = false,
  checkboxPosition = 0,
  exportFileName,
}) => {
  const { theme } = useTheme();
  const gridRef = useRef<AgGridReact<any>>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(colDefs.map((col) => col.field))
  );

  // const [localRowData, setLocalRowData] = useState(rowData);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };

  const checkboxColumn = showCheckbox
    ? {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        width: 50,
        headerName: "",
      }
    : null;

  const ActionCellRenderer: React.FC<any> = (params) => {
    if (!params?.data) return null;

    return (
      <div className="flex justify-center items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MdMoreVert />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {showEdit && (
              <DropdownMenuItem onClick={() => onEditClick?.(params.data)}>
                <FaEdit /> Edit
              </DropdownMenuItem>
            )}
            {showDelete && (
              <DropdownMenuItem
                onClick={() => onDeleteClick?.(params.data)}
                className="text-red-500"
              >
                <FaTrash /> Delete
              </DropdownMenuItem>
            )}
            {actionComponents.map((Component, index) => (
              <DropdownMenuItem key={index}>
                <Component rowData={params.data} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const actionColumn: any = {
    headerName: "Actions",
    field: "actions",
    cellRenderer: ActionCellRenderer,
    minWidth: 120,
    maxWidth: 150,
    flex: 0,
  };

  const extendedColDefs = useMemo(() => {
    const columns = [...colDefs];
    if (showCheckbox && checkboxColumn) {
      columns.splice(checkboxPosition, 0, checkboxColumn);
    }
    return [
      ...columns.filter((col) => selectedKeys.has(col.field)),
      actionColumn,
    ];
  }, [colDefs, checkboxColumn, selectedKeys]);

  const toggleSelection = (field: string, checked: boolean) => {
    setSelectedKeys((prevKeys) => {
      const newKeys = new Set(prevKeys);
      if (checked) {
        newKeys.add(field);
      } else {
        newKeys.delete(field);
      }
      return newKeys;
    });
  };

  //   const handleDialogSubmit = (formData: any) => {
  //   setLocalRowData((prevData) => [
  //     ...prevData,
  //     { ...formData, age: Number(formData.age) },
  //   ]);
  // };

  const exportToExcel = (rowData: any[], colDefs: any[], fileName?: string) => {
    const headers = [
      "Sr No.",
      ...colDefs
        .filter((col) => col.field !== "actions" && col.field !== "srNo")
        .map((col) => col.headerName),
    ];

    const data = rowData.map((row, index) => [
      index + 1,
      ...colDefs
        .filter((col) => col.field !== "actions" && col.field !== "srNo")
        .map((col) => row[col.field] ?? ""),
    ]);

    const worksheetData = [headers, ...data];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TableData");

    XLSX.writeFile(workbook, `${fileName || "TableData"}.xlsx`);
  };

  const paginationPageSizeSelector = [10, 20, 50, 100];
  return (
    <div
      className={`${
        theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
      } w-full h-[480px] flex flex-col gap-2`}
    >
      <div className="w-full flex justify-between items-center">
        {addComponent || (
          <Button variant="default" onClick={onAddClick}>
            <MdAddCircleOutline />
            {addLabel}
          </Button>
        )}
        <div className="flex gap-2">
          <Button
            onClick={() => exportToExcel(rowData, colDefs, exportFileName)}
            variant="default"
          >
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <FaChartColumn />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {colDefs.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.field}
                  checked={selectedKeys.has(col.field)}
                  onSelect={(event) => {
                    event.preventDefault(); // prevent closing
                    toggleSelection(col.field, !selectedKeys.has(col.field));
                  }}
                >
                  {col.headerName}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        loading={isLoading}
        columnDefs={extendedColDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        pagination={true}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default DataTable;
