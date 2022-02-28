const { DataTypes, Model, INTEGER } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo

    const Pokemon = sequelize.define("pokemon", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "http://localhost:3001/pokemons/image/default",
            // defaultValue:
            //     "https://w7.pngwing.com/pngs/626/602/png-transparent-question-mark-interrogative-others-miscellaneous-text-logo-thumbnail.png",
        },
        hp: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Math.random() * 101),
        },
        attack: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Math.random() * 101),
        },

        defense: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Math.random() * 101),
        },
        speed: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Math.random() * 101),
        },
        height: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Math.random() * 101),
        },
        weight: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Math.random() * 101),
        },
    });
};
