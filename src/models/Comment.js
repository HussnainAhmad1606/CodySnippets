import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    author: { type: String },
    body: { type: String },
    snippetId: { type: String }
}, { timestamps: true });

mongoose.models = {}

export default mongoose.model("Comment", commentSchema);