

import Category from "../../../models/Category";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {

    try {
       let categories = await Category.find({})
        res.status(200).json({type: "success", categories:categories})
       
    }catch(error) {
        res.status(400).json({type: "error", message: `ERROR while fetching categories. ${error}`})
    } 
  
    

}

export default connectDB(handler);