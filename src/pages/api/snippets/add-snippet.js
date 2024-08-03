

import CodeSnippet from "@/models/CodeSnippet";
import connectDB from "@/middlewares/connectDB";


const handler = async (req, res) => {

    if (req.method == "POST") {
    try {
        let codeSnippet = new CodeSnippet({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            language: req.body.language,
            code: req.body.code,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes,
            })
        await codeSnippet.save()
        res.status(200).json({type: "success", message: "Code Snippet Published Successfully "})
       
    }catch {
        res.status(400).json({type: "error", message: "ERROR while publishing code snippet."})
    }    
    }
    

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);