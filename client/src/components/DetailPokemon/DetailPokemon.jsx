import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePokemon, editPokemon, getPokemonDetail } from '../../actions';
import styles from './DetailPokemon.module.css'
import pokeball from '../../img/pokeball.gif'
import trashCan from '../../img/trash_can.svg'
import editIcon from '../../img/edit_icon.svg'
import saveIcon from '../../img/save_icon.svg'


function DetailPokemon() {
      const dispatch = useDispatch();
      const pokemonDetail = useSelector(state => state.pokemonDetail);
      const [input, setInput] = useState({})

      const { id } = useParams()

      const navigate = useNavigate()
      useEffect(() => {
            dispatch(getPokemonDetail(id))

      }, [])
      useEffect(() => {
            setInput({
                  name: pokemonDetail.name,
                  attack: pokemonDetail.attack,
                  defense: pokemonDetail.defense,
                  hp: pokemonDetail.hp,
                  speed: pokemonDetail.speed,
                  weight: pokemonDetail.weight,
                  height: pokemonDetail.height
            })
      }, [pokemonDetail])

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

      function handleDelete(id) {
            if (window.confirm("Do you really want to delete this pokemon?")) {
                  dispatch(deletePokemon(id))
                  navigate(`/home`)
            }
      }
      function handleEdit(id, styles) {
            document.getElementById("save_icon").classList.remove(styles.hidden)
            document.getElementById("edit_icon").classList.add(styles.hidden)
            document.getElementById("pokemon_stats").classList.add(styles.hidden)
            document.getElementById("edit_pokemon_stats").classList.remove(styles.hidden)
            document.getElementById("input_pokemon_name").classList.remove(styles.hidden)
            document.getElementById("pokemon_name").classList.add(styles.hidden)
      }

      function handleSave(id, styles) {
            if (window.confirm("Save changes?")) {
                  document.getElementById("save_icon").classList.add(styles.hidden)
                  document.getElementById("edit_icon").classList.remove(styles.hidden)
                  document.getElementById("pokemon_stats").classList.remove(styles.hidden)
                  document.getElementById("edit_pokemon_stats").classList.add(styles.hidden)
                  document.getElementById("input_pokemon_name").classList.add(styles.hidden)
                  document.getElementById("pokemon_name").classList.remove(styles.hidden)

                  dispatch(editPokemon(pokemonDetail.id, input))
                  dispatch(getPokemonDetail())
            }
      }

      function handleChange(e) {
            if (e.target.name !== "name") {
                  document.getElementById(`${e.target.name}_label`).innerText = e.target.value;
                  setInput({
                        ...input,
                        [e.target.name]: Number(e.target.value)
                  })
            } else {
                  setInput({
                        ...input,
                        [e.target.name]: e.target.value
                  })
            }

      }


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
                                                <h1
                                                      id="pokemon_name"
                                                      className={`${styles.pokemon_name} ${setColorType(styles)}`}>
                                                      {`${pokemonDetail.name.toUpperCase()}`}
                                                </h1>
                                                <input
                                                      onChange={(e) => handleChange(e)}
                                                      autoComplete="off"
                                                      defaultValue={pokemonDetail.name}
                                                      id="input_pokemon_name"
                                                      type="text"
                                                      name='name'
                                                      className={
                                                            `${styles.pokemon_name}
                                                   ${styles.name_input} 
                                                   ${setColorType(styles)}
                                                   ${styles.hidden}
                                                   `
                                                      } />
                                                <p className={styles.pokemon_id}>#{pokemonDetail.id}</p>
                                          </div>
                                          < img src={pokemonDetail.image} alt="pokemon" className={styles.pokemon} />
                                          <div className={`${styles.circle} ${setBackgroundType(styles)}`}></div>
                                    </div>
                                    <div className={styles.pokemon_info}>

                                          <div className={`${styles.base_stats} ${setBackgroundType(styles)}`}>Base stats</div>
                                          <div id='edit_pokemon_stats' className={`${styles.pokemon_stats} ${styles.hidden}`}>
                                                {/* STRENGTH */}
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>Strength</p>
                                                      <input
                                                            onChange={(e) => handleChange(e)}
                                                            className={styles.range}
                                                            name="attack"
                                                            type="range"
                                                            defaultValue={pokemonDetail.attack}
                                                            max="255"
                                                            min="1"
                                                      />
                                                      <div>
                                                            <label id='attack_label'>
                                                                  {pokemonDetail.attack}
                                                            </label>
                                                      </div>
                                                </div>
                                                {/* DEFENSE */}
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>Defense</p>
                                                      <input
                                                            onChange={(e) => handleChange(e, "defense")}
                                                            className={styles.range}
                                                            name="defense"
                                                            type="range"
                                                            defaultValue={pokemonDetail.defense}
                                                            max="255"
                                                            min="1"
                                                      />
                                                      <div>
                                                            <label id='defense_label'>
                                                                  {pokemonDetail.defense}
                                                            </label>
                                                      </div>
                                                </div>
                                                {/* HP */}
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>HP</p>
                                                      <input
                                                            onChange={(e) => handleChange(e, "hp")}
                                                            className={styles.range}
                                                            name="hp"
                                                            type="range"
                                                            defaultValue={pokemonDetail.hp}
                                                            max="255"
                                                            min="1"
                                                      />
                                                      <div>
                                                            <label id='hp_label'>
                                                                  {pokemonDetail.hp}
                                                            </label>
                                                      </div>
                                                </div>
                                                {/* SPEED */}
                                                <div className={styles.stat_group}>
                                                      <p className={styles.stat_title}>Speed</p>
                                                      <input
                                                            onChange={(e) => handleChange(e, "speed")}
                                                            className={styles.range}
                                                            name="speed"
                                                            type="range"
                                                            defaultValue={pokemonDetail.speed}
                                                            max="255"
                                                            min="1"
                                                      />
                                                      <div>
                                                            <label id='speed_label'>
                                                                  {pokemonDetail.speed}
                                                            </label>
                                                      </div>
                                                </div>
                                          </div>
                                          <div id='pokemon_stats' className={styles.pokemon_stats}>
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
                                          {pokemonDetail.createdInDb && <img onClick={() => handleDelete(pokemonDetail.id)} className={styles.trash_can} src={trashCan} alt="delete pokemon" />}
                                          {pokemonDetail.createdInDb && <img id='edit_icon' onClick={() => handleEdit(pokemonDetail.id, styles)} className={styles.edit_icon} src={editIcon} alt="edit pokemon" />}
                                          {pokemonDetail.createdInDb && <img id="save_icon" onClick={() => handleSave(pokemonDetail.id, styles)} className={`${styles.save_icon} ${styles.hidden}`} src={saveIcon} alt="edit pokemon" />}

                                    </div>
                              </div>
                        )
                  }
            </div >
      )
}

export default DetailPokemon