import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setProductsError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setProducts(result);
          setIsLoaded(true);
        },
        (error) => {
          console.error("Erreur lors de la récupération des produits :", error);
          setProductsError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoaded, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
