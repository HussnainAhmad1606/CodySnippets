import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import Favourite from '@/models/Favourite';

import jwt from 'jsonwebtoken';



const dataHandler = async (req, res) => {



    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
  const decoded = jwt.decode(token); // Use environment variable for secret
  const { username } = decoded;

  const {userId, snippetId} = req.body;


  try {
    let prev = await Favourite.findOne({username: userId, snippet: snippetId})
    if (prev) {
        console.log("Snippet already saved")
      return res.status(400).json({type: "error", message: "Snippet Already Saved"});

    }
    let newFav = new Favourite({
        username: userId,
        snippet: snippetId
      })
    
      newFav.save();
    
      return res.status(200).json({type: "success", message: "Snippet Saved"})
    }
    
    catch(error) {
        console.log(error)
        return res.status(400).json({type: "error", message: "Error occured while saving the snippet"})
  }

  



};


const applyMiddlewares = (...middlewares) => (handler) => {
    return middlewares.reduce((acc, middleware) => middleware(acc), handler);
  };
  
  
  export default applyMiddlewares(connectDB, auth)(dataHandler);