"use client"
import CodeSnippet from '@/components/CodeSnippet';
import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Home({params}) {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {category} = params;
  const finalCategory = category.replace(/-/g, " ");
  const getSnippets = async() => {
    setIsLoading(true);
    // console.log(finalCategory)
    const response = await axios.post("/api/snippets/get-category-snippets", {
      category: finalCategory
    })
    // console.log(response)
    
    // console.log(response.data.snippets)
    if (response.data.type == 'success') {
      setSnippets(response.data.snippets)
    }
    else {
      toast.error(response.data.message)
    }
    setIsLoading(false);
    

  }

  useEffect(() => {
    getSnippets();
  }, [])
  
  return (
    <div className='min-h-[100vh]'>
    <h1 className='text-4xl text-center my-5 font-bold'>{finalCategory} Snippets</h1>
    {
      isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""
    }

    {
        snippets.map(snippet => <CodeSnippet className="my-5" key={snippet._id} title={snippet.title} id={snippet._id} language={snippet.language} author={snippet.author} upvotes={snippet.upvotes} downvotes={snippet.downvotes} createdAt={snippet.createdAt} category={snippet.category} />)
    }


    {
      snippets.length == 0 && !isLoading? <center><h1 className="text-2xl">No Snippets Found</h1></center>:null
    }
    </div>
  )
}
