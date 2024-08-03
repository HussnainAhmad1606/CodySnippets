import connectDB from '@/middlewares/connectDB';
import Comment from '@/models/Comment';

const dataHandler = async (req, res) => {

  const {snippetId} = req.body;

  try {
    const comments = await Comment.find({snippetId: snippetId})
    return res.status(200).json({type: "success", comments: comments})
    }

    catch(error) {
        console.log(error)
        return res.status(400).json({type: "error", message: "Error occured while getting comments"})
  }


};


export default connectDB(dataHandler);