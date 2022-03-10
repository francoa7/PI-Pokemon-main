/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
    name: "Pikachu",
};

describe("POKEMON ROUTES", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        })
    );

    beforeEach(() =>
        Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
    );

    describe("GET /pokemons", () => {
        it("should get 200", async () => {
            await agent.get("/pokemons").expect(200);
        }).timeout(5000);
    });
    describe("GET /pokemons/:id", () => {
        it("should get 200", async () => {
            await agent.get("/pokemons/20").expect(200);
        }).timeout(5000);
    });
    describe("POST /pokemons", () => {
        it("should get 200", async () => {
            await agent
                .post("/pokemons")
                .send({
                    name: "Prueba",
                    types: ["fire", "poison"],
                    hp: 123,
                    attack: 250,
                    defense: 120,
                    speed: 178,
                    height: 172,
                    weight: 61,
                })
                .expect(200);
        }).timeout(5000);
    });
});
