import mongoose from 'mongoose';

const { Schema } = mongoose;

const followerSchema = new Schema({
    user_id: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }
} , { timestamps:true }); 

export default mongoose.model('follower' , followerSchema);