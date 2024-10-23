import { createContext, useState, useEffect, useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const { products, isLoaded } = useContext(ProductsContext);
  const [stockLevels, setStockLevels] = useState({});

  // Génére un nombre entier aléatoire entre min et max inclus
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Initialise les stocks une fois que les produits sont chargés
  useEffect(() => {
    if (isLoaded) {
      const initialStock = {};
      products.forEach((product) => {
        // Génére un stock aléatoire entre 0 et 10
        const randomStock = getRandomIntInclusive(0, 10);
        initialStock[product.id] = randomStock;
      });
      setStockLevels(initialStock);
    }
  }, [isLoaded, products]);

  // Met à jour le stock d'un produit
  const updateStock = (productId, newStock) => {
    setStockLevels((prevStockLevels) => ({
      ...prevStockLevels,
      [productId]: newStock,
    }));
  };

  return (
    <StockContext.Provider value={{ stockLevels, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};
