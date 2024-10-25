// server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const APP_PORT = process.env.APP_PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint pour créer une session de paiement
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Créer une liste d'articles pour Stripe
    const lineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Stripe utilise les centimes
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:${APP_PORT}/success`, // URL de redirection après succès
      cancel_url: `http://localhost:${APP_PORT}/cancel`, // URL de redirection après annulation
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(
      "Erreur lors de la création de la session de paiement:",
      error
    );
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la création de la session de paiement",
    });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Serveur démarré sur le port ${SERVER_PORT}`);
});
