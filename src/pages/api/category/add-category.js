

import Category from "../../../models/Category";
import connectDB from "../../../middlewares/connectDB";

const handler = async (req, res) => {

    if (req.method == "POST") {
    try {
        let category = new Category({
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
            image: req.body.image
            })
        await category.save()
        res.status(200).json({type: "success", message: "Category added Successfully "})
       
    }catch {
        res.status(400).json({type: "error", message: "ERROR while adding category."})
    }    
    }
    

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);