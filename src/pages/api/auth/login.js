import User from "@/models/User"
import connectDB from "@/middlewares/connectDB";
import bcrypt from "bcryptjs";
import { signToken } from '@/utils/jwt';
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
    if (req.method == "POST") {
        const rUsername = req.body.username;
        const rPassword = req.body.password;
        let user = await User.findOne({username: rUsername})
        console.log(user)

        if (user && (await bcrypt.compare(rPassword, user.password))) {
     

            const token = signToken({ username: user.username }, process.env.JWT_TOKEN, '5h');
            const refreshToken = signToken({ username: user.username }, process.env.JWT_REFRESH_TOKEN, '7d');
          
            res.status(200).json({ type: "success", message: "Logged in Sucess", token: token, refreshToken: refreshToken });

        }
        else {
            return res.status(400).json({message: "Invalid Credientails", type: "error"})
        }

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}


export default connectDB(handler);