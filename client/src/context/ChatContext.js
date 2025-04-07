import { axiosInstance } from "../components/AxiosInstance";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useChatContext = create((set,get) => ({
    messages: [],
    chatUsers: [],
    selectedUser: null,
    loading: false,
    messagesLoading: false,
    setSelectedUser: (selectedUser) => set({selectedUser}),

    getUsers: async () => {
        set({loading: true})
        try {
            const {data} = await axiosInstance.get("auth/users");
            if(data.success){
                set({chatUsers: data.users, loading: false})
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            set({loading: false})
        }
    },

    getMessages: async (userId) => {
        set({messagesLoading: true});
        try {
            const {data} = await axiosInstance.get(`/message/${userId}`);
            if(data.success){
                set({messages: data.messages, messagesLoading: false})
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            set({messagesLoading: false});
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const {data} = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
            if(data.success){
                set({messages: [...messages, data.newMessage]})
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
}))