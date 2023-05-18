import express from 'express';
import verifyToken from "../middleware/verifyToken.js";
import {
    followController,
    unfollowController
} from "../controller/follow.js";

const router = express.Router();

router.post('/follow/:id' , verifyToken , followController);  
router.post('/unfollow/:id' , verifyToken , unfollowController);

export default router;