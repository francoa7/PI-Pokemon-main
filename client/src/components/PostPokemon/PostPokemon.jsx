import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postPokemon, getPokemons } from '../../actions';
import styles from './PostPokemon.module.css'
import { capitalizeString } from '../../utils'
import { Link, useNavigate } from 'react-router-dom'

function PostPokemon() {

      const dispatch = useDispatch()
      const dataTypes = useSelector(state => state.types)
      const existingPokemons = useSelector(state => state.dataPokemons)
      const lastPostedPokemon = useSelector(state => state.lastPostedPokemon)
      const navigate = useNavigate();

      const [errors, setErrors] = useState({
            default: 'Complete all fields'
      });

      const [input, setInput] = useState({
            name: "",
            hp: null,
            attack: null,
            defense: null,
            speed: null,
            height: null,
            weight: null,
            types: [],
      });

      function handleInputChange(e) {
            e.preventDefault();

            setInput({
                  ...input,
                  [e.target.name]: e.target.value,
            })
            setErrors(validate({
                  ...input,
                  [e.target.name]: e.target.value
            }, existingPokemons));
      }

      function handleNumberInputChange(e) {
            e.preventDefault();
            setInput({
                  ...input,
                  [e.target.name]: Number(e.target.value),
            })
            setErrors(validate({
                  ...input,
                  [e.target.name]: Number(e.target.value)
            }, existingPokemons));
      }

      function handleTypeSelect(e) {
            e.preventDefault()
            const existingType = input.types.find(type => type === e.target.value)
            if (existingType) return
            setInput({
                  ...input,
                  types: [...input.types, e.target.value]
            })
            setErrors(validate({
                  ...input,
                  types: [...input.types, e.target.value]
            }, existingPokemons));
      }
      async function handleSubmit(e) {
            e.preventDefault()
            await dispatch(postPokemon(input));
            await dispatch(getPokemons());
            console.log(lastPostedPokemon);

      }
      // console.log("LAST POSTED POKEMON");
      // console.log(lastPostedPokemon);
      // console.log("-----------------------------");

      function handleDeleteType(e, deleteType) {
            e.preventDefault();

            setInput({
                  ...input,
                  types: input.types.filter(type => type !== deleteType)
            })
      }


      return (
            <div className={styles.page_container}>
                  {Object.entries(lastPostedPokemon).length !== 0 && navigate(`/pokemon/${lastPostedPokemon.id}`)}
                  <Link to='/home'
                        className={`
                                          ${styles.go_back} 
                                          `}>
                        Back
                  </Link>
                  <div className={styles.image_container}>
                        <img className={styles.default_pokemon} src="http://localhost:3001/pokemons/image/default-pokemon" alt="default pokemon" />
                  </div>

                  <div className={styles.form_container}>

                        {Object.entries(errors).length !== 0 ?
                              (<p className={styles.danger}>{errors[Object.keys(errors)[0]]}</p>) :
                              <p className={styles.succes}>Well done!</p>}

                        <form onSubmit={(e) => handleSubmit(e)}>
                              <div className={styles.title}>
                                    <label className={styles.label}>Pokemon name</label>
                                    <input type="text" name="name" value={input.name} className={`${styles.input_text} ${errors.name && styles.danger}`}
                                          onChange={(e) => handleInputChange(e)}
                                          autoComplete='off'
                                          required />

                              </div>

                              <div className={styles.stats_group}>
                                    <div className={styles.stat}>
                                          <label className={styles.label}>HP</label>
                                          <input
                                                type="number"
                                                name="hp"
                                                max={255}
                                                min={1}
                                                onChange={(e) => handleNumberInputChange(e)}
                                                className={`${styles.input_number} ${errors.hp && styles.danger}`} />
                                    </div>
                                    <div className={styles.stat}>
                                          <label className={styles.label}>Attack</label>
                                          <input
                                                type="number"
                                                name="attack"
                                                max={255}
                                                min={1}
                                                onChange={(e) => handleNumberInputChange(e)}
                                                className={`${styles.input_number} ${errors.attack && styles.danger}`} />

                                    </div>

                                    <div className={styles.stat}>
                                          <label className={styles.label}>Defense</label>
                                          <input
                                                type="number"
                                                name="defense"
                                                max={255}
                                                min={1}
                                                onChange={(e) => handleNumberInputChange(e)}
                                                className={`${styles.input_number} ${errors.defense && styles.danger}`} />


                                    </div>

                                    <div className={styles.stat}>
                                          <label className={styles.label}>Speed</label>
                                          <input
                                                type="number"
                                                name="speed"
                                                max={255}
                                                min={1}
                                                onChange={(e) => handleNumberInputChange(e)}
                                                className={`${styles.input_number} ${errors.speed && styles.danger}`} />

                                    </div>

                                    <div className={styles.stat}>
                                          <label className={styles.label}>Height</label>
                                          <input
                                                type="number"
                                                name="height"
                                                max={255}
                                                min={1}
                                                onChange={(e) => handleNumberInputChange(e)}
                                                className={`${styles.input_number} ${errors.height && styles.danger}`} />


                                    </div>

                                    <div className={styles.stat}>
                                          <label className={styles.label}>Weight</label>
                                          <input
                                                type="number"
                                                name="weight"
                                                max={255}
                                                min={1}
                                                onChange={(e) => handleNumberInputChange(e)}
                                                className={`${styles.input_number} ${errors.weight && styles.danger}`} />


                                    </div>

                              </div>

                              <div className={styles.types_section}>
                                    <label>Types</label>
                                    <select className={styles.types_list} onChange={(e) => handleTypeSelect(e)}>
                                          {dataTypes && dataTypes.map((type) =>
                                                <option key={type.name} value={type.name}>
                                                      {capitalizeString(type.name)}
                                                </option>
                                          )}
                                    </select>
                                    <ul className={styles.selected_types}>
                                          {input.types?.map(type =>
                                                <li>
                                                      <button onClick={(e) => handleDeleteType(e, type)}>-</button>
                                                      {type}
                                                </li>
                                          )}
                                    </ul>

                              </div>

                              <input type="submit" name="" id="" className={styles.inputSubmit} disabled={Object.keys(errors).length} />
                        </form >
                  </div>
            </div >
      );
}

export function validate(input, existingPokemons) {
      let errors = {};


      if (!input.name) {
            errors.name = 'Pokemon name is required';
      } else if (typeof input.name !== 'string' || input.name.length < 2) {
            errors.name = 'Pokemon name is invalid';
      } else if (existingPokemons.find((pokemon) => pokemon.name === input.name)) {
            errors.name = `Pokemon named ${input.name} already exists`;
      }

      else if (!input.hp) {
            errors.hp = "Pokemon HP is required";
      } else if (typeof input.hp !== 'number' || input.hp < 1 || input.hp > 255) {
            errors.hp = "HP must be a number between 0 - 255"
      } else if (!input.attack) {
            errors.attack = "Pokemon ATTACK stat is required";
      } else if (typeof input.attack !== 'number' || input.attack < 1 || input.attack > 255) {
            errors.attack = "ATTACK must be a number between 0 - 255"
      } else if (!input.defense) {
            errors.defense = "Pokemon DEFENSE stat is required";
      } else if (typeof input.defense !== 'number' || input.defense < 1 || input.defense > 255) {
            errors.defense = "DEFENSE must be a number between 0 - 255"
      } else if (!input.speed) {
            errors.speed = "Pokemon SPEED stat is required";
      } else if (typeof input.speed !== 'number' || input.speed < 1 || input.speed > 255) {
            errors.speed = "SPEED must be a number between 0 - 255"
      } else if (!input.height) {
            errors.height = "Pokemon HEIGHT stat is required";
      } else if (typeof input.height !== 'number' || input.height < 1 || input.height > 255) {
            errors.height = "HEIGHT must be a number between 0 - 255"
      } else if (!input.weight) {
            errors.weight = "Pokemon WEIGHT stat is required";
      } else if (typeof input.weight !== 'number' || input.weight < 1 || input.weight > 255) {
            errors.weight = "WEIGHT must be a number between 0 - 255"
      } else if (input.types.length === 0) errors.types = "You must select the pokemon types"

      return errors;
};


export default PostPokemon