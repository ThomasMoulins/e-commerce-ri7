// react
import { useContext } from "react";
// Contexte
import { ProductsContext } from "./ProductsContext";
// Externe
import { quantum } from "ldrs";
// Éléments/pages
import StockCard from "./StockCard";

const StockManagement = () => {
  const { products, isLoaded, error, searchQuery } =
    useContext(ProductsContext);
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
    return <l-quantum size="150" speed="1.5" color="white"></l-quantum>;
  } else {
    return (
      <>
        <h1>Gestion des Stocks</h1>
        {searchQuery && searchQuery.length > 2 && (
          <h2>Résultats pour : "{searchQuery}"</h2>
        )}
        <StockCard products={filteredProducts} />
      </>
    );
  }
};

export default StockManagement;
