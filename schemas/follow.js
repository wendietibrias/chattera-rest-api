import mongoose from 'mongoose';

const { Schema } = mongoose;

const followSchema = new Schema({
    user_id: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user'
    }
}, { timestamps:true });

export default mongoose.model('follow' , followSchema);