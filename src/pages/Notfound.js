import React from 'react'
import notFoundImg from '../assets/images/Page-Not-Found-Error-404.png'

const NotFound = () => {
    return (
        <div className='NotFound-container' style={{width: '100%', height: '100vh'}}>
            <img src={notFoundImg} alt="notfound" width='100%' height='100%'/>
        </div>
    )
}

export default NotFound