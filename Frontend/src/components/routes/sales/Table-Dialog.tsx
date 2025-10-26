import React, { useRef, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
//   DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { FaChartColumn } from "react-icons/fa6";

interface AgGridDialogProps {
  title: string;
  rowData: any[];
  columnDefs: any[];
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedData: any[]) => void;
  showCheckbox?: boolean;
  rowSelection?: "single" | "multiple";
  checkboxPosition?: number;
}

const AgGridDialog: React.FC<AgGridDialogProps> = ({
  title,
  rowData,
  columnDefs,
  isLoading = false,
  isOpen,
  onClose,
  onSelect,
  showCheckbox = false,
  rowSelection = "single",
  checkboxPosition = 0,
}) => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(columnDefs.map((col) => col.field))
  );

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  }), []);

  const checkboxColumn = showCheckbox
    ? {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        width: 50,
        headerName: "",
      }
    : null;


  const handleSelect = () => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData = selectedNodes?.map((node) => node.data) ?? [];
    onSelect(selectedData);
    onClose();
  };



  const extendedColDefs = useMemo(() => {
    const columns = [...columnDefs];
    if (showCheckbox && checkboxColumn) {
      columns.splice(checkboxPosition, 0, checkboxColumn);
    }
    return [
      ...columns.filter((col) => selectedKeys.has(col.field)),
   
    ];
  }, [columnDefs, checkboxColumn, selectedKeys]);

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="ag-theme-alpine w-full h-96 ">
          <div className="w-full flex justify-between items-center mb-2">
           
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <FaChartColumn  />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {columnDefs.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.field}
                  checked={selectedKeys.has(col.field)}
                  onCheckedChange={(checked: boolean) =>
                    toggleSelection(col.field, checked)
                  }
                >
                  {col.headerName}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={extendedColDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelection}
            loadingOverlayComponent={isLoading ? "Loading..." : undefined}
          />
        </div>
        <div className="flex justify-end mt-8 space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect}>Select</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgGridDialog;