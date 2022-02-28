const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const path = require("path");

async function getUrl(url) {
    try {
        const data = await axios.get(url);
        return { data, error: false };
    } catch (error) {
        return { data: false, error };
    }
}

function promisifiedGetPokemons(data) {
    return data.data.results.map((poke) => {
        return new Promise(function (resolve, reject) {
            axios
                .get(poke.url)
                .then((response) => resolve(response))
                .catch(function (error) {
                    reject(error);
                });
        });
    });
}

router.get("/", async (req, res) => {
    const { name } = req.query;
    if (name) {
        const pokemon = await Pokemon.findOne({ where: { name: name } });
        if (pokemon) {
            return res.json(pokemon);
        } else {
            var { data, error } = await getUrl(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            if (!data) {
                return res.status(404).send({
                    error: error.message,
                    description:
                        "failed to get the pokemon with the specified name",
                });
            } else {
                res.json(data.data);
            }
        }
    } else {
        var { data, error } = await getUrl("https://pokeapi.co/api/v2/pokemon");
        if (!data) {
            return res.status(404).send({
                error: error.message,
                description: "failed in general get",
            });
        } else {
            const pokePromises = promisifiedGetPokemons(data);
            console.log(pokePromises);
            var pokemons = [];
            await Promise.all(pokePromises)
                .then(
                    (values) =>
                        (pokemons = values.map((poke) => {
                            return {
                                id: poke.data.id,
                                name: poke.data.name,
                                image: poke.data.sprites.other.dream_world
                                    .front_default,
                                types: poke.data.types,
                            };
                        }))
                )
                .catch((err) => {
                    error = err;
                });
            const fromdb = await Pokemon.findAll({ include: Type });

            if (fromdb.length) {
                fromdb.forEach((poke) => {
                    pokemons.push(poke.dataValues);
                    console.log(poke.dataValues);
                });
            }

            if (error) {
                return res.status(404).send({
                    error: error.message,
                    description: "failed in individual pokemon get",
                });
            } else return res.json(pokemons);
        }
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const isInteger = /^[0-9]+$/.test(id);
    console.log("Is Integer?");
    console.log(isInteger);
    if (isInteger) {
        const { data, error } = await getUrl(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        if (!data) {
            return res.status(404).send({
                error: error.message,
                description: "failed to get the specified pokemon",
            });
        } else {
            res.send(data.data);
        }
    } else {
        try {
            const pokemon = await Pokemon.findByPk(id, { include: Type });
            res.json(pokemon);
        } catch (error) {
            return res.send({ error });
        }
    }
});

router.get("/create/:id", async (req, res) => {
    const { id } = req.params;
    const pokemon = await Pokemon.create({ name: "Franco" });
    res.send(pokemon);
});

router.post("/pokemons", (req, res) => {
    const { name, types, hp, attack, defense, speed } = req.body;
    // [ ] POST /pokemons:
    // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
    // Crea un pokemon en la base de datos
    //
    // [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
    // [ ] Número de Pokemon (id)
    // [ ] Estadísticas (vida, fuerza, defensa, velocidad)
    // [ ] Altura y peso
});

router.get("/image/default", (req, res) => {
    var filepath = path.join(__dirname, "../img/default_pokemon.png");
    res.sendFile(filepath);
});

module.exports = router;

// Únicos Endpoints/Flags que pueden utilizar
// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}
// GET https://pokeapi.co/api/v2/type
