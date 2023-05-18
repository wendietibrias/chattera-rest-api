import express from 'express';
import {
    postCommentController,
    deleteCommentController,
    createCommentController
} from "../controller/comment.js";
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/all/:id" , verifyToken , postCommentController);
router.post("/create" ,verifyToken , createCommentController);
router.delete("/delete/:id"  ,verifyToken , deleteCommentController);

export default router;