import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Movie, Button, Menu, Modal} from 'components'

import './Recommendation.css'

const Recommendation = () => {
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

    const location = useLocation()
    const { movies } = location.state
    const navigate = useNavigate()
    // console.log(movies)

    // 좋아요 정보 가지고오기
    const likes = JSON.parse(sessionStorage.getItem('likes'))

    // 클릭시 좋아요 올리기
    const updateLikes = (id) => {
        const likes = JSON.parse(sessionStorage.getItem('likes')) || {}
        
        if (likes[id] === null || likes[id] === undefined) {
            likes[id] = 0
        }
        likes[id] += 1
        sessionStorage.setItem('likes', JSON.stringify(likes))
    }

    const bestMovies = movies
        .sort((a, b) => {
            return (b.rating - a.rating);
        })
        .slice(0, 3)
        .map(movie => 
                <Link key={movie.id}
                    to='/detail'
                    state={{ movie }}
                    style={{ textDecoration: 'none', color:'whith' }}
                    onClick={() => updateLikes(movie.id)}>
                        <Movie
                            title={movie.title}
                            genres={movie.genres}
                            cover={movie.medium_cover_image}
                            summary={movie.summary}
                            year={movie.year}
                            rating={movie.rating}
                            likes={likes[movie.id]}/>
                    </Link>)
    
    const toHomePage = () => {
        navigate('/home')
    }

    // likes 객체를 배열 객체로 변환하기
    const likesArray = []
    for (let like in likes) {
        likesArray.push({id: like, favorite: likes[like]})
    }
    console.log(likesArray)

    // favorite 기준으로 정렬 하기
    const bestMoviesByLike = likesArray
        .sort((a, b) => {
            return (b.favorite - a.favorite);
        })
        .slice(0, 3)
        .map( likeinfo => {
            const movieId = parseInt(likeinfo.id)
            const movie = movies.filter(movie => movie.id === movieId)[0]
            console.log(movie)

            return (
                <Link key={movie.id}
                    to='/detail'
                    state={{ movie }}
                    style={{ textDecoration: 'none', color:'whith' }}
                    onClick={() => updateLikes(movie.id)}>
                        <Movie
                            title={movie.title}
                            genres={movie.genres}
                            cover={movie.medium_cover_image}
                            summary={movie.summary}
                            year={movie.year}
                            rating={movie.rating}
                            likes={likes[movie.id]}/>
                    </Link>
            )
        })

    return (
        <div className='Recommendation-container'>
            <Menu>
                <Button handleClick={toHomePage}>Home</Button>
            </Menu>
            <div className='Recommendation-text first-text'>Best Movies by rating</div>
            <div className='Recommendation-bestmovies'>{bestMovies}</div>
            <div className='Recommendation-text second-text'>Best Movies by likes</div>
            <div className='Recommendation-bestmovies'>{bestMoviesByLike}</div>
        </div>
    )
}

export default Recommendation