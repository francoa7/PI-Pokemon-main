import {
    DELETE_POKEMON,
    EDIT_POKEMON,
    FILTER_ORIGIN,
    FILTER_TYPE,
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    GET_TYPES,
    ORDER_ALPH,
    ORDER_STRENGTH,
    POST_POKEMON,
    RESET_DELETED_STATE,
    RESET_POSTED_POKEMON,
} from "./action-types";
import axios from "axios";

export function getPokemons(name) {
    let url = "";
    if (name && name.length > 0) url = `/pokemons?name=${name}`;
    else url = "/pokemons";

    return function (dispatch) {
        return axios.get(url).then((response) => {
            dispatch({
                type: GET_POKEMONS,
                payload: response.data,
            });
        });
    };
}

export function getPokemonDetail(id) {
    if (!id) {
        return { type: GET_POKEMON_DETAIL, payload: { noid: true } };
    }

    return function (dispatch) {
        return axios.get(`/pokemons/${id}`).then((response) => {
            if (response.data.error) {
                dispatch({
                    type: GET_POKEMON_DETAIL,
                    payload: { notfound: true },
                });
            } else {
                dispatch({
                    type: GET_POKEMON_DETAIL,
                    payload: response.data,
                });
            }
        });
    };
}

export function getTypes() {
    return function (dispatch) {
        return axios.get(`/types`).then((response) => {
            dispatch({
                type: GET_TYPES,
                payload: response.data,
            });
        });
    };
}

export function postPokemon(pokemon) {
    return function (dispatch) {
        return axios({
            method: "POST",
            url: "/pokemons",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(pokemon),
        })
            .then((response) => {
                dispatch({
                    type: POST_POKEMON,
                    payload: response.data,
                });
            })
            .catch((err) => console.log(err));
    };
}

export function resetPostedPokemon() {
    return {
        type: RESET_POSTED_POKEMON,
        payload: {},
    };
}

export function deletePokemon(id) {
    return function (dispatch) {
        return axios(`/pokemons/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                dispatch({
                    type: DELETE_POKEMON,
                    payload: { status: response.status, id: id },
                });
            })
            .catch((err) => console.log(err));
    };
}

export function resetDeletedState() {
    return {
        type: RESET_DELETED_STATE,
        payload: false,
    };
}

export function editPokemon(id, input) {
    return function (dispatch) {
        return axios(`/pokemons/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(input),
        }).then((response) => {
            dispatch({
                type: EDIT_POKEMON,
                payload: response.data,
            });
        });
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
