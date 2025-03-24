import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formateMessageTime } from '../lib/utils';
import SideMenubar from '../components/SideMenubar';
import SideUsersList from '../components/SideUsersList';
import ChatBox from '../components/ChatBox';
import { axiosInstance } from '../components/AxiosInstance';

const Home = () => {
    const { userData } = useContext(AuthContext);

  return (
    <div className='bg-white absolute top-7 bottom-7 right-8 left-7 z-50 '>
      <div className='w-full h-full flex'>
        <SideMenubar />
        <SideUsersList userData={userData}/>
        <ChatBox />
      </div>      
    </div>
  )
}

export default Home
