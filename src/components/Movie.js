import React from 'react'

import './Movie.css'

const Movie = ({title, genres, cover, summary, year, rating, likes}) => {
    const summaryText = (str) => {
        return title.length + str.length > 80 ? str.substr(0, 79-title.length) + "..." : str;
    }
    return (
        <div className='movie-container'>
            <img src={cover} alt={title}/>
            <h3>{title} ({year})({rating})</h3>
            <h4>{genres.join(" / ")}</h4>
            <h4>❤️{likes?likes:0}</h4>
            <p>{summaryText(summary)}</p>
        </div>
    )
}

export default Movie