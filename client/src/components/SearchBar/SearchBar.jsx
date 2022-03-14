import React from 'react'
import { useDispatch } from 'react-redux'
import { getPokemons } from '../../actions';
import styles from './SearchBar.module.css'
import search from '../../img/search.png'

function SearchBar({ resetPaginate }) {
      const dispatch = useDispatch()

      function handleSubmit(event) {
            event.preventDefault();
            dispatch(getPokemons(document.getElementById('input_pokemon_name').value.toLowerCase()))
            resetPaginate()
            document.getElementById('input_pokemon_name').value = "";
      }
      return (
            <div >
                  <form className={styles.search_bar} onSubmit={(event) => handleSubmit(event)} >

                        <input
                              className={styles.search_input}
                              id='input_pokemon_name'
                              name="name"
                              type="text"
                              placeholder="Search by name..."
                              autoComplete='off' />

                        <input type="image" width="30px" src={search} className={styles.search_submit} />
                  </form>
            </div >
      )
}

export default SearchBar