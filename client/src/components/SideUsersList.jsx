import React, { useContext, useEffect } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import awaisimg from "../assets/chat-bg.jpg"
import { AuthContext } from '../context/AuthContext';
import { axiosInstance } from './AxiosInstance';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';


const SideUsersList = () => {
  const {userData, chatUsers, setIsLoggedIn, setSelectedUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const result = confirm("Are you sure to logout")
      if(result){
        const res = await axiosInstance.post("/auth/logout");
        toast.success(res.data.message);
        setIsLoggedIn(false);
        navigate("/login")
      }else{
        return
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === "Escape"){
        setSelectedUser(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown)
  })

  return (
    <div className='w-[450px] border border-gray-300 overflow-hidden flex flex-col'>
      <div className='p-5 flex items-center justify-between'>
        <p className='font-bold text-2xl'>Chats</p>
        <div className='flex items-center gap-5'>
            <div className='text-2xl bg-[rgb(217,219,223)] rounded-full h-10 w-10 flex items-center justify-center cursor-pointer font-semibold text-[rgb(84,101,111)]'>{(userData.userName).slice(0,1).toUpperCase()}</div>
            <div className='text-2xl cursor-pointer font-semibold text-[rgb(84,101,111)]' onClick={handleSignOut}><MdLogout /></div>
            <div className='text-2xl cursor-pointer font-semibold text-[rgb(84,101,111)]'><BsThreeDotsVertical /></div>
        </div>
      </div>
      {/* SearchBar */}
      <div className='bg-[#f0f2f5] flex items-center mx-3 py-1 rounded-md px-3 gap-7'>
        <div className='text-[rgb(93,109,119)] text-xl'><IoSearch /></div>
        <div className='flex-1'><input type="text" className='bg-transparent flex-1 w-full text-[rgb(93,109,119)] outline-none placeholder:text-lg text-lg' placeholder='Search' /></div>
      </div>

      {/* Chat Selection */}
      <div className='flex items-center gap-3 my-2 ml-3'>
        <div className='bg-[rgb(231,252,227)] rounded-2xl flex items-center justify-center cursor-pointer text-[rgb(93,109,119)] py-1 px-2'>All</div>
        <div className='bg-[rgb(240,242,245)] rounded-2xl flex items-center justify-center cursor-pointer text-[rgb(93,109,119)] py-1 px-2'>Unread</div>
        <div className='bg-[rgb(240,242,245)] rounded-2xl flex items-center justify-center cursor-pointer text-[rgb(93,109,119)] py-1 px-2'>Favorites</div>
        <div className='bg-[rgb(240,242,245)] rounded-2xl flex items-center justify-center cursor-pointer text-[rgb(93,109,119)] py-1 px-2'>Groups</div>
      </div>

      {/* chat users box */}
      <div className='flex flex-col overflow-y-auto flex-1 w-full'>
      {chatUsers.map((user, index) => {
          return (
            <div key={index} className='flex flex-col justify-center cursor-pointer px-2 hover:bg-[#f0f2f5]' onClick={() => setSelectedUser(user)}>
              <hr className='w-[85%] self-end' />
              <div className='flex items-center gap-3 py-2'>
                  <div className='w-14 h-14 rounded-full bg-[rgb(223,229,231)] text-white flex items-end justify-center text-4xl overflow-hidden'><FaUser className='' /></div>
                  <div className='flex-1 flex flex-col'>
                      <p className='text-[rgb(17,27,33)] text-lg font-semibold'>{user.userName}</p>
                      <p className='text-sm text-[rgb(93,109,119)]'>Last Message</p>
                  </div>
                  <div className='text-sm text-[rgb(93,109,119)]'><time>4:30 am</time></div>
              </div>
            </div>
            )
        })}        
      </div>

    </div>
  )
}

export default SideUsersList
