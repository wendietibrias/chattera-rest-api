import userSchema from "../schemas/user.js";
import handleError from '../helper/handleError.js';


export const followController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            message:"Unauthorized",
            status:'error',
            statusCode:401
        });
    }

    try {

        //akun yang di follow
        const { id } = req.params;

        //akun yang memfollow
        const { user_id } = req.body;

        const findUser = await userSchema.findById(id.trim());
        const findThisUser = await userSchema.findById(user_id.trim());

 

        if(findUser && findThisUser) {
             findUser.follower.push({
                  _id:user_id
             });

             findThisUser.following.push({
                 _id:id
             });

             await findUser.save();
             await findThisUser.save();

             return res.status(200).json({
                message:"ok",
                status:'success',
                statusCode:200
             });
        }

    } catch(err) {
        handleError(err,res);
    }
}

export const unfollowController = async (req,res) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            message:"Unauthorized",
            status:'error',
            statusCode:401
        });
    }

    try {
          //akun yang di follow
          const { id } = req.params;

          //akun yang memfollow
          const { user_id } = req.body;
  
          const findUser = await userSchema.findById(id.trim()).populate('following').populate('follower').exec();
          const findThisUser = await userSchema.findById(user_id.trim()).populate('following').populate('follower').exec();

          if(findUser && findThisUser) {
              const filterFollowerUser = findUser.follower.filter(data=>data._id.toString() !== user_id.toString() ? data : "");
              const filterFollowingUser = findThisUser.following.filter(data=>data._id.toString() !== id.toString() ? data : "")

              findUser.follower = filterFollowerUser;
              findThisUser.following = filterFollowingUser;

              await findUser.save();
              await findThisUser.save();

              return res.status(200).json({
                ok:1,
                status:'success',
                statusCode:200
              });
          }
         
    } catch(err) {
        handleError(err,res);

    }
}