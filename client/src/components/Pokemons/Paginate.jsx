import React from 'react'
import styles from './Paginate.module.css'


function Paginate({ pokemonsPerPage, pokemons, paginate, singlePaginate }) {
      const pageNumbers = [];

      for (let i = 0; i < Math.ceil(pokemons.length / pokemonsPerPage); i++) {
            pageNumbers.push(i + 1)
      }

      return (
            <div>
                  <ul className={styles.page_numbers}>
                        {pageNumbers.length > 0 && <button name="decrement" onClick={(e) => singlePaginate(e)} className={styles.single_pager}>{`<`}</button>}
                        {pageNumbers?.map(number =>
                        (<li key={number} >
                              <button className={styles.number} onClick={() => paginate(number)}>{number}</button>
                        </li>)
                        )}
                        {pageNumbers.length > 0 && <button name="increment" onClick={(e) => singlePaginate(e)} className={styles.single_pager}>{`>`}</button>}

                  </ul>

            </div>
      )
}

export default Paginate