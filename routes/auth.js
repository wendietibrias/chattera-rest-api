import express from 'express';
import {
    loginController,
    registerController,
    activationAccountController
} from '../controller/auth.js';

const router = express.Router();

router.post('/login'  , loginController);
router.post('/register',registerController);
router.post("/confirm/:code" , activationAccountController);

export default router;