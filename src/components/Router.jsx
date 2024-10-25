import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Cart/CartContext";
import { SearchProvider } from "./Navbar/SearchContext";
import { ProductsProvider } from "./Stock/ProductsContext";
import { StockProvider } from "./Stock/StockContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import Category from "./category";
import Navbar from "./Navbar/Navbar";
import Cart from "./Cart/Cart";
import StockManagement from "./Stock/StockManagement";
import Success from "./Cart/Success";
import Cancel from "./Cart/Cancel";

const Router = () => {
  return (
    <ProductsProvider>
      <StockProvider>
        <CartProvider>
          <SearchProvider>
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
          </SearchProvider>
        </CartProvider>
      </StockProvider>
    </ProductsProvider>
  );
};

export default Router;
