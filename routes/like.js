import express from 'express';
import verifyToken from '../middleware/verifyToken.js';

import {
    likePostController,
    unlikePostController
} from '../controller/like.js';

const router = express.Router();

router.post('/like/:id' , verifyToken , likePostController);
router.delete('/unlike/:id' , verifyToken,unlikePostController);

export default router;