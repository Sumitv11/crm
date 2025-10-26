

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Assuming you have a Popover component in your ui folder
import { CheckIcon } from "lucide-react";

interface ReusableSelectProps {
  options: { value: any; label: string }[]; // Use `any` for the value type
  label?: string;
  placeholder?: string;
  onSelect: (value: any) => void; // Use `any` for the selected value type
  className?: string;
}

const CustomSelect: React.FC<ReusableSelectProps> = ({
  options,
  label,
  placeholder = "Select an option",
  onSelect,
  className = "w-full",
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    onSelect(value); // Pass the selected value to parent
    setIsPopoverOpen(false); // Close the popover after selecting
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          className={`flex items-center justify-between w-full px-4 py-2 border rounded-md cursor-pointer ${className}`}
        >
          {selectedValue ? (
            <span>{options.find((opt) => opt.value === selectedValue)?.label}</span>
          ) : (
            <span className="text-gray-500 ">{placeholder}</span>
          )}
          <span className="text-gray-600">{isPopoverOpen ? "▲" : "▼"}</span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[590px]  shadow-lg rounded-md">
        <div className="flex flex-col">
          {label && (
            <div className="px-4 py-2 text-sm font-bold text-gray-700">
              {label}
            </div>
          )}
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedValue === option.value ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <span>{option.label}</span>
              {selectedValue === option.value && (
                <CheckIcon className="h-4 w-4 text-green-500" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomSelect;
