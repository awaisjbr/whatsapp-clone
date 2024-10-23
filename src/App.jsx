import React from 'react';
import { useContext } from 'react'
import {Routes, Route} from "react-router-dom"
import Login from './Login/Login';
import { AuthContext } from './Context/Auth';
import Home from './pages/Home';

function App() {
  
  const currentUser = useContext(AuthContext);
  // console.log(currentUser)

  const ProtectedRoute = ({children}) => {
    return currentUser ? children : <Login />
  }
  
  
  return (
    <>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      {/* <Route path='/home' element={<Home />} /> */}
     </Routes>
    </>
  )
}

export default App
