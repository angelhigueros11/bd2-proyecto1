import React, { useEffect, useState } from 'react'
import api from '../api'
import '../css/Home.css'
import PostForm from '../components/PostForm'
import paw from '../images/dogo.png'
import dogo from '../images/paw.png'
import Post from '../components/Post'
import { useSessionStorage } from '../hooks/useSessionStorage'


export default function Home() {
  //Hooks
  const [posts, setPosts] = useState([])
  const [mostUser, setMostUser] = useState()
  const [ limit, setLimit ] = useSessionStorage('limit', 10)
  

  

  useEffect(() => {
      const fetchData = async () => {
        let data = await api.post.getPostsLimit({
          limit: limit,
        })
        let data2 = await api.post.getMostPostsUser()
        setMostUser(data2.body.count[0]._id)
        setPosts(data.body || [])
      }
      fetchData()
  }, [limit])
  
  // Handles
  const handleLimit = (e) => {
    setLimit(e.target.value)
    window.location.reload()
  }


  
  return (
    <>
      <div className="home-container">
        <div className="title-container">
          <h1>Dogstagram</h1>
        </div>
        <div className="data-admin">
            <div className="data">
              <div className="data-text">Limit of posts you can see</div>
              <select className='data-function' onChange={handleLimit}>
                <option selected disabled value={limit} >{limit}</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="data">
              <div className="data-text">User with the most number of post:</div>
              <div className="data-function">{mostUser}</div>
            </div>
        </div>

        <div className="content-container">
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
