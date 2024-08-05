import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import CodeSnippet from '@/models/CodeSnippet';
import jwt from 'jsonwebtoken';
const handler = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token); 
    const { username } = decoded;

    const {snippetId, isLiked} = req.body;

  try {

       
       if (isLiked) {
        await CodeSnippet.updateOne({_id: snippetId}, {$pull: {upvotes: username}});
     
        res.status(200).json({type: "success", message: "Removed Upvote Successfully "})
       }
       else {
        await CodeSnippet.updateOne({_id: snippetId}, {$push: {upvotes: username}});
        res.status(200).json({type: "success", message: "Upvoted Successfully "})
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