import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const createPost = ({isAuth}) => {

  const [title,setTitle] = useState(" ");
  const [post, setPost] = useState(" ");
  const[image ,setImage ] = useState(null);
 

  const collectionRef = collection(db, "posts");
  const navigate = useNavigate();

  const createPost = async() => {
    
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then(() => {
      console.log("uploaded")
    })


    await addDoc(collectionRef, {title,
      
       post,
        author: {name:auth.currentUser.displayName, id: auth.currentUser.uid}
      });
      navigate('/');

  };

  useEffect(() => {
    if(!isAuth){
      navigate("/login");
    }
  }, []);


  return (
    <div className='createPost'>
      <div className="CPcontainer">
        <h1>Create Post</h1> 
          <div className="input">
          <label >Title:</label>
          <input  type="text" placeholder='Title..' onChange={(e) => {setTitle(e.target.value)}} />
           <label htmlFor="">Image:</label>
          <input type="file" className='postImage' onChange={(e) => {setImage(e.target.files[0])}} /> 
          </div>
          
          <div className="input">
          <label >Post Text : </label>
          <textarea  placeholder='post...'  onChange={(e) => {setPost(e.target.value)}}  />
          </div>
          <button onClick={createPost}>Submit Post</button>

        
      </div>
    </div>
  )
}

export default createPost