import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message" 
    }],
},{timestamps: true});

export const ConversationModel = mongoose.model("Conversation", ConversationSchema);