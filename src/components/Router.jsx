// Contexte
import { ThemeProvider } from "./ThemeContext";
import { CartProvider } from "./Cart/CartContext";
import { ProductsProvider } from "./Stock/ProductsContext";
// Externe
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Éléments/pages
import Navbar from "./Navbar";
import Home from "./Home";
import Category from "./category";
import StockManagement from "./Stock/StockManagement";
import Cart from "./Cart/Cart";
import Success from "./Cart/Success";
import Cancel from "./Cart/Cancel";

const Router = () => {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <ToastContainer style={{ marginTop: "6rem" }} />
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/stock" element={<StockManagement />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  );
};

export default Router;
