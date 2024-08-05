
"use client"
import React, { useState, useEffect } from 'react'
import CodeSnippet from './CodeSnippet'

const SnippetContainer = () => {
    const [snippets, setSnippets] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      fetch(`/api/explore`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.posts)
        setSnippets(data.posts)
        setIsLoading(false)
      });
    }, [])
    return (
       <div>
         {
      isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""
    }

    {
        snippets.map(snippet => <CodeSnippet key={snippet._id} title={snippet.title} id={snippet._id} language={snippet.language} author={snippet.author} upvotes={snippet.upvotes} downvotes={snippet.downvotes} createdAt={snippet.createdAt} category={snippet.category} />)
    }

       </div>
    )
}

export default SnippetContainer
