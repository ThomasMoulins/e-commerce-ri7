import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extraire la catégorie du chemin
  const pathname = location.pathname;
  const category = pathname.split("/category/")[1];

  // Décoder la catégorie pour gérer les espaces et les caractères spéciaux
  const decodedCategory = decodeURIComponent(category);

  useEffect(() => {
    setIsLoaded(false);
    fetch(
      `https://fakestoreapi.com/products/category/${decodedCategory}?limit=5`
    )
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
  }, [decodedCategory]);

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <>
        <h1>{decodedCategory}</h1>
        <div>Chargement...</div>
      </>
    );
  } else {
    return (
      <>
        <h1>{decodedCategory}</h1>
        <ProductCard products={products} />
      </>
    );
  }
};

export default Category;
