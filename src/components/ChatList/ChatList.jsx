import React, { useEffect, useState } from 'react';
import "./ChatList.css";
import { auth, db} from '../../Firebase/Firebase';


const ChatList = ({setShowUserChat, logout, userList, setComboID, setUser}) => {

   const users = userList.filter((name) => name.id !== auth.currentUser.uid);
   

   const handleSelect =  (user) => {
    const comboID = auth.currentUser?.uid > user.id ? auth.currentUser?.uid + user.id : user.id + auth.currentUser?.uid;
   
    setShowUserChat(false);
    setComboID(comboID);
    setUser(user)
   }; 

  

  return (
    <div className='chat-list overflow-hidden'>

      <div className="chatList-top flex items-center justify-between p-3">
        <div className="top-text">
            <h4 className='font-bold text-2xl'>Chats</h4>
        </div>
        <div className="top-icos flex items-center">
            <img className='h-11 w-11 rounded-full mr-5 cursor-pointer' src={auth.currentUser?.photoURL} alt="" />
            <span className='mr-5'><i className="fa-solid fa-square-plus cursor-pointer text-slate-500 text-xl"></i></span>
            <span className='mr-5'><i className="fa-solid fa-right-from-bracket cursor-pointer text-slate-500 text-xl active:text-slate-200" onClick={logout}></i></span>
        </div>
      </div>

      <div className="searchBar bg-slate-200 w-[95%] rounded-md py-1 mx-auto">
        <i className="fa-solid fa-magnifying-glass text-slate-500 ml-4"></i>
        <input className='searchInput bg-transparent w-90 ml-4 rounded-md pl-2 w-[80%] placeholder:text-slate-500' type="text" placeholder='Search'/>
      </div>
      <div className="userList px-4 overflow-y-scroll h-[605px]">
        {users.map((user,i) => {
         return(
            
             <div key={user.id}>
                 <div className="list-Item flex items-center justify-between my-3 cursor-pointer" onClick={() => handleSelect(user)}>
                 <div className='flex items-center gap-4'>
                 <img className='user-img h-12 w-12 relative rounded-full' src={user.dpImage} />
                 <div className="userText">
                  <h4 className='font-semibold'>{user.displayName}</h4>
                  <p className='text-sm'>Ok Message</p>
                </div>
                </div>
                <div className="textTime flex items-center flex-col">
                <p className='text-slate-500'>4:48 PM</p>
                <span className={user.isLogin ? "bg-green-500 p-1 rounded-full mt-1":"bg-red-500 p-1 rounded-full mt-1"}></span>
               </div>
               </div>
               <hr />
               </div>  
         )
        })}
      </div>
    </div>
  )
}

export default ChatList
