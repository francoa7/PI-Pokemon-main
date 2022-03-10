import {
    FILTER_ORIGIN,
    FILTER_TYPE,
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    GET_TYPES,
    ORDER_ALPH,
    ORDER_STRENGTH,
    POST_POKEMON,
    RESET_POSTED_POKEMON,
} from "./action-types";

export function getPokemons(name) {
    console.log(name);
    let url = "";
    if (name && name.length > 0)
        url = `http://localhost:3001/pokemons?name=${name}`;
    else url = "http://localhost:3001/pokemons";

    return function (dispatch) {
        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                dispatch({
                    type: GET_POKEMONS,
                    payload: data,
                });
            });
    };
}

export function getPokemonDetail(id) {
    if (!id) {
        return { type: GET_POKEMON_DETAIL, payload: { noid: true } };
    }

    return function (dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    dispatch({
                        type: GET_POKEMON_DETAIL,
                        payload: { notfound: true },
                    });
                } else {
                    dispatch({
                        type: GET_POKEMON_DETAIL,
                        payload: data,
                    });
                }
            });
    };
}

export function getTypes() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/types`)
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: GET_TYPES,
                    payload: data,
                });
            });
    };
}

export function postPokemon(pokemon) {
    return function (dispatch) {
        return fetch("http://localhost:3001/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemon),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                dispatch({
                    type: POST_POKEMON,
                    payload: data,
                });
            });
    };
}

export function resetPostedPokemon() {
    return {
        type: RESET_POSTED_POKEMON,
        payload: {},
    };
}

export function orderAlph(order) {
    return {
        type: ORDER_ALPH,
        payload: order,
    };
}

export function filterTypes(type) {
    return {
        type: FILTER_TYPE,
        payload: type,
    };
}

export function filterOrigin(origin) {
    return {
        type: FILTER_ORIGIN,
        payload: origin,
    };
}

export function orderStrength(order) {
    return {
        type: ORDER_STRENGTH,
        payload: order,
    };
}
