import userSchema from "../schemas/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import confirmationCode from "../helper/confirmationCode.js";
import HTMLTemplate from "../helper/htmlTemplate.js";
import transporter from "../helper/transporter.js";

export const loginController = async (req,res) => {
    const {
        email ,
        password 
    } = req.body;

    try {
        const findUser = await userSchema.findOne({ email:email });

        //cek jika akun terdaftar di database
        if(!findUser) {
            return res.status(404).json({
                message:"account not found",
                status:'error',
                statusCode:400
            });
        }

        if(findUser.statusAccount === "pending") {
            return res.status(401).json({
                message:"your account is not active",
                status:'error',
                statusCode:401
            });
        }

        //compare password
        bcrypt.compare(password, findUser.password , function(err,hash) {
             if(err) {
                return res.status(500).json({
                    message:err,
                    status:'error',
                    statusCode:400
                });
             }

             if(hash) {
                const token = jwt.sign({
                    _id:findUser._id,
                } , process.env.SECRET , { algorithm:"HS256" }, { expiresIn:"1d" });

                return res.status(200).json({
                    token:token,
                    status:'success',
                    statusCode:200
                });
             }

             return res.status(401).json({
                message:"error",
                status:'error',
                statusCode:500
            });
        });

    } catch(err) {
        return res.status(500).json({
            message:err.message,
            status:'error',
            statusCode:500
        });
    }
}

export const registerController = async (req,res) => {
    const {
        username,
        email,
        password,
        confirm
    } = req.body;

    try {

        const findUser = await userSchema.findOne({ email:email });
        
         //cek jika akun terdaftar di database
         if(findUser) {
            return res.status(401).json({
                message:"account is already exists",
                status:'error',
                statusCode:400
            });
        }

        //cek password match

        if(password !== confirm) {
            return res.status(400).json({
                message:"password is not match",
                status:'error',
                statusCode:400
            });
        }

        let saltRounds = 10;

        const initUser = new userSchema({
            email,
            username,
        });

        bcrypt.genSalt(saltRounds , function(err,salt) {
           if(err) {
            return res.status(500).json({
                message:err,
                status:'error',
                statusCode:400
            });
           }

             bcrypt.hash(password,salt, async function(err,hash) {
               if(err) {
                return res.status(500).json({
                    message:err,
                    status:'error',
                    statusCode:400
                });
               }

               initUser.password  = hash;
               initUser.statusAccount = "pending";
               initUser.confirmationCode = confirmationCode();

               const saved = await initUser.save();

               const sendMail = await transporter.sendMail({
                   from:"wendietibrias@gmail.com",
                   to:email,
                   subject:"Email confirmation",
                   text:"Email confirmation for user",
                   html:HTMLTemplate(saved.confirmationCode)
               });


               if(saved && sendMail) {
                  transporter.close();

                  return res.status(200).json({
                    message:"success create account ,check your email",
                    status:'success',
                    statusCode:200
                  });
               }
           });
        });


    } catch(err) {
        return res.status(500).json({
            message:err.message,
            status:'error',
            statusCode:500
        });
    }
}


export const activationAccountController = async (req,res) => {
   const { code } = req.params;

   try {
     const findUser = await userSchema.findOne({ confirmationCode:code });

     if(!findUser) {
        return res.status(400).json({
            message:"invalid confirm code , please check your email again!",
            status:'error',
            statusCode:400
        });
     }

     findUser.statusAccount = 'active';
    //  findUser.confirmationCode = null;

     const saved = await findUser.save();

     if(saved) {
        return res.status(200).json({
            message:"Your account is active now!",
            statusCode:200,
            status:"success"
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