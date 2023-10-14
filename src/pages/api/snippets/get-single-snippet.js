import CodeSnippet from "../../../models/CodeSnippet";
import connectDB from "../../../middlewares/connectDB";

const { ObjectId } = require("mongodb");


const handler = async (request, response) => {
    const snippetId = request.body.snippetId;
    var id = new ObjectId(snippetId);

    let snippet = await CodeSnippet.findOne({ _id: id })

    return response.status(200).json({snippet: snippet})
      
   
}


export default connectDB(handler); 