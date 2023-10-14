import mongoose from 'mongoose';
const { Schema } = mongoose;

const codeSchema = new Schema({
    title: { type: String },
    author: { type: String },
    category: { type: String },
    language: { type: String },
    code: { type: String },
    upvotes: [{ type: String }],
    downvotes: [{ type: String }]

}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("CodeSnippet", codeSchema);