require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, "dist")));

// Pour toute route, renvoyer index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen();
