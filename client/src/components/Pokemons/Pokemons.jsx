import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPokemons } from "../../actions";
import styles from './Pokemons.module.css'
import Pokemon from '../Pokemon/Pokemon';

function Pokemons() {
      const pokemons = useSelector(state => state.pokemons)
      const dispatch = useDispatch()

      function findPokes() {
            dispatch(getPokemons())
      }
      useEffect(() => {
            findPokes()
      }, [])

      return (
            <div className={styles.pokemons_card}>
                  {pokemons.length ?
                        pokemons.map(poke => <Pokemon key={poke.id} pokemon={poke} />) :
                        <h1>Loading...</h1>}

            </div>
      )
}

export default Pokemons