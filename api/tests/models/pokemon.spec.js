const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("POKEMON MODEL", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        })
    );
    describe("Validators", () => {
        beforeEach(() => Pokemon.sync({ force: true }));
        describe("NAME", () => {
            it("should throw an error if params are null", (done) => {
                Pokemon.create({})
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
            it("should work when its a valid name (the other params are allowNull:true)", () => {
                Pokemon.create({ name: "Pikachu" })
                    .then(() => done())
                    .catch(() => done(new Error("Should have been created")));
            });
        });
        describe("HP", () => {
            it("should throw an error if hp is not a number", (done) => {
                Pokemon.create({ name: "Pikachu", hp: "NaN" })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
            it("should throw an error if hp is not between 1 - 255", (done) => {
                Pokemon.create({ name: "Pikachu", hp: "256" })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
        });
        describe("ATTACK", () => {
            it("should throw an error if attack is not a number", (done) => {
                Pokemon.create({
                    name: "Pikachu",
                    attack: "this is not a number",
                })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
            it("should throw an error if attack is not between 1 - 255", (done) => {
                Pokemon.create({ name: "Pikachu", attack: "256" })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
        });
        describe("DEFENSE", () => {
            it("should throw an error if defense is not a number", (done) => {
                Pokemon.create({
                    name: "Pikachu",
                    defense: "this is not a number",
                })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
            it("should throw an error if defense is not between 1 - 255", (done) => {
                Pokemon.create({ name: "Pikachu", defense: "256" })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
        });
        describe("SPEED", () => {
            it("should throw an error if speed is not a number", (done) => {
                Pokemon.create({
                    name: "Pikachu",
                    speed: "this is not a number",
                })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
            it("should throw an error if speed is not between 1 - 255", (done) => {
                Pokemon.create({ name: "Pikachu", speed: "256" })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
        });
        describe("HEIGHT", () => {
            it("should throw an error if height is not a number", (done) => {
                Pokemon.create({
                    name: "Pikachu",
                    height: "this is not a number",
                })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
            it("should throw an error if height is not between 1 - 255", (done) => {
                Pokemon.create({ name: "Pikachu", height: "256" })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
        });
        describe("WEIGHT", () => {
            it("should throw an error if weight is not a number", (done) => {
                Pokemon.create({
                    name: "Pikachu",
                    weight: "this is not a number",
                })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
            it("should throw an error if weight is not between 1 - 255", (done) => {
                Pokemon.create({ name: "Pikachu", weight: "256" })
                    .then(() => done(new Error("Should not have been created")))
                    .catch(() => done());
            });
        });
    });
});
