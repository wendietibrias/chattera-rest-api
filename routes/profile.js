import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {
    getUserProfile,
    getUserPosts,
    updateUserProfile,
    updateUserAvatar
} from "../controller/profile.js";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/profiles')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage:storage });

const router = express.Router();

router.get("/user/:id",verifyToken , getUserProfile);
router.get("/user/post/:id" , verifyToken , getUserPosts);
router.put("/update/:id" , verifyToken ,updateUserProfile);
router.post("/update/avatar/:id" , verifyToken, upload.single('image') , updateUserAvatar);

export default router;