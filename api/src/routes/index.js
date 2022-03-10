const express = require("express");
const app = express();
const pokeRouter = require("./pokemons");
const typesRouter = require("./types");
const path = require("path");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

app.use(express.json());
app.use("/pokemons", pokeRouter);
app.use("/types", typesRouter);
app.get("/favicon.ico", (req, res) => {
    const filepath = path.join(__dirname, "../../../client/public/favicon.ico");

    res.sendFile(filepath);
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = app;
