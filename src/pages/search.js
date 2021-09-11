import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { getSearch } from "../services/api"
import { IMG_PATH } from "../constants/api"

const Search = () => {
  const [input, setInput] = useState('')
  const [movies, setMovies] = useState(null)
  const [tv, setTv] = useState(null)
  const [select, setSelect] = useState('Movie')

  const selectRef = useRef(null)

  useEffect(() => {
    if (select === 'Movie') {
      selectRef.current.style.transform = 'translateX(0)'
    } else if (select === 'Tv') {
      selectRef.current.style.transform = 'translateX(100%)'
    }
  }, [select])

  useEffect(() => {
    const getData = async () => {
      const result = await getSearch(input)
      setMovies(result.results.filter(item => item.media_type === 'movie' && item.poster_path))
      setTv(result.results.filter(item => item.media_type === 'tv' && item.poster_path))
    }

    if (input === '') {
      setMovies(null)
      setTv(null)
      return
    }
    getData()
  }, [input])

  return (
    <section className='search__wrapper'>
      <div className='search__container'>
        <div className='search__bar'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" /></svg>
          <input
            className='search__bar--field'
            type='search'
            placeholder='Search Movies & TV Shows'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className='search__select'>
          <h2 onClick={() => setSelect('Movie')}>Movies</h2>
          <h2 onClick={() => setSelect('Tv')}>Tv Shows</h2>
          <span ref={selectRef}></span>
        </div>
        <div className='search__result'>
          {
            (movies === null && tv === null)
              ? <h1 className='show-message'>Search Your Favorite Movies & TV Shows</h1>
              : (
                <>
                  {select === 'Movie' &&
                    (movies?.length > 0 ? movies.map(item => (
                      <Link
                        key={item.id}
                        to={`/browse/${item.media_type}/${item.id}`}
                        className="list__items--image"
                      >
                        <img
                          className="list__items--img  list__items--poster"
                          src={`${IMG_PATH}/${item.poster_path
                            }`}
                          alt={item.title}
                        />
                      </Link>)) : <h3 className='show-message'>Sorry, we found 0 Movies for "{input}"</h3>)}
                  {select === 'Tv' && (tv?.length > 0 ? tv.map(item => (
                    <Link
                      key={item.id}
                      to={`/browse/${item.media_type}/${item.id}`}
                      className="list__items--image"
                    >
                      <img
                        className="list__items--img  list__items--poster"
                        src={`${IMG_PATH}/${item.poster_path
                          }`}
                        alt={item.title}
                      />
                    </Link>)) : <h3 className='show-message'>Sorry, We found 0 TV Shows for "{input}</h3>)}
                </>
              )

          }
        </div>
      </div>
    </section>
  )
}

export default Search
