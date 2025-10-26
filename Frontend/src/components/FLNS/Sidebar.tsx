import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiUser, FiMenu } from "react-icons/fi";
import { RxDashboard, RxCross2 } from "react-icons/rx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbReportAnalytics } from "react-icons/tb";
import { TiArrowSortedDown } from "react-icons/ti";
import { RiUserSettingsLine } from "react-icons/ri";

const navItems = [
  { label: "Dashboard", path: "/app/home", icon: <RxDashboard /> },
  {
    label: "Product List",
    path: "/app/product-list",
    icon: <TbReportAnalytics />,
  },
  { label: "User", path: "/app/user", icon: <FiUser /> },
  {
    label: "Transaction",
    path: "",
    icon: <CgProfile />,
    subLinks: [
      { label: "Customer List", path: "/app/customer-list" },
      { label: "Sales", path: "/app/sales" },
      { label: "Installation-Location", path: "/app/installation-location" },
      { label: "Delivery Challan", path: "/app/delivery-challan" },
      { label: "Installation", path: "/app/installation" },
      { label: "Services", path: "/app/services" },
    ],
  },
  {
    label: "Customer Setting",
    path: "",
    icon: <RiUserSettingsLine />,
    subLinks: [
      { label: "Customer Type", path: "/app/customer-type" },
      { label: "Source of Reference", path: "/app/SourceOfReference" },
      { label: "Reference Details", path: "/app/reference-details" },
      { label: "Customer Status", path: "/app/customer-status" },
      { label: "Designation", path: "/app/designation" },
    ],
  },
  {
    label: "Product Setting",
    path: "",
    icon: <FiSettings />,
    subLinks: [
      { label: "Item Category", path: "/app/item-category" },
      { label: "Item Type", path: "/app/item-type" },
      { label: "Item Status", path: "/app/item-status" },
      { label: "Star Rating", path: "/app/star-rating" },
      { label: "Ref Gas Type", path: "/app/ref-gas-type" },
      { label: "Order Type", path: "/app/order-type" },
      { label: "Ton Capacity", path: "/app/ton-capacity" },
      { label: "Unit Of Measurements", path: "/app/unit-of-measurements" },
      { label: "Brand Names", path: "/app/brand-name" },
      { label: "Material", path: "/app/material" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    let matchedItem = navItems.find((item) =>
      item.subLinks?.some((link) => link.path === currentPath)
    );

    if (!matchedItem) {
      matchedItem = navItems.find((item) => item.path === currentPath);
    }

    if (matchedItem?.subLinks) {
      setOpenDropdown(matchedItem.label);
    }

    setSelectedItem(currentPath);
  }, [location.pathname]);

  const handleItemClick = (label: string, path: string) => {
    setSelectedItem(path);
    navigate(path);
    if (isMobile) setIsOpen(false);
  };

  return (
    <div className="bg-sidebar text-sidebar-foreground">
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50"
        >
          <FiMenu size={24} className="text-black dark:text-white" />
        </button>
      )}

      <div
        className={`${
          isMobile
            ? `fixed top-0 left-0 h-screen shadow-md z-40 transition-transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `h-screen shadow-md transition-all ${isOpen ? "w-52" : "w-16"}`
        } bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col`}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          {isOpen && <h1 className="text-lg font-bold">CRM</h1>}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RxCross2 size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-1 py-2 space-y-1">
          {navItems.map((item) => {
            const isParentActive =
              item.path === location.pathname ||
              item.subLinks?.some((link) => link.path === location.pathname);

            return (
              <div key={item.label}>
                <div
                  onClick={() =>
                    item.subLinks
                      ? setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      : handleItemClick(item.label, item.path)
                  }
                  className={`flex items-center gap-2 p-2 text-sm rounded cursor-pointer transition-colors ${
                    isParentActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:underline underline-offset-1 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>{item.icon}</TooltipTrigger>
                      <TooltipContent>{item.label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {isOpen && <span>{item.label}</span>}
                  {item.subLinks && isOpen && (
                    <TiArrowSortedDown
                      className={`ml-auto transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                <AnimatePresence>
                  {item.subLinks && openDropdown === item.label && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-0.5 space-y-1"
                    >
                      {item.subLinks.map((subLink) => (
                        <div
                          key={subLink.label}
                          onClick={() =>
                            handleItemClick(subLink.label, subLink.path)
                          }
                          className={`p-1.5 text-sm rounded cursor-pointer transition-colors ${
                            location.pathname === subLink.path
                              ? "bg-primary text-primary-foreground"
                              : "hover:underline underline-offset-1 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {subLink.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
