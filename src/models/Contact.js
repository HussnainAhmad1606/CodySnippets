import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
  

}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Contact", contactSchema);