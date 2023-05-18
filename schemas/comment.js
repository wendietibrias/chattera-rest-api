import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
    post_id: {
        type:mongoose.SchemaTypes.ObjectId,
        required:true ,
        ref:'post'
    },
    user: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required:true 
    },
    comment: {
        type:String,
        required:[true,'field comment must be filled']
    }
}, { timestamps:true });

export default mongoose.model('comment' , commentSchema);