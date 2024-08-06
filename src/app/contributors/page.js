"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ContributorsCard from "../../components/ContributorsCard"
export default function Home() {

    const [contributors, setContributors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`https://api.github.com/repos/HussnainAhmad1606/CodySnippets-Hacktoberfest-2023/contributors`).then((response) => response.json())
        .then((data) => {
            // console.log(data);
            setContributors(data);
            setIsLoading(false);
        })
    }, [])
    
  return (
  <>
  <div className='p-10 flex justify-center items-center flex-col'>
  <h1 className='text-4xl font-bold'>Contributors 💪</h1>
  <p style={{
    textAlign: "center"
  }} className='my-5'>Thank you to the following contributors to add contributions to this platform</p>
  </div>

  {isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""}

    <div style={{
        minHeight: "80vh"
    }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {
            contributors.map(contributor=> {
                return (
                    <ContributorsCard key={contributor.id} name={contributor.login} avatar={contributor.avatar_url} contributions={contributor.contributions} url={contributor.html_url} />
                )
            })
        }
    </div>
  </>
  )
}
