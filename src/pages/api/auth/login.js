import User from "../../../models/User"
import connectDB from "../../../middlewares/connectDB";
import bcrypt from "bcryptjs";
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
    if (req.method == "POST") {
        const rUsername = req.body.username;
        const rPassword = req.body.password;
        let user = await User.findOne({username: rUsername})
        console.log(user)

        if (user && (await bcrypt.compare(rPassword, user.password))) {
            var token = jwt.sign({email: user.username, password: user.password}, process.env.JWT_TOKEN);
            return res.status(200).json({message: "User Logged in", type:"success", token: token})

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