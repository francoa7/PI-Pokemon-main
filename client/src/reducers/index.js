import { GET_POKEMONS } from "../actions/action-types";

const initialState = {
    pokemons: [],
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: state.pokemons.concat(payload),
            };

        default:
            return state;
    }
}
