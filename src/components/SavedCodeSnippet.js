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

const CodeSnippet = (props) => {
  const {Username} = useUserStore();
  const [totalUpvotes, setTotalUpvotes] = useState(props.upvotes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(props.upvotes.includes(Username));
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
  return (
    <div href={"/explore"} className="card card-side bg-base-100 shadow-xl w-[60vw] mx-auto flex items-center justify-center">
       
        <div className='flex flex-col justify-center items-center my-8'>
          <div className='w-full flex justify-between items-center'>
            <div className='flex justify-center items-center'>
            <p>Posted by: <span className='font-bold'>{props.author}</span> </p>
            </div>
            <p className='font-thin'>({new Date(props.createdAt).toLocaleString()})</p>
          </div>
          <Link href={`/snippets/${props.category.toLowerCase().replaceAll(" ", "-")}/${props.id}`} className='text-3xl font-bold my-8'>
            {props.title}
          </Link>
          <div className="flex justify-between w-[120%] items-center ">
        


       




      
      
      </div>
        </div>
      </div>
  )
}

export default CodeSnippet
