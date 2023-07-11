import express from 'express';
import mongoose from 'mongoose';
import {config} from 'dotenv';
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';
import cors from 'cors'

config({
    path:"./data/config.env",
});

const app= express();

app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);


mongoose.connect(process.env.MONGO_URL).then(()=>app.listen(process.env.PORT))
.then(()=>console.log(`connected to the database and port ${process.env.PORT}`))
.catch((err)=>console.log(err));

