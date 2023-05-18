import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connection from './database/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';

import profileRoutes from './routes/profile.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import likeRoutes from './routes/like.js';
import commentRoutes from './routes/comment.js';
import accountRoutes from './routes/account.js';
import followRoutes from "./routes/follow.js";

//setup env 

dotenv.config({debug:true});

//setup app for express function

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setup cors

app.use(cors({
    origin:"*",
    methods:['GET', 'POST','DELETE','PATCH', 'PUT'],
    allowedHeaders:"*"
}));

//setup express module

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('assets/uploads'));
app.use('/profiles' , express.static('assets/profiles'));

//setup router

app.use('/api/auth' , authRoutes);
app.use("/api/post" , postRoutes);
app.use('/api/likes'  , likeRoutes);
app.use('/api/comment' , commentRoutes);
app.use("/api/profile" , profileRoutes);
app.use("/api/account" , accountRoutes);
app.use("/api/follows" , followRoutes);

//run server

const port = Number(process.env.PORT);


mongoose.connection.on('error' , function(err) {
    if(err) {
        console.log(err);
    }
});


connection(app,port);