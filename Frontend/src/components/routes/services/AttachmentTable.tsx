import React from "react";

interface TableColumn {
    key: string;
    label: string;
    render?: (item: any, index?: number) => React.ReactNode;
  }
  

interface TableProps {
  columns: TableColumn[];
  data: any[];
  onRemove?: (id: string | number) => void;
  onLinkClick?: (e: React.MouseEvent, url: string) => void;
}

const AttachmentTable: React.FC<TableProps> = ({ columns, data}) => {
  return (
    <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-200 mb-6">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          {columns.map((col) => (
            <th key={col.key} className="border px-4 py-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col.key} className="border px-4 py-2">
                {col.render ? col.render(item, index) : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default AttachmentTable;
