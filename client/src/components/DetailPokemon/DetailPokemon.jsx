import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPokemonDetail } from '../../actions';
import { capitalizeString } from '../../utils';
import styles from './DetailPokemon.module.css'
import pokeball from '../../img/pokeball.gif'


function DetailPokemon() {
      const dispatch = useDispatch();
      const pokemonDetail = useSelector(state => state.pokemonDetail);

      const { id } = useParams()

      useEffect(() => {
            dispatch(getPokemonDetail(id))
      }, [])
      console.log(pokemonDetail);
      // Object.entries(pokemonDetail).length !== 0 && console.log(pokemonDetail.types.find(type => type.name === 'fire') && styles.fire_go_back);

      return (

            <div className={styles.detail_pokemon}>
                  {(pokemonDetail.noid || Object.entries(pokemonDetail).length === 0)
                        ? <img src={pokeball} alt='pokeball' className={styles.loading_pokeball}></img>
                        : pokemonDetail.notfound ? <h1>No se encontró el pokemon indicado</h1> : (
                              <div className={styles.pokemon_detail}>
                                    <Link to='/home'
                                          className={`
                                          ${styles.go_back} 
                                          `}>
                                          Back
                                    </Link>
                                    <div className={styles.pokemon_image}>
                                          < img src={pokemonDetail.image} alt="pokemon" className={styles.pokemon} />
                                    </div>
                                    <div className={styles.pokemon_info}>
                                          <div >
                                                <h1 className={styles.pokemon_name}>{`${capitalizeString(pokemonDetail.name)}`}</h1>
                                                <label className={styles.pokemon_id}>#{pokemonDetail.id}</label>
                                          </div>
                                          <br />
                                          <h3>Base stats</h3>
                                          <div className={styles.pokemon_stats}>
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>Strength</p>
                                                      <progress max="255" value={Number(pokemonDetail.attack)}>{pokemonDetail.attack} </progress>
                                                      <label >{pokemonDetail.attack}</label>
                                                </div>
                                                <div>
                                                      <p className={styles.stat_title}>Defense</p>
                                                      <progress max="255" value={Number(pokemonDetail.defense)}>{pokemonDetail.defense} </progress>
                                                      <label >{pokemonDetail.defense}</label>
                                                </div>
                                                <div>
                                                      <p className={styles.stat_title}>HP</p>
                                                      <progress max="255" value={Number(pokemonDetail.hp)}>{pokemonDetail.hp} </progress>
                                                      <label >{pokemonDetail.hp}</label>
                                                </div>
                                                <div>
                                                      <p className={styles.stat_title}>Speed</p>
                                                      <progress max="255" value={Number(pokemonDetail.speed)}>{pokemonDetail.speed} </progress>
                                                      <label >{pokemonDetail.speed}</label>
                                                </div>
                                                <br />
                                                <div className={styles.extra_info}>
                                                      <div className={styles.info_container}>
                                                            <h3>Info</h3>
                                                            <div>
                                                                  <label className={styles.info}>Weight: {pokemonDetail.weight}kg</label>
                                                                  <label className={styles.info}>Height: {pokemonDetail.height}</label>
                                                            </div>
                                                      </div>
                                                      <div className={styles.types}>
                                                            <h3>Types</h3>
                                                            <ul className={styles.types}>
                                                                  {pokemonDetail.types.map((type) => (
                                                                        <li key={type.name}>{capitalizeString(type.name)}</li>
                                                                  ))}
                                                            </ul>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )
                  }
            </div >
      )
}

export default DetailPokemon