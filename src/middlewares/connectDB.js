import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (!mongoose.connections[0].readyState) {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
  }
  return handler(req, res);
}

export default connectDB;