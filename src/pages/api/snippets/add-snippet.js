import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import CodeSnippet from '@/models/CodeSnippet';
import jwt from 'jsonwebtoken';
const handler = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token); 
    const { username } = decoded;

    if (req.method == "POST") {
    try {
        let codeSnippet = new CodeSnippet({
            title: req.body.title,
            author: username,
            category: req.body.category,
            language: req.body.language,
            code: req.body.code,
            upvotes: [],
            downvotes:[],
            })
        await codeSnippet.save();
        // get id of the code snippet
        const id = codeSnippet._id;
        res.status(200).json({type: "success", message: "Code Snippet Published Successfully ", id: id})
       
    }catch {
        res.status(400).json({type: "error", message: "ERROR while publishing code snippet."})
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