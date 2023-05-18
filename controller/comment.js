import commentSchema from '../schemas/comment.js';

export const postCommentController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
           message:"Unauthorized",
           status:'error',
           statusCode:401
        });
    }
 
    try {
        const allComment = await commentSchema.find({ post_id:req.params.id.trim() }).populate('user').exec();

        if(allComment) {
            return res.status(200).json({
                data: allComment,
                status:'success',
                statusCode:200
            });
        }

        return res.status(200).json({
            data: [],
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

export const createCommentController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
           message:"Unauthorized",
           status:'error',
           statusCode:401
        });
    }

    try {
        const {
            comment,
            user_id,
            post_id
        } = req.body;

        const initComment = new commentSchema({
             user:user_id,
             comment,
             post_id
        });

        const savedComment = await initComment.save();

        if(savedComment) {
            return res.status(200).json({
                message:"comment!",
                status:200,
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
};

export const deleteCommentController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
           message:"Unauthorized",
           status:'error',
           statusCode:401
        });
    }

    try {

        const findComment = await commentSchema.findByIdAndDelete(req.params.id.trim());

        if(findComment) {
            return res.status(200).json({
                message:"deleted comment!",
                status:200,
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
};