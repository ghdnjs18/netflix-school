import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button, Modal } from 'components'

import './Register.css'

const Register = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        name === 'id' ? setId(value) : setPassword(value)
        console.log(name, value)
    }

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const handleRegister = () => {
        // JSON.parse를 이용하는 이유 문자로 되어있는 정보를 json정보로 변경하여 사용하기 위해서 
        if (JSON.parse(sessionStorage.getItem('user'))) { // 세션 storage 객체 값 가져오기
            navigate('/login')
            // 사용자 정보가 없으면 사용자를 생성하고 홈페이지로 이동하기
        } else {
            // 사용자 정보를 입력하지도 않고 그냥 버튼 누르면 곧바로 데이터 저장해버림
            if (id !== '' && password !== '') {
                sessionStorage.setItem('user', JSON.stringify({ id, password }))
                navigate('/home')
            } else {
                // alert('You need to give right user info.')
                openModal()
            }
        }
    }

    return ( 
        <div className="register-container">
            <div className="register-content">
                <Input name='id' type='text' placeholder='Type ID ...' value={id} onChange={handleChange}/><br/>
                <Input name='password' type='password' placeholder='Type PASSWORD ...' value={password} onChange={handleChange}/><br/>
                <Button handleClick={handleRegister} width='fullWidth' >Reguster</Button>
            </div>
            
            {/* 모달창 */}
            <Modal open={open}>
                <div className="header">-- Waring messge --</div>
                <div className="body">
                    You need to give right user info.
                </div>
                <div className="footer">
                    <Button size='small' handleClick={closeModal}>Close</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Register