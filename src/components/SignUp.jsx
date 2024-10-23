import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../Firebase/Firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

const SignUp = ({setLoginState}) => {

  const [uploadImg, setUploadImg] = useState(null);
  const [imgURL, setImgURL] = useState("");
    const [userCred, setUserCred] = useState({
        name: "",
        email : "",
        password : "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserCred(prev => ({...prev, [name]:value}))
    };

    // const handleImageChange = async(e) => {
    //   const image = e.target.files[0];
    //   if(image){
    //       try{
    //         const storageRef = ref(storage,`userImages/${image.name}`);
    //         await uploadBytes(storageRef,image);
    //         const downloadURL = await getDownloadURL(storageRef);
    //         setImgURL(downloadURL);
    //       }catch(error){
    //         console.error(error)
    //       }
    //   }
    // }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, userCred.email, userCred.password);
            const storageRef = ref(storage, `userImages/${uploadImg.name}`);
            await uploadBytes(storageRef,uploadImg);
            const downloadURL = await getDownloadURL(storageRef);
            await setDoc(doc(db, "users", auth.currentUser?.uid), {
                displayName: userCred.name,
                email: userCred.email,
                createdAt: serverTimestamp(),
                isLogin: true,
                dpImage: downloadURL,
                id:auth.currentUser.uid
              });
              await updateProfile(auth.currentUser, {
                displayName: userCred.name,
                photoURL: downloadURL,
              });
              toast.success("User Created Successfully");
              <Navigate to={"/home"}/>
        }catch(error){
            toast.warn(error.message)
        }
    };
  return (
    <div className="sign_up">
        <h3>Sign-up</h3>
          <form onSubmit={handleSignUp}>
            <div className="inputBox">
              <input type="text" placeholder='Name' name='name' onChange={handleChange}/>
            </div>
            <div className="inputBox">
              <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
            </div>
            <div className="inputBox">
              <input type="password"  name='password' placeholder='Password' onChange={handleChange}/>
            </div>
            <div className="inputBox">
              <input type="file" onChange={(e) => {setUploadImg(e.target.files[0])}}/>
            </div>
            <div className="inputBox">
              <input type="submit" value='Sign-up' />
            </div>
          </form>
          <div className="login-link">
          <p>Already have an account: <a onClick={() => setLoginState(false)}>Login</a></p>
        </div>
    </div>
  )
}

export default SignUp;






