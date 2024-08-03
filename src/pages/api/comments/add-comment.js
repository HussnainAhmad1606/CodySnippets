import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import Comment from '@/models/Comment';

import jwt from 'jsonwebtoken';



const dataHandler = async (req, res) => {

    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
  const decoded = jwt.decode(token); // Use environment variable for secret
  const {username} = decoded;

  const {body, snippetId} = req.body;


  try {

    const comment = await Comment({
        author: username,
        body: body,
        snippetId: snippetId

    })
    await comment.save();

    return res.status(200).json({type: "success", message: "Comment Added Successfully"})
    }
    
    catch(error) {
        console.log(error)
        return res.status(400).json({type: "error", message: "Error occured while adding comment"})
  }
};


const applyMiddlewares = (...middlewares) => (handler) => {
    return middlewares.reduce((acc, middleware) => middleware(acc), handler);
  };
  
  
  export default applyMiddlewares(connectDB, auth)(dataHandler);