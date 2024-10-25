// React
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
// Externe
import { debounce } from "lodash";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  // État des produits
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setProductsError] = useState(null);

  // État des niveaux de stock
  const [stockLevels, setStockLevels] = useState({});

  // État de la requête de recherche
  const [searchQuery, setSearchQueryState] = useState("");

  // Fonction pour définir la requête de recherche avec debounce
  const debouncedSetSearchQuery = useCallback(
    debounce((query) => {
      setSearchQueryState(query);
    }, 500),
    []
  );

  const setSearchQuery = (query) => {
    debouncedSetSearchQuery(query);
  };

  // Récupérer les produits
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

  // Génére un nombre entier aléatoire entre min et max inclus
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Initialise les niveaux de stock une fois les produits chargés
  useEffect(() => {
    if (isLoaded) {
      const initialStock = {};
      products.forEach((product) => {
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

  // Mémorise la valeur du Context
  const contextValue = useMemo(
    () => ({
      products,
      isLoaded,
      error,
      stockLevels,
      updateStock,
      searchQuery,
      setSearchQuery,
    }),
    [products, isLoaded, error, stockLevels, searchQuery]
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
