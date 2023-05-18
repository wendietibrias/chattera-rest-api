import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
   username:{
    type:String,
    required:[true , 'field name must be filled']
   },
   email: {
    type:String,
    required:[true , 'field email must be filled'],
    unique:true
   },
   avatar: {
      type:String,
   },
   password:{
    type:String,
    required:[true, 'fiel password must be filled'],
    min:[6,'min 6 character for password']
   },
   address: {
    type:String
   },
   job:{
    type:String 
   },
   views:{
    type:Number,
    default:0
   },
   impressions:{
    type:Number,
    default:0
   },
   confirmationCode: {
      type:String,
      required:true 
   },
   statusAccount: {
      type:String,
      enum:['active' , 'pending'],
      default:"pending"
   },
   following:[
      {
         type:mongoose.SchemaTypes.ObjectId,
         ref:'user'
      } 
   ],
   follower:[
      {
         type:mongoose.SchemaTypes.ObjectId,
         ref:'user'
      } 
   ]
},{ timestamps:true });

export default mongoose.model('user' , userSchema);