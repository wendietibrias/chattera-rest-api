import userSchema from '../schemas/user.js';
import postSchema from '../schemas/post.js';
import fs from 'fs';

export const getUserProfile = async (req,res) => {
   const user = req.user;

   if(!user) {
     return res.status(401).json({
        message:"Unauthorized",
        statusCode:401,
        status:'error'
     });
   }

   try {
     const { id } = req.params;
     const findUser = await userSchema.findById(id.trim())
                                      .populate('following')
                                      .populate('follower')
                                      .exec();
                                      
     if(findUser) {
        return res.status(200).json({
            data:findUser,
            status:"success",
            statusCode:200
        });
     }

     return res.status(404).json({
        message:"Not found that user",
        statusCode:404,
        status:'error'
     });

   } catch(err) {
    return res.status(500).json({
        message:err.message,
        statusCode:500,
        status:'error'
     });
   }
}

 export const getUserPosts = async (req,res) => {
   const user = req.user;

   if(!user) {
     return res.status(401).json({
        message:"Unauthorized",
        statusCode:401,
        status:'error'
     });
   }

   try {
     const { id } = req.params;
     const findUserPosts = await postSchema.find({ user_id:id }).populate('user_id').populate('likes').limit(6).exec();

     if(findUserPosts) {
        return res.status(200).json({
            data:findUserPosts,
            status:"success",
            statusCode:200
        });
     }

     return res.status(404).json({
        message:"Not found that user",
        statusCode:404,
        status:'error'
     });

   } catch(err) {
    return res.status(500).json({
        message:err.message,
        statusCode:500,
        status:'error'
     });
   }
 }

 export const updateUserProfile = async (req,res) => {
    const user = req.user;

    if(!user) {
      return res.status(401).json({
         message:"Unauthorized",
         statusCode:401,
         status:'error'
      });
    }

    try {

      const {
        username,
        email,
        address,
        job
      } = req.body;

      const { id } = req.params;
      const findUser = await userSchema.findOne({ _id:id });
      
      findUser.username = username;
      findUser.email = email;
      findUser.address = address;
      findUser.job = job;

      const saved = await findUser.save();

      if(saved) {
         return res.status(200).json({
            message:"success update profile",
            status:'success',
            statusCode:200
         });
      }

    } catch(err) {
      return res.status(500).json({
         message:err.message,
         statusCode:500,
         status:'error'
      });
    }
 }

 export const updateUserAvatar = async (req,res) => {
   const user = req.user;

   if(!user) {
     return res.status(401).json({
        message:"Unauthorized",
        statusCode:401,
        status:'error'
     });
   }

   try {
      const file = req.file;
      const { id } = req.params;


      const findUser = await userSchema.findById(id.trim());

      if(findUser) {
         findUser.avatar = file.originalname;
         const saved = await findUser.save();

         if(saved) {
            return res.status(200).json({
               message:"update profile",
               status:'success',
               statusCode:200
            });
         }
      }

   } catch(err) {
      return res.status(500).json({
         message:err.message,
         statusCode:500,
         status:'error'
      });
   }
 }