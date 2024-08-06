import connectDB from '@/middlewares/connectDB';
import Contact from '@/models/Contact';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const contact = new Contact({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            });
            await contact.save();
            res.status(200).json({ type: "success", message: "Message Sent" });
        } catch {
            res.status(400).json({ type: "error", message: "Error while sending message" });
        }
    } else {
        res.status(400).json({ type: "error", message: "Invalid Request" });
    }

}

  
  export default connectDB(handler);