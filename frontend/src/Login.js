import React from 'react'
import { useState } from "react";
import './Styles.css'
import axios from 'axios';
import {useNavigate} from "react-router-dom";


axios.defaults.withCredentials = true;


function Login({status, setStatus}) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    
    const handleSubmit = (e) => {
e.preventDefault();


  axios.post('http://localhost:3001/auth', {
    email: email,
    password: password
  }).then((response) => {
    console.log(response.data)
    setStatus(response.data.status)
    navigate('/')
  })
}   


  return (
<div className='form-container'>
    {status}
<form onSubmit={handleSubmit}>
<h1 className='text-5xl'>Login</h1>
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
<button type="submit">go!</button>
</form>
</div>
)
}

export default Login