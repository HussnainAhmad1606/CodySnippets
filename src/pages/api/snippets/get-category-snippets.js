import CodeSnippet from "../../../models/CodeSnippet";
import connectDB from "../../../middlewares/connectDB";


const handler = async (request, response) => {
    const category = request.body.category;

    let snippets = await CodeSnippet.find({ category: category })

    return response.status(200).json({snippets: snippets})
      
   
}


export default connectDB(handler); 