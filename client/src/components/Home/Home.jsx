import React from 'react'
import styles from './Home.module.css'
import background from '../../img/bulbasur.png'
import logo from '../../img/pokemon_logo.png'
import { Link } from 'react-router-dom'

function Home() {

      return (

            <div className={styles.home_container}>
                  <div className={styles.home}>
                        <div className={styles.welcome}>
                              <img className={styles.logo} src={logo} alt="pokemon logo" />
                              <h1>THE WIKI</h1>
                              <Link to='/home' ><button className={styles.start_button}>START</button></Link>
                        </div>
                        <img className={styles.img} src={background} alt="bulbasur" />
                  </div>
            </div>

      )
}

export default Home