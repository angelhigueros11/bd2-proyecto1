import React from 'react'
import api from '../api'
import Swal from 'sweetalert2'
import '../css/Post.css'

export default function Post({post}) {

  const handleLike = async () => {
    const fetchData = await api.post.like({
      id: post._id
    })

    if (fetchData.error !== ''){
      Swal.fire(
        'Me gusta', 
        '',
        'successs'
      )
    } else {
      Swal.fire(
        'No se ha podido dar me gusta', 
        '',
        'error'
      )
    }
  }

  return (
    <div className='post'>
      <p>Username: {post.name}</p>
      <div className="image-container">
        <img src={`/${post.image}`} alt="" />
      </div>
      <div className="description">
            {post.description}
        </div>
      <div className="description">
          <button onClick={handleLike}>Me gusta</button>
      </div>
    </div>
  )
}
