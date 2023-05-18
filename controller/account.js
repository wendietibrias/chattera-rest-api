import userSchema from '../schemas/user.js';
import handleError from "../helper/handleError.js"

export const getAllUser = async (req,res) => {
   try {
     const allUser = await userSchema.find();
     return res.status(200).json(allUser);
   } catch(err) {
       handleError(err,res)
   }
}

export const deleteAccount = async (req,res) => {
    try {
        const { id } = req.params;

        const deleteUser = await userSchema.findByIdAndDelete(id.trim());

        if(deleteUser) {
            return res.status(200).json(deleteUser);
        }

    } catch(err) {
        handleError(err,res);
    }
}

export const updateAccount = async (req,res) => {
     const id = req.params.id.trim();

     const findUser = await userSchema.findOne({ _id:id });

     findUser.follower = [];
     findUser.following = [];


     await findUser.save();
    
     return res.status(200).json({ ok:1 });
}