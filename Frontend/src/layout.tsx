import React from "react";
// import { useLocation } from "react-router-dom"; // To get the current route
import Sidebar from "./components/FLNS/Sidebar";
import Navbar from "./components/FLNS/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const location = useLocation(); // Get the current route path

  // Check if the current route is not the login route
  // const isLoginRoute = location.pathname === "/";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render sidebar and navbar only if the route is not '/login' */}
      {/* {!isLoginRoute && ( */}
      <>
        <div>
          {" "}
          <Sidebar />
        </div>

        <div className="relative flex  flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Star ===== --> */}
          <Navbar />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Star ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-4">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
      </>
    </div>
  );
};

export default Layout;
