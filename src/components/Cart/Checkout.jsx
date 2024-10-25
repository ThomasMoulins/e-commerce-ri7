// Checkout.js

import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useStripe } from "@stripe/react-stripe-js";

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

  return <button onClick={handleCheckout}>Payer avec Stripe</button>;
};

export default Checkout;
