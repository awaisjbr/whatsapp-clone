import React, { useState } from "react";
import "../Login/Login.css";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import {  doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const SignIn = ({setLoginState}) => {

    const navigateTo = useNavigate(null);
    const [userCred, setUserCred] = useState({
        name: "",
        email : "",
        password : "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserCred(prev => ({...prev, [name]:value}))
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, userCred.email, userCred.password);
            await updateDoc(doc(db,"users",auth.currentUser.uid),{
              isLogin:true,
            });
            navigateTo("/home");
            alert("Successfully Signed-in")

        }catch(error){
          alert(error.message)
        }
    };

    const googleSignIn = async () => {
      await signInWithPopup(auth,provider);
      await setDoc(doc(db,"users",auth.currentUser.uid),{
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        isLogin: true,
        createdAt: serverTimestamp(),
        dpImage: auth.currentUser.photoURL,
      });
      alert("Successfully Signed-in")
      navigateTo("/home")
    };

  return (
    <div className="sign_in">
      <h3>Sign-in</h3>
      <form onSubmit={handleSignIn}>
        <div className="inputBox">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="inputBox">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="inputBox">
          <input type="submit" value="Login" />
        </div>
      </form>
      <div className="signin-google">
        <button onClick={googleSignIn}>Sign-in-with-google</button>
      </div>
      <div className="login-link">
        <p>
          Don'y have an account:{" "}
          <a onClick={() => setLoginState(true)}>Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
