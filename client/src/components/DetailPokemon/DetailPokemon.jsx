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
      function setBackgroundType(styles) {
            if (pokemonDetail.types.find(type => type.name === 'fire')) return styles.firebackground;
            else if (pokemonDetail.types.find(type => type.name === 'grass')) return styles.grassbackground;
            else if (pokemonDetail.types.find(type => type.name === 'water')) return styles.waterbackground
            else if (pokemonDetail.types.find(type => type.name === 'bug')) return styles.bugbackground
            else if (pokemonDetail.types.find(type => type.name === 'poison')) return styles.poisonbackground
            else if (pokemonDetail.types.find(type => type.name === 'normal')) return styles.normalbackground
            else if (pokemonDetail.types.find(type => type.name === 'electric')) return styles.electricbackground
            else if (pokemonDetail.types.find(type => type.name === 'ground')) return styles.groundbackground
            else if (pokemonDetail.types.find(type => type.name === 'fairy')) return styles.fairybackground
            else if (pokemonDetail.types.find(type => type.name === 'fighting')) return styles.fightingbackground
            return ""
      }

      function setColorType(styles) {
            if (pokemonDetail.types.find(type => type.name === 'fire')) return styles.firecolor;
            else if (pokemonDetail.types.find(type => type.name === 'grass')) return styles.grasscolor;
            else if (pokemonDetail.types.find(type => type.name === 'water')) return styles.watercolor
            else if (pokemonDetail.types.find(type => type.name === 'bug')) return styles.bugcolor
            else if (pokemonDetail.types.find(type => type.name === 'poison')) return styles.poisoncolor
            else if (pokemonDetail.types.find(type => type.name === 'normal')) return styles.normalcolor
            else if (pokemonDetail.types.find(type => type.name === 'electric')) return styles.electriccolor
            else if (pokemonDetail.types.find(type => type.name === 'ground')) return styles.groundcolor
            else if (pokemonDetail.types.find(type => type.name === 'fairy')) return styles.fairycolor
            else if (pokemonDetail.types.find(type => type.name === 'fighting')) return styles.fightingcolor
            return ""
      }
      // Object.entries(pokemonDetail).length !== 0 && console.log(pokemonDetail.types.find(type => type.name === 'fire') && styles.fire_go_back);
      const pokemonTypes = pokemonDetail.types?.map(type => type.name)
      return (

            <div className={styles.detail_pokemon}>
                  {(pokemonDetail.noid || Object.entries(pokemonDetail).length === 0)
                        ? <img src={pokeball} alt='pokeball' className={styles.loading_pokeball}></img>
                        : pokemonDetail.notfound ? <h1>No se encontró el pokemon indicado</h1> : (
                              <div className={styles.pokemon_detail}>
                                    <Link to='/home'
                                          className={`
                                          ${styles.go_back} ${setBackgroundType(styles)}
                                          `}>
                                          Back
                                    </Link>
                                    <div className={styles.pokemon_image}>
                                          <div >
                                                <h1 className={`${styles.pokemon_name} ${setColorType(styles)}`}>{`${pokemonDetail.name.toUpperCase()}`}</h1>
                                                <p className={styles.pokemon_id}>#{pokemonDetail.id}</p>
                                          </div>
                                          < img src={pokemonDetail.image} alt="pokemon" className={styles.pokemon} />
                                          <div className={`${styles.circle} ${setBackgroundType(styles)}`}></div>
                                    </div>
                                    <div className={styles.pokemon_info}>

                                          <div className={`${styles.base_stats} ${setBackgroundType(styles)}`}>Base stats</div>
                                          <div className={styles.pokemon_stats}>
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>Strength</p>
                                                      <progress max="255" value={Number(pokemonDetail.attack)}>{pokemonDetail.attack} </progress>
                                                      <div>
                                                            <label>
                                                                  {pokemonDetail.attack}
                                                            </label>
                                                      </div>
                                                </div>
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>Defense</p>
                                                      <progress max="255" value={Number(pokemonDetail.defense)}>{pokemonDetail.defense} </progress>
                                                      <div>
                                                            <label>
                                                                  {pokemonDetail.defense}
                                                            </label>
                                                      </div>
                                                </div>
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>HP</p>
                                                      <progress max="255" value={Number(pokemonDetail.hp)}>{pokemonDetail.hp} </progress>
                                                      <div>
                                                            <label>
                                                                  {pokemonDetail.hp}
                                                            </label>
                                                      </div>
                                                </div>
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>Speed</p>
                                                      <progress max="255" value={Number(pokemonDetail.speed)}>{pokemonDetail.speed} </progress>
                                                      <div>
                                                            <label>
                                                                  {pokemonDetail.speed}
                                                            </label>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className={styles.extra_info}>
                                                <div className={`${styles.extra_data} ${setBackgroundType(styles)}`}>{pokemonTypes.join(" - ").toUpperCase()}</div>
                                                <div className={`${styles.extra_data} ${setBackgroundType(styles)}`}>Weight: {pokemonDetail.weight / 10}kg</div>
                                                <div className={`${styles.extra_data} ${setBackgroundType(styles)}`}>Height: {pokemonDetail.height / 10}m</div>

                                          </div>
                                    </div>
                              </div>
                        )
                  }
            </div >
      )
}

export default DetailPokemon