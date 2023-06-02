import postSchema from "../schemas/post.js";
import userSchema from "../schemas/user.js";
import likeSchema from '../schemas/like.js';
import commentSchema from '../schemas/comment.js';
import fs from "fs";

export const allPostController = async (req,res) => {
    const { count } = req.query;
    try {
        const allPost = await postSchema.find()
                                        .sort({ createdAt:-1 })
                                        .populate('user_id')
                                        .populate('likes')
                                        .limit(Number(count)).exec();
        
        const allPostWithoutSkip = await postSchema.find();        

        if(allPost.length > 0) {
            return res.status(200).json({
                data:allPost,
                status:'success',
                statusCode:200,
                totalData:allPostWithoutSkip.length
            });
        }

        return res.status(200).json({
            data:allPost, 
            status:'success',
            statusCode:200
        });
        
    } catch(err) {
        return res.status(500).json({
            message:err.message,
            status:'error',
            statusCode:500
        });
    }
}


export const postController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
           message:"Unauthorized",
           statusCode:401,
           status:"error"
        });
    }

    try {
        const { postId } = req.params;
        const findPost = await postSchema.findById(postId)
                                         .populate('user_id')
                                         .populate('likes')
                                         .exec();

        if(findPost) {
            return res.status(200).json({
                data:findPost,
                status:'success',
                statusCode:200
            });
        }


    } catch(err) {
        return res.status(500).json({
            message:err.message,
            status:'error',
            statusCode:500
        });
    }
}

export const createPostController = async (req,res) => {
    
    const user = req.user;

    if(!user) {
        return res.status(401).json({
           message:"Unauthorized",
           statusCode:401,
           status:"error"
        });
    }
    
    try {
       const {
          caption,
          user_id
       } = req.body;

       const file = req.file;

        const initPost = new postSchema({
            user_id:user_id,
            caption,
            image:file.originalname
        });

        const saved = initPost.save();

        if(saved) {
            return res.status(200).json({
               message:"success upload files",
               status:"success",
               statusCode:200
            });
        }

   } catch(err) {
    return res.status(500).json({
        message:err.message,
        status:'error',
        statusCode:500
    });
   }
}

export const deletePostController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            message:"Unauthorized",
            status:"error",
            statusCode:401
        });
    }
   
    try {
        const { id } = req.params;
        const findPost = await postSchema.findOne({ _id:id });

        const path = `assets/uploads/${findPost.image}`;

        fs.unlink(path, async function(err) {
            if(err) {
                return res.status(500).json({
                    message:err,
                    status:'error',
                    statusCode:500
                });
            }

            const deleteUser = await postSchema.deleteOne({ _id:id });
            const deleteAllLike = await likeSchema.deleteMany({ post_id:id });
            const deleteAllComment = await commentSchema.deleteMany({ post_id:id });

            if(deleteUser && deleteAllLike) {
                return res.status(200).json({
                    message:"success delete user",
                    status:'success',
                    statusCode:200
                });
            }
        });

    } catch(err) {
       return res.status(500).json({
          message:err.message,
          status:'error',
          statusCode:500
      });
    }
}

export const updatePostController = async (req,res) => {
     const user = req.user;

     if(!user) {
        return res.status(401).json({
            message:"Unauthorized",
            status:'error',
            statusCode:401
        });
     }

     try {

        const { id } = req.params;
        const {
            title,
            caption
        } = req.body;

        const file = req.file;

        const findPost = await postSchema.findOne({ _id:id });

        findPost.caption = caption;
        findPost.image = file ? file.originalname : findPost.image;
 
        const saved = await findPost.save();

        if(saved) {
            return res.status(200).json({
                message:'success update post',
                status:'success',
                statusCode:200
            });
        }

     } catch(err) {
        return res.status(500).json({
            message:err.message,
            status:'error',
            statusCode:500
        });
     }
}

