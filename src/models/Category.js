import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String },
    description: { type: String },
    slug: { type: String },
    image: { type: String },
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Category", categorySchema);