import CodeSnippet from "../../../models/CodeSnippet";
import connectDB from "../../../middlewares/connectDB";


const handler = async (request, response) => {
    const category = request.body.category;

  try {
    const snippets = await CodeSnippet.find({ category: { $regex: category, $options: 'i' } });
    

    return response.status(200).json({type:"success", snippets: snippets})
  }
  catch(error) {
      return response.status(500).json({message: "Internal Server Error", type: "error"})
  }
  
      
   
}


export default connectDB(handler); 