import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import projectRoutes from "./routes/project.routes.js"
import userRoutes from "./routes/user.routes.js"
import conversationRoutes from "./routes/conversation.routes.js"
import cors from "cors";
import bodyParser from "body-parser";

// import { app, server } from "./socket/socket.js";


dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/user', userRoutes)
app.use('/projects', projectRoutes)
app.use('/conversations', conversationRoutes)

mongoose.connect(process.env.URI).then(
    app.listen(PORT, ()=>{
        console.log(`DB connected to port: ${PORT}`);
    })
).catch((err)=>{
    console.error(err)
})