import React, { useEffect, useState } from 'react'
import api from '../api'
import '../css/Home.css'
import PostForm from '../components/PostForm'
import paw from '../images/dogo.png'
import dogo from '../images/paw.png'
import Post from '../components/Post'


export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
      const fetchData = async () => {
        let data = await api.post.getPosts()
        setPosts(data.body || [])
      }
      fetchData()
  }, [])
  
  return (
    <>
      <div className="home-container">
        <div class="title-container">
          <h1>Dogstagram</h1>
        </div>
        <div class="content-container">
          <div className="post-uploader">
            <img src={dogo} alt="dogo" />
              <PostForm/>
            <img src={paw} alt="paw" />
          </div>
        </div>
        <div className="posts-container">
          {posts.map(p => <Post post={p}/>) }
          <br />
        </div>
      </div>
    </>
  )
}
