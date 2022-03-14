import React from 'react'
import styles from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { useDispatch, useSelector } from 'react-redux';
import { orderAlph, getTypes, filterTypes, orderStrength } from '../../actions';
import { useEffect } from 'react';
import { capitalizeString } from '../../utils'
import logo from '../../img/pokemon_logo.png'
import { Link } from 'react-router-dom'
import pokeballDrawing from '../../img/pokeball_draw.svg'

function Nav({ handleFilterOrigin, resetPaginate }) {

      const types = useSelector(state => state.types)
      const dispatch = useDispatch()


      function handleOrderAlph(event) {
            event.preventDefault()
            dispatch(orderAlph(event.target.value));
      }

      function handleOrderStrength(event) {
            event.preventDefault()
            dispatch(orderStrength(event.target.value))
      }

      function handleFilterTypes(event) {
            event.preventDefault()
            dispatch(filterTypes(event.target.value))
      }

      function findTypes() {
            dispatch(getTypes())
      }
      useEffect(() => {
            !types.length && findTypes();
      }, [])


      return (

            <div className={styles.nav_bar}>

                  <div className={styles.logo_section}>
                        <Link to='/'>
                              <img className={styles.logo} src={logo} alt="logo" />
                        </Link>
                  </div>
                  <div className={styles.filters}>
                        <div className={styles.filter_group}>
                              <select onChange={(event) => handleOrderAlph(event)} className={styles.select}>
                                    <option >Name</option>
                                    <option value="asc">A-Z</option>
                                    <option value="desc">Z-A</option>
                              </select>
                        </div>
                        <div className={styles.filter_group}>

                              <select onChange={(event) => handleOrderStrength(event)} className={styles.select}>
                                    <option >Strength</option>
                                    <option value="asc">Ascendant</option>
                                    <option value="desc">Descendant</option>
                              </select>
                        </div>
                        <div className={styles.filter_group}>
                              <select onChange={(event) => handleFilterOrigin(event)} className={styles.select}>
                                    <option >Origin</option>
                                    <option value="all">All</option>
                                    <option value="created">Created</option>
                                    <option value="existing">Existing</option>
                              </select>
                        </div>
                        <div className={styles.filter_group}>
                              <select onChange={(event) => handleFilterTypes(event)} className={styles.select}>
                                    <option value="all">All types</option>
                                    {types?.map(type => <option key={type.name} value={type.name}>{capitalizeString(type.name)}</option>)}
                              </select>
                        </div>
                  </div>
                  <SearchBar className={styles.search_bar} resetPaginate={resetPaginate} />

                  <div className={styles.create_section}>
                        <Link className={styles.create_button} to='/create'>
                              <label >CREATE</label>
                              <img className={styles.pokeball_drawing} src={pokeballDrawing} alt="" />
                        </Link>
                  </div>
            </div >
      )
}

export default Nav