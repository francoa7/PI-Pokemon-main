const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Type } = require("../db");
const path = require("path");
const { getUrl, promisifyGetData, promisifySaveType } = require("./utils");

router.get("/", async (req, res) => {
    var types = await Type.findAll();
    if (types.length) {
        return res.send(types);
    } else {
        var { data, error } = await getUrl("https://pokeapi.co/api/v2/type");
        if (!data) {
            return res.status(404).send({
                error: error.message,
                description: "failed to get types",
            });
        } else {
            const typePromises = promisifyGetData(data);
            await Promise.all(typePromises).then(async function (values) {
                const savePromises = promisifySaveType(values);
                await Promise.all(savePromises).then((responses) => {
                    console.log("types saved in db");
                    responses.forEach(([type, created]) => {
                        types.push(type);
                    });
                });
            });

            res.send(types);
        }
    }
});

module.exports = router;

// Únicos Endpoints/Flags que pueden utilizar
// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}
// GET https://pokeapi.co/api/v2/type
