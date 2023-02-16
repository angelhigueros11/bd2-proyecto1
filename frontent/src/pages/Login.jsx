import React, { useState } from 'react'
import Swal from 'sweetalert2'
import api from '../api'
import '../css/Login.css'
import { useSessionStorage } from '../hooks/useSessionStorage'

export default function Login() {
  const [, setSession ] = useSessionStorage('name', '')
  const [, setIdSession ] = useSessionStorage('idUser', '')
  const [userData, setUserData] = useState({
    name: '', 
    password: ''
  })
  const {name, password} = userData

  const handleData = (e) => {
    setUserData({
      ...userData, 
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fetchData = await api.auth.login({
      name: name, 
      password: password
    })

    if (fetchData.error === '' && fetchData.body.length > 0){
      setIdSession(fetchData.body[0]._id)
      setSession(name)
      window.location.href = '/home'
    }else {
      Swal.fire(
        'Error',
        'Tus datos no son correctos',
        'question'
      )
    }

   
  }


  return (
    <>
      <div className="form-container">
        <form id="form-style" onSubmit={handleSubmit} method="post">
          <h1>LogIn</h1>
          <input  type="text" name="name" value={name} onChange={handleData} placeholder="Name" />
          <input type="password" name="password" value={password} onChange={handleData} placeholder="Password" />
          <input type="submit" />
          <div class="box2">
          </div>
        </form>
        <a href="/signup">Make a new account</a>
      </div>
    </>
  )
}
