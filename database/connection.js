import mongoose from "mongoose";

const connection = async (app , port) => {
   try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);

    if(conn) {
       return app.listen(port , () => console.log(`runnin on port ${port}`));
    } else {
        throw new Error("Faild to connect with database");
    }
 
   } catch(err) {
      console.log(err.message);
   }
}

export default connection;