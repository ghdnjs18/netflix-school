import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Movie, Button, Menu, Modal } from 'components'

import './Detail.css'

const Detail = () => {
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

    const location = useLocation();
    const { movie } = location.state;
    const { yt_trailer_code } = movie
    const navigate = useNavigate()
    console.log(movie)

    // 좋아요 정보 가져오기
    const likes = JSON.parse(sessionStorage.getItem('likes'))
    console.log(likes)

    const watchMovieTrailer = () => {
        window.location.href = yt_trailer_code? `https://youtube.com/watch?v=${yt_trailer_code}`:""
    }

    const toHomePage = () => {
        navigate('/home')
    }

    // const toRankPage = () => {
    //     navigate('/recommend', {state: { movie }})
    // }

    return (
        <div className='Detail-container'>
            <Menu>
                {/* <Button handleClick={toRankPage}>Rank</Button> <br/> */}
                <Button handleClick={toHomePage}>Home</Button>
            </Menu>
            <div className='Detail-contents'>
                <Movie 
                    title={movie.title} 
                    genres={movie.genres} 
                    cover={movie.medium_cover_image} 
                    summary={movie.summary}
                    year={movie.year}
                    rating={movie.rating}
                    likes={likes[movie.id]}>    
                </Movie>

                <div className='Movie-info'>
                    <p className='Movie-runtime'>Runtime {movie.runtime} min.</p>
                    <p className='Movie-summary'>{movie.summary}</p>
                    <a href={movie.torrents.length !== 0 ? movie.torrents[0].url : ''} download>Download Torrent</a><br/>
                    <Button handleClick={watchMovieTrailer}>Watch Youtube trailer</Button>
                </div>
            </div>
        </div>
    )
}

export default Detail