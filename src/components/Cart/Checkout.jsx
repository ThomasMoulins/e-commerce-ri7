// React
import { useContext } from "react";
// Contexte
import { CartContext } from "./CartContext";
// Externe
import { useStripe } from "@stripe/react-stripe-js";
import styled from "styled-components";

const CheckoutButton = styled.button`
  background-color: #007b00;
  color: #fff;
  border: none;
  padding: 16px 32px;
  cursor: pointer;
  margin-top: 8px;
  border-radius: 4px;
  &:hover {
    background-color: #005500;
  }
`;

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const stripe = useStripe();
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `http://localhost:${SERVER_PORT}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems }),
        }
      );

      const session = await response.json();

      // Rediriger vers le Checkout de Stripe
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // Gérer les erreurs ici
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Erreur lors de la redirection vers le Checkout:", error);
    }
  };

  return <CheckoutButton onClick={handleCheckout}>Payer</CheckoutButton>;
};

export default Checkout;
