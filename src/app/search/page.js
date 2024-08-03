"use client"
import CodeSnippet from '@/components/CodeSnippet';
import axios from 'axios';

import { useState } from 'react'

export default function Home() {
  const [searchBy, setSearchBy] = useState("Language");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const search = async() => {
    setIsLoading(true);
    const request = await axios.post('/api/search/search', {
      searchBy: searchBy,
      query: query
    })

    setResults(request.data.results)
    setIsLoading(false);
    console.log(request)
  }
  return (
<div className='min-h-[100vh]'>
  <h1 className='font-bold text-center text-3xl my-5'>Search</h1>
    <div className='my-10 flex justify-center items-center'>
      <select value={searchBy} onChange={e=>setSearchBy(e.target.value)} className="select select-primary w-full max-w-xs">
  <option disabled selected>Search By</option>
  <option value={"Language"}>Language</option>
  <option value={"Title"}>Title</option>
  <option value={"Author"}>Author</option>

</select>


<input
  type="text"
  value={query}
  onChange={e=>setQuery(e.target.value)}
  placeholder="Type Query here"
  className="mx-5 input input-bordered input-primary w-full max-w-xs" />

  <button onClick={search} className='btn btn-primary'>Search</button>
    </div>

    {
      isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""
    }
    {
      isLoading==false&&results.length!=0?(
        <h1 className='text-center font-bold text-2xl my-3'>Search Results ({results.length})</h1>
      ):null
    }
    {
      isLoading==false&&results.length==0?(
        <h1 className='text-center font-bold text-2xl my-3'>No Results Found, Try changing the filter or query</h1>
      ):null
    }


{
        results.map(snippet => <CodeSnippet key={snippet._id} title={snippet.title} id={snippet._id} language={snippet.language} author={snippet.author} upvotes={snippet.upvotes} downvotes={snippet.downvotes} createdAt={snippet.createdAt} category={snippet.category} />)
    }
  </div>
   
  )
}
