// React
import { createContext, useState, useContext } from "react";
// Éléments/pages
import { ProductsContext } from "../Stock/ProductsContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { stockLevels, updateStock } = useContext(ProductsContext);

  const addToCart = (product) => {
    const stock = stockLevels[product.id] || 0;

    if (stock > 0) {
      setCartItems((prevItems) => {
        // Vérifie si le produit est déjà dans le panier
        const existingProduct = prevItems.find(
          (item) => item.id === product.id
        );
        if (existingProduct) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });

      updateStock(product.id, stock - 1);
    } else {
      alert("Ce produit est en rupture de stock.");
    }
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (itemToRemove) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
      const stock = stockLevels[productId] || 0;
      updateStock(productId, stock + itemToRemove.quantity);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const itemInCart = cartItems.find((item) => item.id === productId);
    if (itemInCart) {
      const oldQuantity = itemInCart.quantity;
      const stock = stockLevels[productId] || 0;
      const totalAvailable = stock + oldQuantity;

      if (newQuantity <= totalAvailable && newQuantity >= 1) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );

        const quantityDifference = oldQuantity - newQuantity;
        updateStock(productId, stock + quantityDifference);
      } else if (newQuantity < 1) {
        // Si la nouvelle quantité est inférieure à 1, supprimer l'article du panier
        removeFromCart(productId);
      } else {
        alert(`Stock insuffisant. Stock disponible : ${totalAvailable}`);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
