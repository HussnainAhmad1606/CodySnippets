import connectDB from '@/middlewares/connectDB';
import CodeSnippet from "@/models/CodeSnippet";

const dataHandler = async (req, res) => {


    
    try {
      const {searchBy, query} = req.body;
    const regex = new RegExp(query, 'i'); 

    console.log(searchBy, query)


    const searchFields = {
      Language: 'language',
      Title: 'title',
      Author: 'author',
    };

    const searchField = searchFields[searchBy] || 'title';

    const searchQuery = { [searchField]: { $regex: regex } };

    // Perform the search
    const results = await CodeSnippet.find(searchQuery);
    
      return res.status(200).json({type: "success", results: results})
    }
    
    catch(error) {
        console.log(error)
        return res.status(400).json({type: "error", message: "Error occured while getting results. Please Try again."})
  }

  



};



  
  export default connectDB(dataHandler);