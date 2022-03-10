import React from "react";
import { render, screen } from "@testing-library/react";
import rootReducer from "./reducers";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PostPokemon from "./components/PostPokemon/PostPokemon.jsx";

test("Debe devolver el estado inicial", () => {
    expect(rootReducer(undefined, {})).toEqual({
        dataPokemons: [],
        pokemons: [],
        pokemonDetail: {},
        types: [],
        lastFilter: "",
        lastPostedPokemon: {},
    });
});

describe("POST POKEMON", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PostPokemon />
                </BrowserRouter>
            </Provider>
        );
    });
    it("the form should have a name input", () => {
        const element = screen.getByLabelText("name");
        expect(element.type).toBe("text");
    });
    it("El formulario debe tener un input para poner una Descripción", () => {
        const element = screen.getByLabelText("Descripción");
        expect(element.type).toBe("text");
    });
    it("El formulario debe tener un input para poner una Imagen", () => {
        const element = screen.getByLabelText("Imagen");
        expect(element.type).toBe("text");
    });
});
