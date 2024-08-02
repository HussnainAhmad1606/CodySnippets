
import User from "@/models/User"
import connectDB from "@/middlewares/connectDB";
import bcrypt from "bcryptjs";
const handler = async (req, res) => {
    if (req.method == "POST") {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body)
        try {

            let user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword,
                isBlocked: req.body.isBlocked,
                isAdmin: req.body.isAdmin
            })
            
            await user.save();
            return res.status(200).json({type: "success", message: "user created successfully" })
        }
        catch(err) {
            return res.status(200).json({type: "error", message: "ERROR", errorCode: err.code })
            
        }
    }
    
    else {
        return res.status(200).json({type: "error", message: "ERROR: Not Allowed" })
    }
}


export default connectDB(handler); 