import { GET_POKEMONS } from "./action-types";

export function getPokemons() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/pokemons`)
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
