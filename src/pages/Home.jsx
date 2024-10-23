import React, {  useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Auth';
import { auth, db } from '../Firebase/Firebase';
import img from "../assets/image.png"
import { signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import ChatList from '../components/ChatList/ChatList';
import ChatBox from '../components/ChatBox/ChatBox';


const Home = () => {
  
  const [userList, setUserList] = useState([]);
  const [showUserChat, setShowUserChat] = useState(true);
  const [comboID, setComboID] = useState(null);
  const [user, setUser] = useState(null);

  const currentUser = useContext(AuthContext);
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (snapShot) => {
      const list = [];
      snapShot.forEach((docs) => {
        list.push(docs.data());
      });
      setUserList(list);
    })

    return () => unsub();
  },[]);


  const logout = async () => {
    const updateRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(updateRef,{
      isLogin: false,
    });
    await signOut(auth);
    alert("Successfully Sign Out..")
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db,"users", id))
  }

  
  return (
    <div className='container'>
     <ChatList setShowUserChat={setShowUserChat} showUserChat={showUserChat} logout={logout} userList={userList} setUserList={setUserList} setComboID={setComboID} setUser={setUser} comboID={comboID}/>
     <ChatBox showUserChat={showUserChat} comboID={comboID} user={user} />
    </div>
  )
}

export default Home










{/*<hr className='bg-indigo-500 h-0.5 w-1/2 mx-auto mb-3' />
<table className='table-auto border-collapse border border-slate-400 mx-auto'>
  <thead>
    <tr>
      <th className='border border-slate-300 p-2'>Sr.</th>
      <th className='border border-slate-300 p-2'>DP</th>
      <th className='border border-slate-300 p-2'>Name</th>
      <th className='border border-slate-300 p-2'>Email</th>
      <th className='border border-slate-300 p-2'>ID</th>
      <th className='border border-slate-300 p-2'>Status</th>
      <th className='border border-slate-300 p-2'>Delete</th>
    </tr>
  </thead>

  <tbody>
      {userList.map((user,i) => {
        return <tr key={i}>
          <td className='border border-slate-300 p-2 text-center'>{i+1}.</td>
          <td className='border border-slate-300 p-2 text-center'><img className='w-12 rounded-full h-12' src={user.dpImage} alt="" /></td>
          <td className='border border-slate-300 p-2 text-center'>{user.displayName}</td>
          <td className='border border-slate-300 p-2 text-center'>{user.email}</td>
          <td className='border border-slate-300 p-2 text-center'>{user.id}</td>
          <td className='border border-slate-300 p-2 text-center'><span className={user.isLogin ? "text-white bg-green-500 p-1 rounded-md cursor-pointer" : "text-white bg-red-500 cursor-pointer p-1 rounded-md"}>{user.isLogin ? "Online" : "Offline"}</span></td>
          <td className='border border-slate-300 p-2 text-center'><button className=' p-2 rounded-md bg-orange-300 text-white active:bg-orange-500' onClick={() => deleteUser(user.id)}>Delete</button></td>
        </tr>
      })}
  </tbody>
</table>*/}

