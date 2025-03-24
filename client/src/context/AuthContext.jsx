import { toast } from "react-toastify";
import { axiosInstance } from "../components/AxiosInstance";
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
    // const [authUser, setAuthUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false)
    const [chatUsers, setChatUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(false);
    const [userChat, setUserChat] = useState([]);

    const getUserData = async () => {
        try {
            const res = await axiosInstance.get("/auth/userData");
            if(res.data.success){
                setUserData(res.data.user);
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    const getAllUsers = async () => {
        try {
            const res = await axiosInstance.get("/auth/users");
            if(res.data.success){
            setChatUsers(res.data.users)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
      };

    const checkAuthSatate = async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            if(res.data.success){
                setIsLoggedIn(true);
                getUserData();
                getAllUsers();
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    useEffect(() => {
        const getUsersChat = async () => {
            const res = await axiosInstance.get(`/message/${selectedUser._id}`);
            if(res.data.success){
                setUserChat(res.data.messages)
            }
        };
        if(selectedUser){
            getUsersChat();
        }
    },[selectedUser])

    useEffect(() => {
        checkAuthSatate();
    },[]);


    const value = {isLoggedIn, setIsLoggedIn, chatUsers, setChatUsers, userChat,
                    userData, setUserData, getUserData, getAllUsers, selectedUser, setSelectedUser};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}