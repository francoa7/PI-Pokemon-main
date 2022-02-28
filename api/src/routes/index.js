const express = require("express");
const app = express();
const router = require("./pokemons");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

app.use(express.json());
app.use("/pokemons", router);
app.get("/favicon.ico", (req, res) => res.status(204));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = app;
