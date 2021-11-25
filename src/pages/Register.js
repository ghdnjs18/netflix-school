import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button } from 'components'

import './Register.css'

const Register = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        name === 'id' ? setId(value) : setPassword(value)
        console.log(name, value)
    }

    const handleRegister = () => {
        // JSON.parse를 이용하는 이유 문자로 되어있는 정보를 json정보로 변경하여 사용하기 위해서 
        if (JSON.parse(sessionStorage.getItem('user'))) { // 세션 storage 객체 값 가져오기
            navigate('/login')
        } else {
            // 사용자 정보를 입력하지도 않고 그냥 버튼 누르면 곧바로 데이터 저장해버림
            if (id !== '' && password !== '') {
                sessionStorage.setItem('user', JSON.stringify({ id, password }))
                navigate('/home')
            } else {
                alert('You need to give right user info.')
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
        </div>
    )
}

export default Register