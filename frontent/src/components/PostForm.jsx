import React, {useState} from 'react'
import api from '../api';
import '../css/PostForm.css'
import Swal from 'sweetalert2'
import { useSessionStorage } from '../hooks/useSessionStorage'

const PostForm = () => {
    const [ nameSession ] = useSessionStorage('name', '')

    const [postDescription, setPostDescription] = useState();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleData = (e) => {
      setPostDescription(e.target.value)
    };

    const handleFile = (e) => {
      setSelectedFile(e.target.files[0]);
    };

  
    const onSubmit = async (event) => {
      event.preventDefault();

      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  
      const fetchData = await api.post.addPost({
        name: nameSession,
        description: postDescription,
        image: `${parseInt(uniqueId, 36)}.jpg`
      })

      const nameImage = `${parseInt(uniqueId, 36)}`

      const formData = new FormData();
      formData.append('profileImg', selectedFile);
    
      fetch(`/api/image/${nameImage}`, {
        method: 'POST',
        body: formData
      })
      


      if(fetchData.error === ''){
        Swal.fire(
          'Publicado',
          'Tu post se ha publicado correctamente',
          'success'
        )
      }else{
          Swal.fire(
            'Error',
            'Tu post no se ha podido crear',
            'error'
          )
        }
    }

    return (
      
        <div className="post-container">
        <form onSubmit={onSubmit}  enctype="multipart/form-data">
            <h1>Hi {nameSession}, Post something 'bout ur Doggo!!!</h1>
            <input type="text" onChange={handleData} value={postDescription} placeholder='Doggo time...'/>
            <input type="file" onChange={handleFile} />
            <button type="submit">Upload Image</button>
        </form>
        </div>
    );
  };
  
  export default PostForm;
