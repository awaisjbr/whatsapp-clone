import React, { Fragment, useEffect, useRef, useState } from 'react'
import { auth, db } from '../../Firebase/Firebase';
import "../ChatMessages/ChatMessages.css"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import moment from 'moment';

const ChatMessages = ({user,comboID, inputText}) => {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);


    useEffect(() => {
    const mesgRef = collection(db, "userChats", comboID, "chats");
    const q = query(mesgRef, orderBy("messageTime","asc"));
    const unsub = onSnapshot(q, (snapShot) => {
      let msgs = []; 
      snapShot.forEach((item) => {
        msgs.push({...item.data(), id: item.id})
      })
      setMessages(msgs);
    });
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
    return () => unsub();
  },[user,inputText]);

  return (
    <>
    {messages.map((msg,i) => {
        return <Fragment key={i}>
         <div className={`message flex items-center ${msg.from === auth.currentUser?.displayName ? "own" : ""}`} ref={scrollRef} >
          <p className='text-sm'>{msg.messages}</p>
          <span className='text-[11px] ml-2 mt-4'>{moment.unix(msg?.messageTime?.seconds).local().fromNow()}</span>
         </div>
        </Fragment>
    })}
          
    </>
  )
}

export default ChatMessages;