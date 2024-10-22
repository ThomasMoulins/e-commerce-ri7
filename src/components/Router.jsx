import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import Category from "./category";
import Navbar from "./Navbar";
import Cart from "./Cart";

const Router = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer style={{ marginTop: "6rem" }} />
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default Router;
