import { userModel } from "../models/user.model.js";
import { messageModel } from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";


export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const {loginId:myId} = req.body;

        const messages = await messageModel.find({
            $or: [
                {senderId: myId, receiverId:userToChatId},
                {senderId: userToChatId, receiverId:myId},
            ]
        });
        res.status(200).json({success: true, messages})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const {loginId:myId} = req.body;

        let imgUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imgUrl = uploadResponse.secure_url;
            console.log(uploadResponse)
        }
        const newMessage = new messageModel({receiverId, senderId:myId, text, image:imgUrl});
        await newMessage.save();

        res.status(201).json({success: true, newMessage})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}