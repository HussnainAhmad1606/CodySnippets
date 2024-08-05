import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import CodeSnippet from '@/models/CodeSnippet';
import Comment from '@/models/Comment';


const dataHandler = async (req, res) => {

    try {

        const { page = 1, limit = 20 } = req.query;

        const codeSnippetsWithCommentsCount = await CodeSnippet.aggregate([
            {
              $addFields: {
                _idString: { $toString: '$_id' } // Convert _id to string for matching
              }
            },
            {
              $lookup: {
                from: 'comments', // Ensure this matches your comments collection name
                localField: '_idString', // Use the string representation of _id
                foreignField: 'snippetId', // Field in Comment schema
                as: 'comments'
              }
            },
            {
              $addFields: {
                commentsCount: { $size: '$comments' }, // Count number of comments
                upvotesCount: { $size: '$upvotes' } // Count number of upvotes
              }
            },
            {
              $sort: { upvotesCount: -1, commentsCount: -1 } // Sort by upvotes and then by comments count
            },
            {
              $skip: (page - 1) * limit // Skip snippets for the current page
            },
            {
              $limit: parseInt(limit) // Limit the number of snippets returned
            }
          ]);
          res.status(200).json({ type: "success", posts: codeSnippetsWithCommentsCount });



    }
    
    catch(error) {
        console.log(error)
        return res.status(400).json({type: "error", message: "Error occured while adding comment"})
  }
};


const applyMiddlewares = (...middlewares) => (handler) => {
    return middlewares.reduce((acc, middleware) => middleware(acc), handler);
  };
  
  
  export default connectDB(dataHandler);