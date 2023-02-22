import React, { useState } from 'react'
import '../css/Signup.css'
import Swal from 'sweetalert2'
import api from '../api'


export default function Signup() {

  const [userData, setUserData] = useState({
    name: '', 
    password: '',
    phone: '',
    address: '',
    email: ''
  })
  const {name, password, phone, address, email} = userData

  const handleData = (e) => {
    setUserData({
      ...userData, 
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fetchData = await api.auth.addUser({
      name: name, 
      password: password,
      phone: phone,
      address: address,
      email: email,
    })

    if (fetchData.error === ''){
      Swal.fire(
        'Guardado',
        'Usuario creado con exito',
        'success'
      )
    }else {
      Swal.fire(
        'Error',
        'No se pudo guardar el usuario, intentelo de nuevo',
        'error'
      )
    }

   
  }

  return (
    <>
      <h1 >Registrate hoy</h1>
      <div className="form-container">
        <form id="form-style" onSubmit={handleSubmit} method="post">
          <h2 >Sign up</h2>
          <input  type="text" name="name" value={name} onChange={handleData} placeholder="Name" />
          <input type="password" name="password" value={password} onChange={handleData} placeholder="Password" />
          <input type="text" name="phone" value={phone} onChange={handleData} placeholder="Telefono" />
          <input type="text" name="address" value={address} onChange={handleData} placeholder="Direccion" />
          <input type="text" name="email" value={email} onChange={handleData} placeholder="Email" />
          <input type="submit" />
        </form>
        <a href="/">Go back</a>
      </div>
    </>
  )
}
