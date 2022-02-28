import React from 'react'

function Pokemon({ pokemon }) {
      return (
            <div>
                  <img src={pokemon.image} alt="pokemon image" />
                  <h2>{pokemon.name}</h2>
                  <h3>TYPES</h3>
                  {pokemon.types.map(type => <p>{type.type.name}</p>)}
                  <hr />
            </div>
      )
}

export default Pokemon