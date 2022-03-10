import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemons, filterOrigin, getPokemonDetail, resetPostedPokemon } from "../../actions";
import styles from './Pokemons.module.css'
import './Pokemons.module.css'
import Pokemon from '../Pokemon/Pokemon';
import Nav from '../Nav/Nav';
import Paginate from './Paginate'
import pokeball from '../../img/pokeball.gif'


function Pokemons() {
      const pokemons = useSelector(state => state.pokemons)
      const dispatch = useDispatch()

      const [currentPage, setCurrentPage] = useState(1)
      const [pokemonsPerPage, setpokemonsPerPage] = useState(12)
      const indexOfLastPokemon = currentPage * pokemonsPerPage;
      const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
      const currentPokes = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

      const paginate = function (pageNumber) {
            setCurrentPage(pageNumber)
      }

      const singlePaginate = function (e) {
            console.log(e.target.name);
            if (e.target.name === 'decrement')
                  if (currentPage === 1) return
                  else setCurrentPage(currentPage - 1)
            else if (currentPage === Math.ceil(pokemons.length / pokemonsPerPage)) return
            else setCurrentPage(currentPage + 1)
      }

      function resetPaginate() {
            setCurrentPage(1)
      }

      function handleFilterOrigin(event) {
            event.preventDefault()
            dispatch(filterOrigin(event.target.value))
            setCurrentPage(1)
      }

      useEffect(() => {
            !pokemons.length && dispatch(getPokemons());
            dispatch(getPokemonDetail())
            dispatch(resetPostedPokemon())
      }, [])

      console.log(pokemons);

      return (
            <div >
                  <Nav handleFilterOrigin={handleFilterOrigin} resetPaginate={resetPaginate} />

                  {pokemons.length
                        ?
                        pokemons[0].error
                              ?
                              <div className={styles.pokemons_card}>
                                    <Pokemon pokemon={{}} />
                              </div>

                              // <img src={sadPikachu} alt='pokeball' className={styles.broken_pokeball}></img>
                              :
                              (
                                    <div className={styles.pokemons_card}>
                                          {currentPokes.map(pokemon => {
                                                return (
                                                      <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                                                            <Pokemon pokemon={pokemon} />
                                                      </Link>)
                                          })}
                                    </div>
                              )

                        :
                        <img src={pokeball} alt='pokeball' className={styles.loading_pokeball}></img>}

                  <Paginate
                        pokemonsPerPage={pokemonsPerPage}
                        pokemons={pokemons}
                        paginate={paginate}
                        singlePaginate={singlePaginate} />
            </div>
      )
}

export default Pokemons