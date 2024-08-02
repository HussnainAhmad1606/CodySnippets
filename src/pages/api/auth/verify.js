import User from "@/models/User"
import connectDB from "@/middlewares/connectDB";
import bcrypt from "bcryptjs";
import { signToken, verifyToken } from '@/utils/jwt';
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
    if (req.method == "POST") {

        const verification = verifyToken(req.body.token, process.env.JWT_TOKEN);
        if (!verification) {
            return res.status(200).json({ type: "error", message: "Invalid Token" })
        }
        const user = await User.findOne({ username: verification.username });
      
        res.status(200).json({ type: "success", message: "Logged in Sucess", user: user});

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}


export default connectDB(handler);