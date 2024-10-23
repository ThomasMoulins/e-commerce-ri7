import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import QuantityControl from "./QuantityControl";

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

const ImageWrapper = styled.div`
  width: 100px;
  height: 120px;
  border-radius: 16px;
  background-color: white;
  margin-right: 16px;
  padding: 1rem;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 120px;
  border-radius: 16px;
  object-fit: scale-down;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
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

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  if (cartItems.length === 0) {
    return <CartContainer>Votre panier est vide.</CartContainer>;
  }

  return (
    <CartContainer>
      <h1>Votre Panier</h1>
      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <ImageWrapper>
            <ProductImage src={item.image} alt={item.title} />
          </ImageWrapper>
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
            <QuantityControl
              quantity={item.quantity}
              onDecrease={() => handleDecrease(item.id, item.quantity)}
              onIncrease={() => handleIncrease(item.id, item.quantity)}
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
