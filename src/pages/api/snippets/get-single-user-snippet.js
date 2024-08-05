import CodeSnippet from "../../../models/CodeSnippet";
import connectDB from "../../../middlewares/connectDB";

const { ObjectId } = require("mongodb");


const handler = async (request, response) => {
    try {
        const snippetId = request.body.snippetId;
    var id = new ObjectId(snippetId);
    
    let snippet = await CodeSnippet.findOne({_id: snippetId});
    return response.status(200).json({type: "success", snippet: snippet});
    
}

catch(error) {
    console.log(error);
    return response.status(400).json({type: "error", message: "Error occured while getting the snippet."});
    }
      
   
}


export default connectDB(handler); 