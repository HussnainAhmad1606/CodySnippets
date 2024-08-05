import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import CodeSnippet from '@/models/CodeSnippet';
import jwt from 'jsonwebtoken';
const handler = async (req, res) => {
    if (req.method == "POST") {
    try {
        const { snippetId, title, category, language, code } = req.body;
        await CodeSnippet.updateOne(
            { _id: snippetId }, 
            {
              $set: {
                title: title,
                category: category,
                language: language,
                code: code
              }
            }
          );
       
        res.status(200).json({type: "success", message: "Code Snippet Updated Successfully "})
       
    }catch {
        res.status(400).json({type: "error", message: "ERROR while updating code snippet."})
    }    
    }
    

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

const applyMiddlewares = (...middlewares) => (handler) => {
    return middlewares.reduce((acc, middleware) => middleware(acc), handler);
  };
  
  
  export default applyMiddlewares(connectDB, auth)(handler);