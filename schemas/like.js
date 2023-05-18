import mongoose from "mongoose";

const { Schema } = mongoose;

const likeSchema = new Schema({
    post_id: {
        type:mongoose.SchemaTypes.ObjectId,
        required:true ,
        ref:'post'
    },
    user_id: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }
},{ timestamps:true });

export default mongoose.model('like' , likeSchema);