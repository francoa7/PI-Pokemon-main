import React, { useEffect } from 'react'
import styles from './Pokemon.module.css'
import { capitalizeString } from '../../utils'
import brokenPokeball from '../../img/broken_pokeball.png'

function Pokemon({ pokemon }) {

      function setCardType(styles) {
            if (pokemon.types.find(type => type.name === 'fire')) return styles.fire;
            else if (pokemon.types.find(type => type.name === 'grass')) return styles.grass;
            else if (pokemon.types.find(type => type.name === 'water')) return styles.water
            else if (pokemon.types.find(type => type.name === 'bug')) return styles.bug
            else if (pokemon.types.find(type => type.name === 'poison')) return styles.poison
            else if (pokemon.types.find(type => type.name === 'normal')) return styles.normal
            else if (pokemon.types.find(type => type.name === 'electric')) return styles.electric
            else if (pokemon.types.find(type => type.name === 'ground')) return styles.ground
            else if (pokemon.types.find(type => type.name === 'fairy')) return styles.fairy
            else if (pokemon.types.find(type => type.name === 'fighting')) return styles.fighting
            return ""
      }

      function setTypes(styles) {
            if (pokemon.types.find(type => type.name === 'fire')) return styles.type_fire;
            else if (pokemon.types.find(type => type.name === 'grass')) return styles.type_grass;
            else if (pokemon.types.find(type => type.name === 'water')) return styles.type_water
            else if (pokemon.types.find(type => type.name === 'bug')) return styles.type_bug
            else if (pokemon.types.find(type => type.name === 'poison')) return styles.type_poison
            else if (pokemon.types.find(type => type.name === 'normal')) return styles.type_normal
            else if (pokemon.types.find(type => type.name === 'electric')) return styles.type_electric
            else if (pokemon.types.find(type => type.name === 'ground')) return styles.type_ground
            else if (pokemon.types.find(type => type.name === 'fairy')) return styles.type_fairy
            else if (pokemon.types.find(type => type.name === 'fighting')) return styles.type_fighting
            return ""
      }

      const typeNames = pokemon.types?.map(type => type.name)

      return (
            <div>
                  {
                        Object.entries(pokemon).length === 0 ?
                              < div className={`${styles.poke_container} ${styles.not_found}`
                              }>
                                    <h2>POKEMON NOT FOUND</h2>
                                    <img className={styles.broken_pokeball} src={brokenPokeball} alt="not found" />
                                    <div className={`${styles.pokemon_types}  ${styles.type_not_found}`}>
                                          <p className={styles.with_border} >ERROR 404</p>
                                    </div>
                              </div >
                              :

                              < div className={`${styles.poke_container} ${setCardType(styles)}`
                              }>
                                    <h2 className={`${styles.pokemon_name} ${styles.with_border}`}>{pokemon.name.toUpperCase()}</h2>
                                    <img className={styles.poke_img} src={pokemon.image} alt="pokemon" />
                                    <div className={styles.pokemon_stats}>

                                          <label > HP: {pokemon.hp}</label>
                                          <label > PW: {pokemon.attack}</label>
                                          <label > DF: {pokemon.defense}</label>
                                          <label > SP: {pokemon.speed}</label>

                                    </div>
                                    <div className={`${styles.pokemon_types}  ${setTypes(styles)}`}>
                                          <p className={styles.with_border} >{typeNames.join(" - ").toUpperCase()}</p>
                                    </div>
                              </div >
                  }
            </div>

      )
}

export default Pokemon