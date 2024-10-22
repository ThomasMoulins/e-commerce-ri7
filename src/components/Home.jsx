import { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import { SearchContext } from "./SearchContext";

const MainContent = styled.div`
  margin-top: 64px; /* Compense la hauteur de la navbar */
`;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setProducts(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <MainContent>
        <h1>SHOP</h1>
        {searchQuery && <h2>Résultats pour : "{searchQuery}"</h2>}
        <ProductCard products={filteredProducts} />
      </MainContent>
    );
  }
};

export default Home;
