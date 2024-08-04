import connectDB from '@/middlewares/connectDB';
import User from "@/models/User";

const dataHandler = async (req, res) => {


    
    try {
      const {username} = req.body;

      console.log(`Finding user: ${username}`)

      const user = await User.findOne({username: username}, {_id:1, username:1});
      console.log(user)
        if(!user) {
            return res.status(400).json({type: "error", message: "User not found."})
        }
        
    
    
      return res.status(200).json({type: "success", user: user})
    }
    
    catch(error) {
        console.log(error)
        return res.status(400).json({type: "error", message: "Error occured while getting results. Please Try again."})
  }


};


  export default connectDB(dataHandler);