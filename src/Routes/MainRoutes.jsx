import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailPage from "../DetailPage";
import { ProductList } from "../ProductList/ProductList";
import Cart from "../Cart";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/productdetails/:id" element={<DetailPage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default MainRoutes;
