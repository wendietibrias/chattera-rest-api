import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
     likes:[{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'like'
     }],
     user_id: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required:[true, 'users is required']
     },
     caption: {
        type:String,
        required:[true,  'caption is required'] 
     },
     image: {
        type:String,
        required:[true, 'image is required']
     },
},{ timestamps:true });

export default mongoose.model('post' , postSchema);