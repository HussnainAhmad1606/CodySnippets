
"use client"
import React, { useState, useEffect, useMemo } from 'react'
import CodeSnippet from './CodeSnippet'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
const SnippetContainer = () => {
    const [snippets, setSnippets] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPosts, setTotalPosts] = useState(true);

    const getSnippets = async() => {
      const data = {
        page: page,
        limit: 1
      }

      const response = await axios.post('/api/explore', data)

      
        const newCodeSnippets = response.data.snippets;
      const total = response.data.totalPosts;

      const uniqueSnippets = new Set(snippets.map(snippet => snippet._id));
      const filteredNewSnippets = newCodeSnippets.filter(snippet => !uniqueSnippets.has(snippet._id));


      setSnippets(prevCodeSnippets => [...prevCodeSnippets, ...filteredNewSnippets]);

      // Update the total posts
      setTotalPosts(total);

      // Check if we have loaded all posts
      if (snippets.length + filteredNewSnippets.length >= total) {
        setHasMore(false);
      }

      // Increment the page number for the next fetch
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
      // console.log(filteredNewSnippets)
    }
  
    useEffect(() => {
      console.log('Initial fetchCodeSnippets');
      getSnippets(1);
  
      return () => {
        // Reset state when component unmounts
        console.log('Cleaning up state');
        setSnippets([]);
        setHasMore(true);
        setPage(1);
        setTotalPosts(0);
      };
    }, []); 

    const memoizedSnippets = useMemo(() => snippets, [snippets]);
    return (
       <div>
         {
      isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""
    }



<InfiniteScroll
        dataLength={memoizedSnippets.length}
        next={getSnippets}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p className='text-center my-5 text-2xl'>You have seen all snippets 👏</p>}
      >
    {
        memoizedSnippets.map((snippet, index) => <CodeSnippet key={index} title={snippet.title} id={snippet._id} language={snippet.language} author={snippet.author} upvotes={snippet.upvotes} commentsCount={snippet.commentsCount} downvotes={snippet.downvotes} createdAt={snippet.createdAt} category={snippet.category} />)
    }
</InfiniteScroll>
       </div>
    )
}

export default SnippetContainer
