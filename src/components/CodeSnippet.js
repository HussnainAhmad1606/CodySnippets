"use client"
import { useUserStore } from '@/store/store';
import api from '@/utils/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { BiComment } from 'react-icons/bi';
import { FaArrowUp, FaArrowDown, FaStar, FaShare } from "react-icons/fa";
import { TbArrowBigDown, TbArrowBigUp } from 'react-icons/tb';
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { useRouter } from 'next/navigation';

const CodeSnippet = (props) => {
  const {Username} = useUserStore();
  const [totalUpvotes, setTotalUpvotes] = useState(props.upvotes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLiked(props.upvotes.includes(Username));
    setIsDisLiked(props.downvotes.includes(Username));
  }, [])
  

  const addUpvote = async() => {
    const res = await api.post("/snippets/add-upvote", {
      snippetId: props.id,
      isLiked: isLiked
    })

    toast.success(res.data.message);

    if (res.data.type) {
      if (isLiked) {
        setTotalUpvotes(totalUpvotes - 1);
      }
      else {
        setTotalUpvotes(totalUpvotes + 1);
      }
      setIsLiked(!isLiked);
    }
  }


  const addDownVote = async() => {
    const res = await api.post("/snippets/add-downvote", {
      snippetId: props.id,
      isDisLiked: isDisLiked
    })
  
    toast.success(res.data.message);
  
    if (res.data.type == "success") {
      
      setIsDisLiked(!isDisLiked);
    }
  }
  
  return (
    <div className="card card-side bg-base-100 shadow-xl w-[60vw] mx-auto flex items-center justify-center">
       
        <div className='flex flex-col justify-center items-center my-8'>
          <div className='w-[150%] flex justify-evenly items-center'>
            <div className='flex justify-center items-center'>
            <p>Posted by: <span className='font-bold'>{props.author}</span> </p>
            </div>
            <p className='font-thin'>({new Date(props.createdAt).toLocaleString()})</p>
          </div>
          <Link href={`/snippets/${props.category.toLowerCase().replaceAll(" ", "-")}/${props.id}`} className='text-3xl font-bold my-8'>
            {props.title}
          </Link>
          <div className="flex justify-between w-[120%] items-center ">
        



        {/* left side */}

        <div className="flex justify-center items-center">
        <div className="bg-gray-300 bg-opacity-0 p-1 rounded-3xl flex justify-center items-center border-none rounded-2xl bg-gray-300 bg-opacity-10">
       

              <button onClick={addUpvote}>
                {
                  isLiked?(
                    <BiSolidUpvote className="text-2xl" />
                    ):(
                      <TbArrowBigUp className="text-2xl" />
                  )
                }
                </button>
              <p className="mx-2">{totalUpvotes}</p>
              <button onClick={addDownVote}>
              {
                  isDisLiked?(
                    <BiSolidDownvote className="text-2xl" />
                  ):(
                    <TbArrowBigDown className="text-2xl" />
                  )
                }
              </button>
          
        </div>

        <div className="bg-gray-300 bg-opacity-0 p-2 rounded-3xl flex justify-center items-center">
          <details  onClick={()=>
          router.push(`/snippets/${props.category.toLowerCase().replaceAll(" ", "-")}/${props.id}`)
          }  className="dropdown">
            <summary className="btn btn-sm border-none rounded-2xl bg-gray-300 bg-opacity-10">
              <BiComment className="text-2xl" />
              <p>{props.commentsCount}</p>
            </summary>
           
          </details>
        </div>


       
        <div  onClick={()=>
          router.push(`/snippets/${props.category.toLowerCase().replaceAll(" ", "-")}/${props.id}`)
          } className="bg-gray-300 bg-opacity-0 p-2 rounded-3xl flex justify-center items-center">
          <details className="dropdown">
            <summary className="btn btn-sm border-none rounded-2xl bg-gray-300 bg-opacity-10">
              <FaShare className="text-2xl" />
              Share
            </summary>
          </details>
        </div>
    

      


        </div>




      
      
      </div>
        </div>
      </div>
  )
}

export default CodeSnippet
