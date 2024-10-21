import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Category from "./Category";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
