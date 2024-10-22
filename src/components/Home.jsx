import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";

const MainContent = styled.div`
  margin-top: 64px; /* Compense la hauteur de la navbar */
`;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <MainContent>
        <h1>SHOP</h1>
        <ProductCard products={products} />
      </MainContent>
    );
  }
};

export default Home;
