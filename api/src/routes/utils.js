const axios = require("axios");
const { Pokemon, Type } = require("../db");

module.exports = {
    getUrl: async function (url) {
        try {
            const data = await axios.get(url);
            return { data, error: false };
        } catch (error) {
            return { data: false, error };
        }
    },
    promisifyGetData: function (data) {
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
    },
    promisifySaveType: function (values) {
        return values.map((value) => {
            return new Promise(function (resolve, reject) {
                Type.findOrCreate({
                    where: { id: value.data.id },
                    defaults: {
                        name: value.data.name,
                        id: value.data.id,
                    },
                })
                    .then((response) => resolve(response))
                    .catch(function (error) {
                        reject(error);
                    });
            });
        });
    },
    createPokemon: async function (params) {
        const { name, types, hp, attack, defense, speed, height, weight } =
            params;
        const pokemon = await Pokemon.create({
            name: name.toLowerCase(),
            hp: typeof hp === "number" ? hp : Math.floor(Math.random() * 101),
            attack:
                typeof attack === "number"
                    ? attack
                    : Math.floor(Math.random() * 101),
            defense:
                typeof defense === "number"
                    ? defense
                    : Math.floor(Math.random() * 101),
            speed:
                typeof speed === "number"
                    ? speed
                    : Math.floor(Math.random() * 101),
            height:
                typeof height === "number"
                    ? height
                    : Math.floor(Math.random() * 101),
            weight:
                typeof weight === "number"
                    ? weight
                    : Math.floor(Math.random() * 101),
        });
        let typesInDb = [];
        for (let i = 0; i < types.length; i++) {
            const type = await Type.findOne({ where: { name: types[i] } });
            typesInDb.push(type);
        }

        await typesInDb.forEach(async function (type) {
            await pokemon.addType(type);
        });
        return pokemon;
    },
};
