import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Movie, Loading, Input, Button, Menu } from 'components'

import './Home.css'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')
    const [isSorted, setIsSorted] = useState(-1)
    const navigate = useNavigate()

    const likes = JSON.parse(sessionStorage.getItem('likes')) || {}
    // console.log(likes)

    useEffect(() => {
        fetch('https://yts.mx/api/v2/list_movies.json?sort_by=download_count')
        .then( res => res.json())
        .then( result => {
            const {data: {movies}} = result
            // console.log(movies)
            setLoading(false)
            setMovies(movies)
        })
    }, [])

    const handleChange = (e) => {
        const { value } = e.target
        setQuery(value)
    }

    // 정렬 순서 바꾸기
    const sortByYear = (e) => {
        setIsSorted(isSorted * -1)
    }

    // 범위를 초과하는 내용 자르기
    // const summaryText = (str, title) => {
    //     return title.length + str.length > 100 ? str.substr(0, 99-title.length) + "..." : str;
    // }

    const updateLikes = (id) => {
        const likes = JSON.parse(sessionStorage.getItem('likes')) || {}
        
        if (likes[id] === null || likes[id] === undefined) {
            likes[id] = 0
        }
        likes[id] += 1
        sessionStorage.setItem('likes', JSON.stringify(likes))
    }

    const homeUI = movies
        .filter(movie => {
            const title = movie.title.toLowerCase()
            const genres = movie.genres.join(' / ').toLowerCase()
            const q = query.toLowerCase()

            return title.includes(q) || genres.includes(q)
        })
        .sort((a, b) => {
            return (b.year - a.year) * isSorted;
        })
        // 조회 
        .map((movie) => 
            <Link 
                key={movie.id}
                to='/detail' 
                style={{textDecoration: 'none', color: 'white'}}
                state={{movie}}
                onClick={() => updateLikes(movie.id)}>
                <Movie
                    key={movie.id}
                    title={movie.title}
                    genres={movie.genres}
                    cover={movie.medium_cover_image}
                    // summary={summaryText(movie.summary, movie.title)}
                    summary={movie.summary}
                    year={movie.year}
                    rating={movie.rating}
                    likes={likes[movie.id]}/>
            </Link>
        )

    const toRankPage = () => {
        navigate('/recommend', {state: { movies }})
    }

    return ( 
        <>
            {loading ? <Loading/> : 
            <div className='home-container'>
                <Menu>
                    <Button handleClick={toRankPage}>Rank</Button>
                </Menu>
                <div className="home-contents">
                    <Input name='search' type='text' placeholder='Search movies...' value={query} onChange={handleChange}/>
                    <Button handleClick={sortByYear}>정렬</Button>
                    <div className="home-movies">{homeUI}</div>
                </div>
            </div>}
</>
    )
}

export default Home