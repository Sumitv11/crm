

import React, { useState } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";

interface Clinic {
  clinicId: number;
  clinicName: string;
}

interface ClinicListProps {
  options: Clinic[]; // List of clinics to display
  onSelectClinic: (clinicId: number) => void; // Callback for selecting a clinic
  selectedClinicId: number | null; // The clinic currently selected
  title?: string; // Optional title for the dropdown
  searchPlaceholder?: string; // Optional placeholder for the search input
  emptyStateText?: string; // Optional text to display when no clinics match the search
  searchable?: boolean; // Whether the list is searchable
  className?: string; // Optional additional class names
  showDelete?: boolean; // Prop to control the visibility of the delete button
  onDeleteClinic?: (clinicId: number) => void; // Optional callback for deleting a clinic
}

const SearchDropdown: React.FC<ClinicListProps> = ({
  options = [],
  onSelectClinic,
  selectedClinicId,
  title = "Clinic Selection",
  searchPlaceholder = "Search by Clinic Name",
  emptyStateText = "No clinics found.",
  searchable = true,
  className = "",
  showDelete = false,
  onDeleteClinic,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search term
  const filteredItems = options.filter(
    (item) =>
      item?.clinicName &&
      item.clinicName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (clinicId: number) => {
    onSelectClinic(clinicId);
  };

  const handleDelete = (clinicId: number) => {
    onDeleteClinic && onDeleteClinic(clinicId); // Call delete function only if provided
  };

  return (
    <div
      className={`p-6 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:text-white rounded-lg shadow-lg ${className}`}
    >
      {title && (
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      )}
      {searchable && (
        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 mb-4 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <span  className="absolute left-3 top-3 mt-1 text-gray-500 dark:text-gray-400"  > <FiSearch/></span>
        </div>
      )}
      <ul className="max-h-60 overflow-y-auto border rounded-lg bg-gray-50 dark:bg-gray-800 shadow-inner">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li
  key={item.clinicId}
  className={`p-3 cursor-pointer transition-all rounded-md flex justify-between items-center ${
    selectedClinicId === item.clinicId
      ? "bg-blue-500 text-white"
      : "bg-white hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600"
  }`}
  onClick={() => handleSelect(item.clinicId)}
>
  {item.clinicName}
  {showDelete && onDeleteClinic && (
    <span
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering the select when clicking delete
        handleDelete(item.clinicId);
      }}
      className="text-red-500 cursor-pointer hover:text-red-700"
      title="Delete clinic"
    >
      <FiTrash2 />
    </span>
  )}
</li>

          ))
        ) : (
          <li className="p-3 text-center text-gray-500 dark:text-gray-400">
            {emptyStateText}
          </li>
        )}
      </ul>
    </div>
  );
};

export default SearchDropdown;
