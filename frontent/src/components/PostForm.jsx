import React, {useEffect, useState} from 'react'
import api from '../api';
import '../css/PostForm.css'
import Swal from 'sweetalert2'
import { useSessionStorage } from '../hooks/useSessionStorage'

const PostForm = () => {
    const [ nameSession ] = useSessionStorage('name', '')
    const [ idSession ] = useSessionStorage('idUser', '')
  const [ contactInfo, setContactInfo ] = useState({})


    const [postDescription, setPostDescription] = useState();
    const [tags, setTags] = useState();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleData = (e) => {
      setPostDescription(e.target.value)
    };

    const handleTags = (e) => {
      setTags(e.target.value)
    };

    const handleFile = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    // Obtener la informacion del contacto del usuario
    useEffect(()=> {
      const fetchData = async () => {

        let data = await api.auth.getContactUser({
          _id: idSession
        })

        if(data.error === ''){
          setContactInfo(data.body[0].contact)
        }

      }

      fetchData()

    }, [])

  
    const onSubmit = async (event) => {
      event.preventDefault();

      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  
      const fetchData = await api.post.addPost({
        id: idSession, 
        name: nameSession,
        description: postDescription,
        tags: tags,
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
        window.location.reload()
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
            <b>Tus datos</b>
            <ul>
              <li>Email: {contactInfo?.email}</li>
              <li>Telefono: {contactInfo?.phone}</li>
              <li>Direccion: {contactInfo?.address}</li>
            </ul>
            <input type="text" onChange={handleData} value={postDescription} placeholder='Doggo time...'/>
            <input type="text" onChange={handleTags} value={tags} placeholder='Ingrese sus tags separados por coma (,)'/>
            <input type="file" onChange={handleFile} />
            <button type="submit">Upload Image</button>
        </form>
        </div>
    );
  };
  
  export default PostForm;
