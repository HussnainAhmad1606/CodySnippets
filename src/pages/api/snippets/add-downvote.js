import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import CodeSnippet from '@/models/CodeSnippet';
import jwt from 'jsonwebtoken';
const handler = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token); 
    const { username } = decoded;

    const {snippetId, isDisLiked} = req.body;

  try {

       
       if (isDisLiked) {
        await CodeSnippet.updateOne({_id: snippetId}, {$pull: {downvotes: username}});
     
        res.status(200).json({type: "success", message: "Removed Downvote Successfully "})
       }
       else {
        await CodeSnippet.updateOne({_id: snippetId}, {$push: {downvotes: username}});
        res.status(200).json({type: "success", message: "Downvoted Successfully "})
    }
    }
 catch {
        res.status(400).json({type: "error", message: "ERROR while publishing code snippet."})
    }    
    
}

const applyMiddlewares = (...middlewares) => (handler) => {
    return middlewares.reduce((acc, middleware) => middleware(acc), handler);
  };
  
  
  export default applyMiddlewares(connectDB, auth)(handler);