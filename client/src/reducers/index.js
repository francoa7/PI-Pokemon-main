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
} from "../actions/action-types";

const initialState = {
    dataPokemons: [],
    pokemons: [],
    pokemonDetail: {},
    types: [],
    lastFilter: "",
    lastPostedPokemon: {},
};

function orderAlph(state = initialState, order) {
    let sortedPokemons =
        order === "asc"
            ? state.pokemons.sort(function (a, b) {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) {
                      return -1;
                  }
                  if (a.name.toLowerCase() > b.name.toLowerCase()) {
                      return 1;
                  }
                  return 0;
              })
            : state.pokemons.sort(function (a, b) {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) {
                      return 1;
                  }
                  if (a.name.toLowerCase() > b.name.toLowerCase()) {
                      return -1;
                  }
                  return 0;
              });

    return sortedPokemons;
}
function orderStrength(state = initialState, order) {
    let sortedPokemons =
        order === "asc"
            ? state.pokemons.sort(function (a, b) {
                  if (a.attack < b.attack) {
                      return -1;
                  }
                  if (a.attack > b.attack) {
                      return 1;
                  }
                  return 0;
              })
            : state.pokemons.sort(function (a, b) {
                  if (a.attack < b.attack) {
                      return 1;
                  }
                  if (a.attack > b.attack) {
                      return -1;
                  }
                  return 0;
              });

    return sortedPokemons;
}

function filterType(state = initialState, type) {
    let filteredPokemons = [];
    type !== "all"
        ? state.dataPokemons.forEach((pokemon) => {
              for (let i = 0; i < pokemon.types.length; i++) {
                  if (pokemon.types[i].name === type) {
                      filteredPokemons.push(pokemon);
                  }
              }
          })
        : (filteredPokemons = state.dataPokemons);

    if (!filteredPokemons.length) return {};
    else return filteredPokemons;
}

function filterOrigin(state = initialState, origin) {
    let filteredPokemons = [];
    origin === "created"
        ? state.dataPokemons.forEach((pokemon) => {
              if (pokemon.createdInDb) filteredPokemons.push(pokemon);
          })
        : origin === "existing"
        ? state.dataPokemons.forEach((pokemon) => {
              if (!pokemon.createdInDb) filteredPokemons.push(pokemon);
          })
        : (filteredPokemons = state.dataPokemons);

    if (!filteredPokemons.length) return {};
    else return filteredPokemons;
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                dataPokemons: Array.isArray(payload)
                    ? payload.concat([])
                    : [payload].concat([]),
                pokemons: Array.isArray(payload)
                    ? payload.concat([])
                    : [payload].concat([]),
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: payload,
            };
        case GET_TYPES:
            return {
                ...state,
                types: state.types.concat(payload),
            };
        case ORDER_ALPH:
            return {
                ...state,
                pokemons: orderAlph(state, payload).concat([]),
            };
        case FILTER_TYPE:
            return {
                ...state,
                pokemons: filterType(state, payload),
                lastFilter: "t",
            };
        case FILTER_ORIGIN:
            return {
                ...state,
                pokemons: filterOrigin(state, payload),
                lastFilter: "o",
            };
        case ORDER_STRENGTH:
            return {
                ...state,
                pokemons: orderStrength(state, payload).concat([]),
            };
        case POST_POKEMON:
            return {
                ...state,
                lastPostedPokemon: payload,
            };
        case RESET_POSTED_POKEMON:
            return {
                ...state,
                lastPostedPokemon: payload,
            };
        default:
            return state;
    }
}
