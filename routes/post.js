import express from 'express';
import multer from 'multer';
import verifyToken from '../middleware/verifyToken.js';
import unlinkPath from '../middleware/unlinkPath.js';

import {
    createPostController,
    deletePostController,
    updatePostController,
    allPostController,
    postController
} from '../controller/post.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage:storage });

router.get('/all',verifyToken , allPostController);
router.get('/post/:postId' , verifyToken,postController);
router.post("/create" ,verifyToken , upload.single('image') , createPostController);
router.delete("/delete/:id" , verifyToken , deletePostController); 
router.post("/update/:id" , verifyToken ,upload.single('image') ,unlinkPath , updatePostController);

export default router;