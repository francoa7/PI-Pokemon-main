const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const path = require("path");
const { getUrl, promisifyGetData, createPokemon } = require("./utils");

router.get("/", async (req, res) => {
    getUrl("http://localhost:3001/types");
    const { name } = req.query;
    if (name) {
        const pokemon = await Pokemon.findOne({
            where: {
                name: name,
            },
            include: {
                model: Type,
            },
        });
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
                const pokemon = {
                    id: data.data.id,
                    name: data.data.name,
                    image: data.data.sprites.other.dream_world.front_default,
                    types: data.data.types.map((type) => type.type),
                    hp: data.data.stats[0].base_stat,
                    attack: data.data.stats[1].base_stat,
                    defense: data.data.stats[2].base_stat,
                    speed: data.data.stats[5].base_stat,
                    height: data.data.height,
                    weight: data.data.weight,
                };
                return res.json(pokemon);
            }
        }
    } else {
        var firstData = await getUrl("https://pokeapi.co/api/v2/pokemon");
        if (!firstData.data) {
            return res.status(404).send({
                error: firstData.error.message,
                description: "Failed to get all the pokemons from the API",
            });
        } else {
            var secondData = await getUrl(firstData.data.data.next);

            const pokePromises = promisifyGetData(firstData.data).concat(
                promisifyGetData(secondData.data)
            );
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
                                types: poke.data.types.map((type) => type.type),
                                hp: poke.data.stats[0].base_stat,
                                attack: poke.data.stats[1].base_stat,
                                defense: poke.data.stats[2].base_stat,
                                speed: poke.data.stats[5].base_stat,
                                height: poke.data.height,
                                weight: poke.data.weight,
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
            const pokemon = {
                id: data.data.id,
                name: data.data.name,
                image: data.data.sprites.other.dream_world.front_default,
                hp: data.data.stats[0].base_stat,
                attack: data.data.stats[1].base_stat,
                defense: data.data.stats[2].base_stat,
                speed: data.data.stats[5].base_stat,
                height: data.data.height,
                weight: data.data.weight,
                types: data.data.types.map((type) => {
                    return { name: type.type.name };
                }),
            };
            res.send(pokemon);
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

function areCorrectParams(params) {
    const { name, types, hp, attack, defense, speed, height, weight } = params;
    if (
        !name ||
        typeof name !== "string" ||
        !types ||
        types.length === 0 ||
        !Array.isArray(types) ||
        typeof hp !== "number" ||
        typeof attack !== "number" ||
        typeof defense !== "number" ||
        typeof speed !== "number" ||
        typeof height !== "number" ||
        typeof weight !== "number"
    ) {
        return false;
    }
    return true;
}

router.post("/", async (req, res) => {
    if (areCorrectParams(req.body)) {
        const pokemon = await createPokemon(req.body);

        return res.send(pokemon);
    } else {
        return res.status(400).send("Missing or wrong params");
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const input = req.body;

    const pokemon = await Pokemon.findByPk(id, { include: Type });

    await pokemon.update({
        name: input.name,
        attack: input.attack,
        defense: input.defense,
        hp: input.hp,
        speed: input.speed,
    });

    pokemon.save();
    return res.send(pokemon.dataValues);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pokemonForDelete = await Pokemon.findByPk(id);
        await pokemonForDelete.destroy();
    } catch (error) {
        return res.status(404).send({
            error: error.message,
            description: "failed to delete the specified pokemon",
        });
    }
    return res.sendStatus(200);
});

router.get("/image/default-pokemon", (req, res) => {
    var filepath = path.join(__dirname, "../img/default_pokemon.png");
    res.sendFile(filepath);
});

module.exports = router;

// Únicos Endpoints/Flags que pueden utilizar
// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}
// GET https://pokeapi.co/api/v2/type
