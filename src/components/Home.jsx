// React
import { useContext } from "react";
// Contexte
import { ThemeContext } from "./ThemeContext";
import { ProductsContext } from "./Stock/ProductsContext";
// Externe
import { quantum } from "ldrs";
// // Éléments/pages
import ProductCard from "./ProductCard";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "light" ? "black" : "white";
  const { products, isLoaded, error } = useContext(ProductsContext);
  const { searchQuery } = useContext(ProductsContext);
  quantum.register();

  const filteredProducts =
    searchQuery.length > 2
      ? products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <>
        <h1>
          <l-quantum size="150" speed="1.5" color={color}></l-quantum>
        </h1>
      </>
    );
  } else {
    return (
      <>
        <h1>SHOP</h1>
        {searchQuery && searchQuery.length > 2 && (
          <h2>Résultats pour : "{searchQuery}"</h2>
        )}
        <ProductCard products={filteredProducts} />
      </>
    );
  }
};

export default Home;
