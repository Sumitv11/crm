import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggler from "../header/ThemeToggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/AuthContext";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoColorPaletteSharp } from "react-icons/io5";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  // DialogTitle, // Not needed for fixed header
  // DialogDescription, // Not needed for fixed header
} from "../ui/dialog";
import { Button } from "../ui/button";

// Icons
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
// import { MdKeyboardDoubleArrowRight } from "https://cdn.skypack.dev/react-icons/bi"; // Corrected import for MdKeyboardDoubleArrowRight
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// --- START: UPDATED commandItems with ALL sub-options from images ---
const commandItems = [
  { group: "Main Navigation", label: "Dashboard", path: "/app/home" },
  {
    group: "Main Navigation",
    label: "Product List",
    path: "/app/product-list",
  },
  { group: "Main Navigation", label: "User", path: "/app/user" },

  {
    group: "Transaction",
    label: "Customer List",
    path: "/app/customer-list",
  },
  { group: "Transaction", label: "Sales", path: "/app/sales" },
  {
    group: "Transaction",
    label: "Installation-Location",
    path: "/app/installation-location",
  },
  {
    group: "Transaction",
    label: "Delivery Challan",
    path: "/app/delivery-challan",
  },
  {
    group: "Transaction",
    label: "Installation",
    path: "/app/delivery-challan",
  },
  { group: "Transaction", label: "Services", path: "/app/services" },

  {
    group: "Customer Setting",
    label: "Customer Type",
    path: "/app/customer-type",
  },
  {
    group: "Customer Setting",
    label: "Source of Reference",
    path: "/app/SourceOfReference",
  },
  {
    group: "Customer Setting",
    label: "Reference Details",
    path: "/app/reference-details",
  },
  {
    group: "Customer Setting",
    label: "Customer Status",
    path: "/app/customer-status",
  },
  {
    group: "Customer Setting",
    label: "Designation",
    path: "/app/designation",
  },

  // Product Setting and its sub-options (NEW ADDITIONS)

  {
    group: "Product Setting",
    label: "Item Category",
    path: "/app/item-category",
  },
  {
    group: "Product Setting",
    label: "Item Type",
    path: "/app/item-type",
  },
  {
    group: "Product Setting",
    label: "Item Status",
    path: "/app/item-status",
  },
  {
    group: "Product Setting",
    label: "Star Rating",
    path: "/app/star-rating",
  },
  {
    group: "Product Setting",
    label: "Ref Gas Type",
    path: "/app/ref-gas-type",
  },
  {
    group: "Product Setting",
    label: "Order Type",
    path: "/app/order-type",
  },
  {
    group: "Product Setting",
    label: "Ton Capacity",
    path: "/app/ton-capacity",
  },
  {
    group: "Product Setting",
    label: "Unit Of Measurements",
    path: "/app/unit-of-measurements",
  },
  {
    group: "Product Setting",
    label: "Brand Names",
    path: "/app/brand-name",
  },
  {
    group: "Product Setting",
    label: "Material",
    path: "/app/material",
  },
];
// --- END: UPDATED commandItems ---

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(commandItems);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleThemePage = () => {
    navigate("/app/appearance");
  };

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = userData?.userName || "";
  const lastName = userData?.email || "";
  const avatarFallback =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "DB";

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(commandItems);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const newFilteredItems = commandItems.filter(
        (item) =>
          item.label.toLowerCase().includes(lowerCaseSearch) ||
          item.group.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredItems(newFilteredItems);
    }
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isDialogOpen) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedIndex((prevIndex) =>
            Math.min(prevIndex + 1, filteredItems.length - 1)
          );
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === "Enter") {
          event.preventDefault();
          if (selectedIndex >= 0 && filteredItems[selectedIndex]) {
            navigate(filteredItems[selectedIndex].path);
            setIsDialogOpen(false);
            setSearchTerm("");
          }
        } else if (event.key === "Escape") {
          setIsDialogOpen(false);
          setSearchTerm("");
        }
      } else if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsDialogOpen(true);
      }
    },
    [isDialogOpen, filteredItems, selectedIndex, navigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isDialogOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDialogOpen]);

  // Group items for rendering
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof commandItems>);

  return (
    <header className="w-full h-[3.8rem] bg-white shadow-lg shadow-gray-500/10 p-4 flex justify-between dark:bg-gray-900 dark:text-white items-center">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        {/* Dashboard */}
      </h1>
      <div className="flex items-center space-x-4">
        {/* Command Palette Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            variant="outline"
            className="hidden sm:flex h-9 w-48 justify-between text-sm text-muted-foreground items-center"
            onClick={() => setIsDialogOpen(true)}
          >
            <span className="flex items-center gap-2">
              <IoSearchOutline className="h-4 w-4" />
              Search...
            </span>
          </Button>
          {/* For smaller screens, just a search icon */}
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsDialogOpen(true)}
          >
            <IoSearchOutline className="h-4 w-4" />
          </Button>

          <DialogContent className="p-0 sm:max-w-[450px] flex flex-col h-[80vh]">
            {/* Fixed Header */}
            <DialogHeader className="p-2 border-b">
              <div className="relative flex items-center">
                <IoSearchOutline className="absolute left-4 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  ref={inputRef}
                  className="flex h-10 w-full rounded-md border-none bg-background py-2 pl-10 pr-8 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Type a command or search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </DialogHeader>

            {/* Scrollable Content with custom scrollbar */}
            <div
              className="flex-1 overflow-y-auto py-2
                         scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200
                         dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
            >
              {Object.keys(groupedItems).length === 0 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 p-4">
                  No results found.
                </p>
              )}
              {Object.keys(groupedItems).map((groupName) => (
                <React.Fragment key={groupName}>
                  <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {groupName}
                  </h3>
                  {groupedItems[groupName].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                      ${
                        selectedIndex ===
                        filteredItems.findIndex((f) => f.label === item.label)
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
                      }`}
                      onClick={() => {
                        navigate(item.path);
                        setIsDialogOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <MdKeyboardDoubleArrowRight className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Theme toggler */}
        <ThemeToggler />

        {/* Avatar with Dropdown for Logout */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={"/default-avatar.png"} alt="Profile Picture" />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleThemePage}>
              <IoColorPaletteSharp /> Appearance
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <RiLogoutCircleRLine />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
