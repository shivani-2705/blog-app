import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Post from './Pages/createPost'
import { signOut } from 'firebase/auth';
import { auth } from './firebase';



function App() {
  const [isAuth, setIsAuth] = useState(false);


 
  const  signUserOut =() => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login";
      
    })
   
  }
  
  

  return (
    <div className='App'>
  
    <BrowserRouter>
    <nav >
      <Link to="/">Home</Link>
      

      {!isAuth ? 
      (<Link to="/login">Login</Link>
      ) : (
        <>
         <Link to="/post">Create</Link>
         <button className='SignOutBtn' onClick={signUserOut}>Log Out</button>
         </>
         )}
    </nav>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/post' element={<Post  isAuth={isAuth}  />}/>
      <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>

    </Routes>
    </BrowserRouter>
      
    </div>
  )
}

export default App
