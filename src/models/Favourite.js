import mongoose from "mongoose";
const { Schema } = mongoose;

const favouriteSchema = new Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    snippet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodeSnippet"
    }
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Favourite", favouriteSchema);
