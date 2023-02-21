import React, { useEffect, useState } from 'react'
import api from '../api'
import '../css/Home.css'
import PostForm from '../components/PostForm'
import paw from '../images/dogo.png'
import dogo from '../images/paw.png'
import Post from '../components/Post'
import { useSessionStorage } from '../hooks/useSessionStorage'


export default function Home() {
  const [posts, setPosts] = useState([])
  const [ limit, setLimit ] = useSessionStorage('limit', 10)

  useEffect(() => {
      const fetchData = async () => {
        let data = await api.post.getPostsLimit({
          limit: limit,
        })
        setPosts(data.body || [])
      }
      fetchData()
  }, [])
  

  const handleLimit = (e) => {
    setLimit(e.target.value)
    window.location.reload()
  }
  
  return (
    <>
      <div className="home-container">
        <div class="title-container">
          <h1>Dogstagram</h1>
          <select onChange={handleLimit}>
            <option selected disabled value={limit}>{limit}</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="100">100</option>
          </select>
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
