"use client"
import SavedCodeSnippets from '@/components/SavedCodeSnippet';
import { useUserStore } from '@/store/store';
import api from '@/utils/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

function page() {
    const [snippets, setSnippets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {UserId} = useUserStore();

    const getSavedSnippets = async() => {
        console.log(UserId)
        setIsLoading(true);
        const req = await api.post("/favourites/get-user-favourite-snippets", {
            userId: UserId
        });
       
        console.log(req)
        if(req.data.type=="success"){
            setSnippets(req.data.snippets);
        }
        else {
            toast.error(req.data.message);
        }
       
        setIsLoading(false);
    }


    useEffect(() => {
        getSavedSnippets();
    }, [])
    
  return (
    <div className='min-h-[100vh]'>

<div className='flex justify-evenly items-center'>
<h1 className='my-5 text-3xl font-bold text-center'>Saved/Favourite Snippets</h1>
</div>
        {
      isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""
    }
        
    {
        snippets.map(snippet => <SavedCodeSnippets key={snippet} title={snippet.snippet.title} id={snippet.snippet._id} language={snippet.snippet.language} author={snippet.snippet.author} upvotes={snippet.snippet.upvotes} downvotes={snippet.snippet.downvotes} createdAt={snippet.snippet.createdAt} category={snippet.snippet.category} />)
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