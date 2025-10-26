import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./AuthContext";
import Login from "./components/FLNS/Login";
import Home from "./Home";
import "./App.css";
import Layout from "./layout";
import CustomerListRoute from "./components/routes/customerlist";
import SalesRoute from "./components/routes/sales";
import CreateForm from "./components/routes/sales/CreateForm";
import ProductListRoute from "./components/routes/productlist";
import CreateProductForm from "./components/routes/productlist/CreateProductForm";
import CustomerTypeRoute from "./components/settingroutes/customer-type";
import SourceOfReferenceRoute from "./components/settingroutes/source-of-reference";
import ReferenceDetailsRoute from "./components/settingroutes/reference-details";
import CustomerStatusRoute from "./components/settingroutes/customer-status";
import DesignationRoute from "./components/settingroutes/designation";
import ItemCategoryRoute from "./components/settingroutes copy/item-category";
import ItemTypeRoute from "./components/settingroutes copy/item-type";
import ItemStatusRoute from "./components/settingroutes copy/item-status";
import StarRatingRoute from "./components/settingroutes copy/star-rating";
import RefGasTypeRoute from "./components/settingroutes copy/ref-gas-type";
import TonCapacityRoute from "./components/settingroutes copy/ton-capacity";
import UnitofMeasurementsRoute from "./components/settingroutes copy/unit-of-measurements";
import UserRoute from "./components/routes/user";
import InstallationLocationRoute from "./components/routes/installation-location";
import DeliveryChallanForm from "./components/routes/delivery-challan/DeliveryChallanForm";
import DeliveryChallanRoute from "./components/routes/delivery-challan";
import InstallationForm from "./components/routes/installation/InstallationForm";
import InstallationRoute from "./components/routes/installation";
import ServicesRoute from "./components/routes/services";
import ServicesForm from "./components/routes/services/ServicesForm";
import BrandNameRoute from "./components/settingroutes copy/brandName";
import OrderTypeRoute from "./components/settingroutes copy/order-type";
import MaterialRoute from "./components/settingroutes copy/material";
import ProfileAppearance from "./components/routes/Profile/profileAppearance";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login route, no sidebar/navbar */}
          <Route path="/" element={<Login />} />

          {/* Protected routes, these will render the sidebar/navbar */}
          <Route
            path="/app/home"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/app/customer-list"
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomerListRoute />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* <Route path="/app/customer-list/customerform" element={<Layout><CustomerForm /></Layout>} /> */}
          <Route
            path="/app/sales"
            element={
              <ProtectedRoute>
                <Layout>
                  <SalesRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/sales/createform"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/app/product-list"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductListRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/customer-type"
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomerTypeRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/product-list/productform"
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateProductForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/SourceOfReference"
            element={
              <ProtectedRoute>
                <Layout>
                  <SourceOfReferenceRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/reference-details"
            element={
              <ProtectedRoute>
                <Layout>
                  <ReferenceDetailsRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/customer-status"
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomerStatusRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/designation"
            element={
              <ProtectedRoute>
                <Layout>
                  <DesignationRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/item-category"
            element={
              <ProtectedRoute>
                <Layout>
                  <ItemCategoryRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/item-type"
            element={
              <ProtectedRoute>
                <Layout>
                  <ItemTypeRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/order-type"
            element={
              <ProtectedRoute>
                <Layout>
                  <OrderTypeRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/item-status"
            element={
              <ProtectedRoute>
                <Layout>
                  <ItemStatusRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/star-rating"
            element={
              <ProtectedRoute>
                <Layout>
                  <StarRatingRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/ref-gas-type"
            element={
              <ProtectedRoute>
                <Layout>
                  <RefGasTypeRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/ton-capacity"
            element={
              <ProtectedRoute>
                <Layout>
                  <TonCapacityRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/material"
            element={
              <ProtectedRoute>
                <Layout>
                  <MaterialRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/unit-of-measurements"
            element={
              <ProtectedRoute>
                <Layout>
                  <UnitofMeasurementsRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/brand-name"
            element={
              <ProtectedRoute>
                <Layout>
                  <BrandNameRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/user"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/installation-location"
            element={
              <ProtectedRoute>
                <Layout>
                  <InstallationLocationRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/delivery-challan"
            element={
              <ProtectedRoute>
                <Layout>
                  <DeliveryChallanRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/delivery-challan/delivery-challan-form"
            element={
              <ProtectedRoute>
                <Layout>
                  <DeliveryChallanForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/installation"
            element={
              <ProtectedRoute>
                <Layout>
                  <InstallationRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/installation/installation-form"
            element={
              <ProtectedRoute>
                <Layout>
                  <InstallationForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/services"
            element={
              <ProtectedRoute>
                <Layout>
                  <ServicesRoute />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/services/services-form"
            element={
              <ProtectedRoute>
                <Layout>
                  <ServicesForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/appearance"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfileAppearance />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
