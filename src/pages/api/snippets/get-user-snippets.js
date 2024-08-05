import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import CodeSnippet from '@/models/CodeSnippet';
import jwt from 'jsonwebtoken';

const dataHandler = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token); 
    const { username } = decoded;
    console.log(username)


  try {
    let snippets = await CodeSnippet.find({author: username})
   
    return res.status(200).json({type: "success", snippets: snippets})
    }
    
    catch(error) {
        console.log(error)
        return res.status(400).json({type: "error", message: "Error occured while getting snippets"})
  }

};

const applyMiddlewares = (...middlewares) => (handler) => {
    return middlewares.reduce((acc, middleware) => middleware(acc), handler);
  };
  
  
  export default applyMiddlewares(connectDB, auth)(dataHandler);