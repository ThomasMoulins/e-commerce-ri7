import { useContext } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import { SearchContext } from "./Navbar/SearchContext";
import { ProductsContext } from "./Stock/ProductsContext";
import { quantum } from "ldrs";

const MainContent = styled.div`
  margin-top: 64px; /* Compense la hauteur de la navbar */
`;

const Home = () => {
  const { products, isLoaded, error } = useContext(ProductsContext);
  const { searchQuery } = useContext(SearchContext);
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
      <MainContent>
        <h1>SHOP</h1>
        {searchQuery && searchQuery.length > 2 && (
          <h2>Résultats pour : "{searchQuery}"</h2>
        )}
        <ProductCard products={filteredProducts} />
      </MainContent>
    );
  }
};

export default Home;
