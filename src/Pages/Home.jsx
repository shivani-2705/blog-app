import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { db, storage } from '../firebase';

const Home = () => {
  const[postList , setPostList] = useState([]);
  const[imageList, setImageList] = useState([]);
  const collectionRef = collection(db, "posts");
  const imageRef = ref(storage, "images/" );

  useEffect(()=> {
    const getPost= async() => {

      listAll(imageRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev , url]);
          });
        });
      });
      
      const data = await getDocs(collectionRef);
      setPostList(data.docs.map((doc) => (
        {...doc.data(), id: doc.id}
        )));

    }
    getPost();

    const deletePost = async(id) => {
      const postDoc = doc(db, "posts", id )
      await deleteDoc(postDoc); 
  
    }
  

  },[])

 

  return (
    <div className='homePage'>
      {postList.map((post) => {
        return <div className="post">
          <div className="postHeader">
            <div className="title">
            <h1>{post.title}</h1>
          </div>
          <div className="deletePost">
            <button onClick={() => {deletePost(post.id)}} >&#128465;</button>
          </div>
          </div>
          <div className="postTextContainer">
            <div className="image">
              {imageList.map((url) => {
                <img src={url} />
              })}
            </div>
            
          
            {post.post}
          </div>
          <h3>@{post.author.name}</h3>
        </div>
       
      })}

    </div>
  )
}

export default Home