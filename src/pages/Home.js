import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Movie, Loading, Input, Button, Menu, Modal } from 'components'

import './Home.css'

const Home = () => {
    // 사용자 정보 유무에 따른 페이지 접근 제한하기
    const navigateToRegister = useNavigate()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [open, setOpen] = useState(false)
    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        // alert('Sorry ! You need to register first !')
        navigateToRegister('/')
    }
    if (!user) {
        useEffect (() => {
            openModal()
        })
        return <>
            {/* 모달창 */}
            <Modal open={open}>
                <div className="header">-- Waring messge --</div>
                <div className="body">
                    Sorry ! You need to register first !
                </div>
                <div className="footer">
                    <Button size='small' handleClick={closeModal}>Close</Button>
                </div>
            </Modal>
        </>
    }

    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')
    const [isSorted, setIsSorted] = useState(1)
    const [limit, setLimit] = useState(6)
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

    // 지정 영화 삭제
    const handleRemove = (id) => {
        const moviesFiltered = movies.filter(movie => movie.id !== id)
        setMovies(moviesFiltered)

        // likes 리스트에서도 해당 영화에 대한 좋아요 정보 제거
        const likes = JSON.parse(sessionStorage.getItem('likes')) || {}
        delete likes[id]
        sessionStorage.setItem('likes', JSON.stringify(likes))
    }

    // 전체 영화목록 보여주기
    const displayEntireMovies = () => {
        console.log('display all movies !')
        setLimit(movies.length)
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
        .slice(0, limit)
        // 조회 
        .map((movie) => 
            <div className="movie-item" key={movie.id}>
                <div className="movie-delete" onClick={(e) => handleRemove(movie.id)}>X</div>
                <Link 
                    to='/detail' 
                    style={{textDecoration: 'none', color: 'white'}}
                    state={{movie}}
                    onClick={() => updateLikes(movie.id)}>
                    <Movie
                        title={movie.title}
                        genres={movie.genres}
                        cover={movie.medium_cover_image}
                        // summary={summaryText(movie.summary, movie.title)}
                        summary={movie.summary}
                        year={movie.year}
                        rating={movie.rating}
                        likes={likes[movie.id]}/>
                </Link>
            </div>
        )

    const toRankPage = () => {
        navigate('/recommend', {state: { movies }})
    }

    return ( 
        <>
            {loading ? <Loading/> : 
            <div className='home-container'>
                <Menu>
                    <Button handleClick={displayEntireMovies}>See Entire Movies</Button>
                    <Button handleClick={toRankPage}>Rank</Button>
                </Menu>
                <div className="home-contents">
                    <Input name='search' type='text' placeholder='Search movies...' value={query} onChange={handleChange}/>
                    <Button handleClick={sortByYear}>{isSorted === -1 ? 'New':'Old'}</Button>
                    <div className="home-movies">{homeUI}</div>
                </div>
            </div>}
</>
    )
}

export default Home