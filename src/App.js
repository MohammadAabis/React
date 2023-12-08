import logo from "./logo.svg";
import "./App.css";
import Header from "./includes/header";
import Footer from "./includes/footer";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  RouterProvider,
} from "react-router-dom";

import Contact from "./pages/Contact";
import Blogs from "./pages/blogs";
import Home from "./pages/home";
import Category from "./pages/category";
import Products from "./pages/products";
import Cart from "./pages/shoppingCart";
import Checkout from "./pages/checkout";
import Orders from "./pages/order";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter basename="/">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/viewcart" element={<Cart />} />
            <Route path="/order/:oid" element={<Orders />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </>
  );
}

export default App;
