import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";

const CartContainer = styled.div`
  padding: 16px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: scale-down;
  margin-right: 16px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
`;

const QuantityInput = styled.input`
  width: 50px;
  margin-right: 8px;
`;

const RemoveButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #cc0000;
  }
`;

const TotalPrice = styled.h2`
  text-align: right;
  margin-top: 16px;
`;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (e, id) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateQuantity(id, value);
    }
  };

  if (cartItems.length === 0) {
    return <CartContainer>Votre panier est vide.</CartContainer>;
  }

  return (
    <CartContainer>
      <h1>Votre Panier</h1>
      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <ProductImage src={item.image} alt={item.title} />
          <ProductDetails>
            <h2>{item.title}</h2>
            <p>
              Prix unitaire :{" "}
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(item.price)}
            </p>
            <p>
              Sous-total :{" "}
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(item.price * item.quantity)}
            </p>
          </ProductDetails>
          <div>
            <QuantityInput
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e, item.id)}
            />
            <RemoveButton onClick={() => removeFromCart(item.id)}>
              Supprimer
            </RemoveButton>
          </div>
        </CartItem>
      ))}
      <TotalPrice>
        Total :{" "}
        {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(
          cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )
        )}
      </TotalPrice>
    </CartContainer>
  );
};

export default Cart;
