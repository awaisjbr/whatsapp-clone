import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import {Server} from "socket.io"
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/auth.route.js";
import {router as messageRouter} from "./routes/message.route.js"

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors:{
        origin: ['http://localhost:3000'],
        methods: ["GET","POST"]
    },
})

const onlineUsers = {};
export function getReceiverSocketId(userId){
    return onlineUsers[userId]
}
io.on("connection", (socket) => {
    console.log("A User coneected", socket.id);
   const userId = socket.handshake.query.userId;
    if(userId){
        onlineUsers[userId]= socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    socket.on("disconnect", () => {
        console.log("A User Disconnected", socket.id)
        delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
    })
})

//Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials:true}));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);


connectDB()
.then(() => {
    server.listen(port, () => {
        console.log(`server is listening on port : ${port}`)
    })
}).catch((error) => console.log(error.message))