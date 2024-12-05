import { useState } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import AdminHeader from "./components/AdminHeader";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}> 
        
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetails/>} />

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
