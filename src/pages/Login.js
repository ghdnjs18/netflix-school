import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button } from "components"

import './Login.css'

const Login = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        name === 'id' ? setId(value) : setPassword(value)
        console.log(name, value)
    }

    const isNotValid = (user) => {
        return user.id === '' || user.password === ''
    }

    const handleLogin = () => {
        // 사용자 정보가 있으니까 불러오기
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (!isNotValid(user) && (id === user.id && password === user.password)) { // 세션 storage 객체 값 가져오기
            navigate('/home')
        } else {
            alert('You gaved wrong id or password !')
        }
    }

    return ( 
        <div className="login-container">
            <div className="login-content">
                <Input name='id' type='text' placeholder='Type ID ...' value={id} onChange={handleChange}/><br/>
                <Input name='password' type='password' placeholder='Type PASSWORD ...' value={password} onChange={handleChange}/>
                <Button handleClick={handleLogin} width='fullWidth'>Login</Button>
            </div>
        </div>
    )
}

export default Login