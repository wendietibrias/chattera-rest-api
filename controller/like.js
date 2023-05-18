import likeSchema from '../schemas/like.js';
import postSchema from '../schemas/post.js';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const likePostController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            message:'Unauthorized',
            status:'error',
            statusCode:401
        });
    }

    try {
     const findPost = await postSchema.findById(req.params.id.trim());

      if(findPost) {
           const initLike = new likeSchema({
               user_id:user._id,
               post_id:findPost._id
           });

           const saved = await initLike.save();

           findPost.likes.push({
               _id:saved._id
           });
           const postSave = await findPost.save();

           if(saved && postSave) {
            return res.status(200).json({
               message:"liked",
               status:'success',
               statusCode:200
            });
           }
      }

    } catch(err) {
        return res.status(500).json({
            message:err.message,
            status:'error',
            statusCode:500
        });
    }
}


export const unlikePostController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            message:'Unauthorized',
            status:'error',
            statusCode:401
        });
    }

    try {
      const id = req.params.id;
       
      const findLike = await likeSchema.findById(id.trim());

      if(findLike) {
         
          const deleteLike = await likeSchema.deleteOne({ _id:id });

          if(deleteLike) {
              return res.status(200).json({
                  message:"Unlike",
                  status:"success",
                  statusCode:200
              });
          }

      }

    } catch(err) {
        return res.status(500).json({
            message:err.message,
            status:'error',
            statusCode:500
        });
    }
}