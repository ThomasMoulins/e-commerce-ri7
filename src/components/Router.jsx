import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Category from "./category";
import { CartProvider } from "./CartContext";
import Navbar from "./Navbar";

const Router = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default Router;
