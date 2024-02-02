import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import commentRouter from "./routes/comment-routes";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user",router)  //http://localhost:5000/api/user/
app.use("/api/blog",blogRouter)
app.use("/api/comment",commentRouter)

mongoose.connect("mongodb+srv://komalgawai:9yGnjh0UXbo0MITw@cluster0.jworid4.mongodb.net/Blog?retryWrites=true&w=majority"
).then(()=>app.listen(5000)).then(()=>console.log("Connected to db & listening to 5000 port")).catch((err)=>console.log(err));