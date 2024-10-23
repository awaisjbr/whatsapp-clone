import React, { useState } from 'react';
import "./ChatBox.css";
import img from "../../assets/image.png";
import EmojiPicker from 'emoji-picker-react';
import pic1 from "../../assets/Pic-1.png";
import sendBtn from "../../assets/send.png"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../Firebase/Firebase';
import ChatMessages from "../ChatMessages/ChatMessages";

const ChatBox = ({showUserChat, comboID, user}) => {

  const [openEmoji, setOpenEmoji] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleEmoji = (e) => {
    setInputText(prev => prev + e.emoji);
    setOpenEmoji(false)
  }

   const submitMessage = async () => {
    await addDoc(collection(db, "userChats", comboID,"chats"),{
      messages:inputText,
      from: auth.currentUser.displayName,
      to: user.displayName,
      messageTime : serverTimestamp(),
    })
    setInputText("");

  };

  // const fetchChat = async () => {
  //   const msgsRef = await collection(db, "userChats", comboID, "chats");
  //   const q = await query(msgsRef, orderBy("messageTime","asc"));
  //   onSnapshot(q, (querySnapshot) => {
  //     let msgs = [];
  //     querySnapshot.forEach((doc) => {
  //       msgs.push(doc.data());
  //     });
  //     setMessages(msgs);
  //   });
  // }


  return (
    <div className='chat-box'>
      {showUserChat ? 
       <div className='chat-box flex items-center justify-center flex-col gap-6'>
       <img className='w-[300px]' src={pic1} alt="" />
       <h2 className='font-light text-3xl text-slate-500'>Download WhatsApp for Windows</h2>
       <p className='text-center text-sm font-normal text-slate-500'>Maks calls, share your screen and get a faster experience when you download the <br />Windows app.</p>
       <button className='btn-1 text-white py-3 px-5 font-semibold rounded-3xl'>Get from Microsoft Store</button>
     </div>:
     <div className='chat-box'>
      <div className="chatbox-top h-[60px] bg-slate-200 flex items-center justify-between px-5">
        <div className="userBox-user-info flex items-center">
            <img className='h-11 w-11 rounded-full mr-5 cursor-pointer' src={user.dpImage || img} alt="" />
           <span>{user.displayName}</span>
        </div>
        <div className="chatBox-top-icons flex gap-6 items-center text-slate-500 relative">
          <span className='border border-slate-300 px-3 cursor-pointer py-[5px] rounded-2xl flex items-center gap-2'><i className="fa-solid fa-video text-lg"></i><i className="fa-solid fa-chevron-down text-[12px]"></i></span>
          <span><i className="fa-solid fa-magnifying-glass cursor-pointer"></i></span>
          <span><i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i></span>
        </div>
      </div>

      <div className="chat-area">
        <ChatMessages user={user} comboID={comboID} inputText={inputText}/>
      </div>

      <div className="chat-bottom h-[55px] absolute bottom-0 bg-slate-200 w-[66.7%] flex items-center gap-5 px-6">
          <div className='relative'><span className='absolute bottom-10 ri0'><EmojiPicker open={openEmoji} onEmojiClick={handleEmoji}/></span><i className="fa-regular fa-face-smile cursor-pointer text-slate-500 text-xl" onClick={() => setOpenEmoji(!openEmoji)}></i></div>
          <span><i className="fa-solid fa-plus cursor-pointer text-slate-500 text-xl"></i></span>
          <input className='w-[750px] bg-white rounded-md h-9 px-2' type="text" value={inputText} placeholder='Type a message' onChange={(e) => {setInputText(e.target.value)}}/>
          <span><i className="fa-solid fa-microphone cursor-pointer text-slate-500 text-xl"></i></span>
          <img width={25} className='cursor-pointer active:bg-slate-300' src={sendBtn} alt="" onClick={submitMessage}/>
      </div>
    </div>
     }
    </div>
    
   
    
  )
}

export default ChatBox
