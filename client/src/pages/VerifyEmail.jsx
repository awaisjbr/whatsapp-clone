import React, { useState } from "react";
import { FaForumbee } from "react-icons/fa6";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [verificationOTP, setVerificationOTP] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try {
            const {data} = await axios.post('http://localhost:4000/api/auth/verifyEmail', {verificationOTP});
            if(data.success){
                toast.success(data.message);
                navigate("/login")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }

    if(loading){
        return <div>Loading...</div>
    }

  return (
    <div className='bg-[url("./assets/login.jpg")] bg-center bg-cover w-screen h-screen relative flex items-center justify-center'>
      <div className="bg-white/30 backdrop-blur-sm max-w-[360px] w-full h-[50%] flex items-center flex-col py-5 justify-evenly">
        <h1 className="flex items-center gap-3 text-xl font-semibold">
          <FaForumbee />
          Chatto
        </h1>
        
        <form className="flex flex-col gap-5" onSubmit={handleVerifyEmail}>
          <InputOTP maxLength={6} value={verificationOTP} onChange={(value) => setVerificationOTP(value)}>
            <InputOTPGroup >
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <button type="submit" className="text-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md cursor-pointer font-semibold">Verify Email</button>
        </form>

      </div>
    </div>
  );
};

export default VerifyEmail;
