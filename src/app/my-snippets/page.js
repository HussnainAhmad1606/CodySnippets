"use client"
import MyCodeSnippet from '@/components/MyCodeSnippet';
import api from '@/utils/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function page() {
    const [snippets, setSnippets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getSnippets = async() => {
        setIsLoading(true);
        const req = await api.get("/snippets/get-user-snippets");
        const res = await req.data;
        // console.log(req)
        setSnippets(res.snippets);
        setIsLoading(false);
    }


    useEffect(() => {
      getSnippets();
    }, [])
    
  return (
    <div className='min-h-[100vh]'>

<div className='flex justify-evenly items-center'>
<h1 className='my-5 text-3xl font-bold text-center'>My Snippets</h1>
<Link className="btn btn-sm btn-primary" href={"/my-snippets/add"}>Add New Snippet</Link>
</div>
        {
      isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""
    }
        
    {
        snippets.map(snippet => <MyCodeSnippet key={snippet._id} title={snippet.title} id={snippet._id} language={snippet.language} author={snippet.author} upvotes={snippet.upvotes} downvotes={snippet.downvotes} createdAt={snippet.createdAt} category={snippet.category} />)
    }


    {
        isLoading==false&&snippets.length==0?(
            <div className='flex justify-center items-center min-h-[80vh]'>
            <h1 className='text-2xl'>No Snippets Found</h1>
                </div>
                ):""

    }


    </div>
  )
}

export default page