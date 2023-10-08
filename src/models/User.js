import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String, required: false },
  isBlocked: { type: Boolean },
  isAdmin: { type: Boolean }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("User", userSchema);