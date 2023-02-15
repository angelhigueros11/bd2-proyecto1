import React from 'react'
import '../css/Post.css'

export default function Post({post}) {


  return (
    <div className='post'>
      <p>Username: {post.name}</p>
      <div className="image-container">
        <img src={`/${post.image}`} alt="" />
      </div>
      <div className="description">
            {post.description}
        </div>
    </div>
  )
}
