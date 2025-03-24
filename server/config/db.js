import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/chat-app`);
        console.log(`DB Connected.. on ${connection.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection error", error.message)
        process.exit(1)
    }    
}