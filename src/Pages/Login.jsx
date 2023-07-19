import React from 'react'
import {auth,provider} from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({setIsAuth}) => {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth,provider).then((response) => {
            localStorage.setItem("isAuth",true);
            setIsAuth(true)
            navigate("/")

        })

    };



  return (
    <div className='Login  loginContainer'>
      <div className="container">
        <h3>Sign In with Google to Continue</h3>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    </div>
  )
}

export default Login