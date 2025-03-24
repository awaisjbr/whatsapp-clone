import React, { lazy, Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotResetPassword = lazy(() => import("./pages/ForgotResetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const App = () => {
  
  const { isLoggedIn } = useContext(AuthContext);  

  const ProtectedRoute =  ({children}) => {
    return  isLoggedIn ? children : <Navigate to="/login" />;
  }
  const ProtectedRoute2 =  ({children}) => {
    return  !isLoggedIn ?  children : <Navigate to="/" />;
  }

 
  return (
    <>
      <ToastContainer theme="dark" />
      <Suspense fallback={"Loading..."}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute2><Login /></ProtectedRoute2>} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-reset-password" element={<ForgotResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
