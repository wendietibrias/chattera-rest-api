import express from 'express';
import {
    getAllUser ,
    deleteAccount,
    updateAccount
} from "../controller/account.js";

const router = express.Router();

router.get('/all', getAllUser);
router.delete(`/delete/:id` , deleteAccount);
router.patch(`/update/:id` , updateAccount);

export default router;