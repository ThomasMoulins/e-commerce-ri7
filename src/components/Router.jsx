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
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </CartProvider>
      </StockProvider>
    </ProductsProvider>
  );
};

export default Router;
