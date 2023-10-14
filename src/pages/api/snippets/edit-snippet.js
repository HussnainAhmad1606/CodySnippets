import CodeSnippet from "../../../models/CodeSnippet";
import connectDB from "../../../middlewares/connectDB";

const { ObjectId } = require("mongodb");

const handler = async (request, response) => {
  var id = new ObjectId(snippetId);

  try {
    let snippet = await CodeSnippet.updateOne(
      { _id: id },
      {
        $set: {
          title: request.body.title,
          author: request.body.author,
          category: request.body.category,
          language: request.body.language,
          code: request.body.code,
          upvotes: request.body.upvotes,
          downvotes: request.body.downvotes,
        },
      }
    );
    return response
      .status(200)
      .json({ type: "success", message: "Code Snippet Updated Successfully" });
  } catch {
    return response
      .status(200)
      .json({
        type: "error",
        message: "Error occured while updating code snippet",
      });
  }
};

export default connectDB(handler);
