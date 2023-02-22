import React from 'react'
import api from '../api'
import Swal from 'sweetalert2'
import '../css/Post.css'

export default function Post({post}) {

  const handleLike = async () => {
    const fetchData = await api.post.like({
      id: post._id
    })

    if (fetchData.error == ''){
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

  const handleDelete = async () => {
    const fetchData = await api.post.remove({
      id: post._id
    })

    if (fetchData.error == ''){
      Swal.fire(
        'Post eliminado', 
        '',
        'successs'
      )
    } else {
      Swal.fire(
        'No se ha podido eliminar el posts', 
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
        <div>
          # {post?.tags.map(tag => <span class="tag">{tag}</span>)}
        </div>
      <div className="buttons">
          <button onClick={handleLike}>Me gusta</button>
          <button onClick={handleDelete}>Elimnar</button>
          <div className='likes'>Likes: {post.likes}</div>
      </div>
    </div>
  )
}
