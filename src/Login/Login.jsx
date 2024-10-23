import React, { useState } from 'react';
import "./Login.css"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';


const Login = () => {

    const [loginState, setLoginState] = useState(false);

  return (
    <div className="dialogBox ">
       <div className="loginBox">
        {loginState ? <SignUp setLoginState={setLoginState} /> : <SignIn setLoginState={setLoginState} />}
       </div>
       <ToastContainer position='bottom-center'/>
    </div>
  )
}

export default Login;
