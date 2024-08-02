import connectDB from "@/middlewares/connectDB";

const handler = async (request, response) => {
    return response.status(200).json({message: "API Running"})
}


export default connectDB(handler); 