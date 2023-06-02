import postSchema from "../schemas/post.js";
import fs from "fs";

const unlinkPath =  async (req , res ,next)  => {
     const id = req.params.id;
     const file = req.file;



     if(!id) {
        return res.status(400).json({
            message:"Id field is required",
            status:'error',
            statusCode:400
        });
     }

     if(file) {
         const findPost = await postSchema.findOne({ _id : id });
         const path = `assets/uploads/${findPost.image}`;
         
         return fs.unlink(path , function(err) {
            if(err)  {
                return res.status(500).json({
                    message:err,
                    status:'error',
                    statusCode:500
                });
            }

            next();
        });
     }

     next();
}

export default unlinkPath;