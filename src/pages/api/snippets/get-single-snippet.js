import CodeSnippet from "../../../models/CodeSnippet";
import Favourite from "../../../models/Favourite";
import connectDB from "../../../middlewares/connectDB";

const { ObjectId } = require("mongodb");


const handler = async (request, response) => {
    const snippetId = request.body.snippetId;
    const userId = request.body.userId;
    var id = new ObjectId(snippetId);
    
    let fav = await Favourite.findOne({username: userId, snippet: snippetId})
    let snippet = await CodeSnippet.findOne({ _id: id })

    if (fav) {
        return response.status(200).json({snippet: snippet, favourite: true})
    }
    else {
        return response.status(200).json({snippet: snippet, favourite: false})

    }

      
   
}


export default connectDB(handler); 