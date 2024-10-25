// React
import { useContext } from "react";
// Contexte
import { ThemeContext } from "./ThemeContext";
import { ProductsContext } from "./Stock/ProductsContext";
// Externe
import { useLocation } from "react-router-dom";
import { quantum } from "ldrs";
// Éléments/pages
import ProductCard from "./ProductCard";

const Category = () => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "light" ? "black" : "white";
  const { products, isLoaded, error } = useContext(ProductsContext);
  const { searchQuery } = useContext(ProductsContext);
  const location = useLocation();
  quantum.register();

  // Extrait la catégorie du chemin
  const category = location.pathname.split("/category/")[1];

  // Décode la catégorie pour gérer les espaces et les caractères spéciaux
  const decodedCategory = decodeURIComponent(category);

  // Filtre les produits par catégorie
  const categoryProducts = products.filter(
    (product) => product.category === decodedCategory
  );

  // Filtre par recherche
  const filteredProducts =
    searchQuery.length > 2
      ? categoryProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : categoryProducts;

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
        <h1>{decodedCategory}</h1>
        {searchQuery && searchQuery.length > 2 && (
          <h2>Résultats pour : "{searchQuery}"</h2>
        )}
        <ProductCard products={filteredProducts} />
      </>
    );
  }
};

export default Category;
