import jwt from 'jsonwebtoken';
import userSchema from '../schemas/user.js';

const verifyToken = async (req,res,next) => {
    const authorization = req.headers.authorization;

    if(!authorization) {
        return res.status(401).json({
        message:"unauthorized",
        status:"error",
        statusCode:401
    });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token , process.env.SECRET, async function(err,decoded) {
         if(err) {
           return res.status(500).json({
               message:err,
               status:"error",
               statusCode:500
           });
        }

         const id = decoded._id;
         const findUser = await userSchema.findOne({_id:id});

         if(!findUser) {
            return res.status(401).json({
                message:"token invalid",
                status:'error',
                statusCode:401
            });
         }

         req.user = decoded;

         return next();
    });
}

export default verifyToken;