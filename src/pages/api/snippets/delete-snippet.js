import CodeSnippet from "../../../models/CodeSnippet";
import connectDB from "../../../middlewares/connectDB";

const { ObjectId } = require("mongodb");

const handler = async (request, response) => {
    const snippetId = request.body.snippetId;
    var id = new ObjectId(snippetId);
    try {
        
    let post = await CodeSnippet.deleteOne({ _id: id })

    return response.status(200).json({type: "success", message: "Code Snippet Deleted Successfully"})
    
}
catch {
        return response.status(200).json({type: "error", message: "Error while deleting the code snippet. Please try again"})

    }
   
}


export default connectDB(handler); 