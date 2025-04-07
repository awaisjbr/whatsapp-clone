import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaPlus, FaUser } from "react-icons/fa6";
import { PiMicrophoneFill } from "react-icons/pi";
import { FaRegFaceLaugh } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useChatContext } from '../context/ChatContext';
import MessagesLoadingSkeleton from './skeletons/MessagesLoadingSkeleton';
import { formateMessageTime } from '../lib/utils';
import toast from 'react-hot-toast';

const ChatContainer = () => {
    const [text, setText] = useState("");
    const {selectedUser, messages, getMessages, messagesLoading, sendMessage} = useChatContext();

    useEffect(() => {
        getMessages(selectedUser._id)
    },[selectedUser._id, getMessages]);

    const sendMessages = async (e) => {
      e.preventDefault();
      try {
        await sendMessage({text});
        setText("")
      } catch (error) {
        toast.error("Failed to send message")
      }
    }

    if(messagesLoading) return <MessagesLoadingSkeleton />

  return (
    <>
      <div className='bg-[#f0f2f5] h-20 flex items-center px-5 justify-between'>
        <div className='flex items-center gap-3'>
            <img src={selectedUser?.profilePic} alt="" className='w-16 h-16 rounded-full cursor-pointer' />
            <p className='text-md font-semibold select-none'>{selectedUser?.userName}</p>
        </div>
        <div className='flex items-center gap-7 text-xl'>
            <div className='hover:bg-[rgb(217,219,223)] p-2 rounded-full cursor-pointer'><IoSearch /></div>
            <div className='hover:bg-[rgb(217,219,223)] p-2 rounded-full cursor-pointer'><BsThreeDotsVertical /></div>
        </div>
      </div>

    {/* Messeges Area */}
    <div className='bg-[url("./assets/chat-area.jpg")] flex-1 bg-cover bg-center overflow-hidden'>
      <div className='flex flex-col gap-3 overflow-y-auto h-full mx-2 my-1'>
        {messages.map((message, index) => {
          return (
            <div key={index} className={`px-3 py-1 rounded-md max-w-md shadow-md w-fit flex items-center gap-3 cursor-pointer ${message?.senderId === selectedUser?._id ? "self-start bg-white " : "self-end bg-[#d9fcd3]"}`}>
                <div className={`w-14 h-14 rounded-full bg-[rgb(223,229,231)] text-white flex items-end justify-center text-4xl overflow-hidden ${message?.senderId === selectedUser?._id ? "hidden" : ""}`}><FaUser className='' /></div>
                <p className='flex flex-col'>{message?.text} <time className='self-end'>{formateMessageTime(message?.createdAt)}</time></p>
                <div className={`w-14 h-14 rounded-full bg-[rgb(223,229,231)] text-white flex items-end justify-center text-4xl overflow-hidden ${message?.senderId === selectedUser?._id ? "" : "hidden"}`}><FaUser className='' /></div>
            </div>
          )
        })}
      </div>
    </div>
     
    {/* Inputs */}
    <div className='bg-[#f0f2f5] h-14 flex items-center px-5 gap-5'>
      <div className='text-[rgb(59,74,84)] text-2xl cursor-pointer'><FaPlus /></div>
      <div className='flex items-center gap-3 py-2 rounded-lg px-5 flex-1 bg-white'><FaRegFaceLaugh className='text-[rgb(59,74,84)] text-2xl cursor-pointer' /><input className='outline-none w-full' value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='Type a message' /></div>
      <div className='text-[rgb(59,74,84)] text-2xl cursor-pointer' onClick={sendMessages}><IoIosSend /></div>
      <div className='text-[rgb(59,74,84)] text-2xl cursor-pointer'><PiMicrophoneFill /></div>
    </div></>
  )
}

export default ChatContainer
