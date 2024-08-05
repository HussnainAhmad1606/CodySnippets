"use client"
import api from '@/utils/api';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { BiComment } from 'react-icons/bi';
import { FaArrowUp, FaArrowDown, FaStar, FaShare } from "react-icons/fa";
import { TbArrowBigDown, TbArrowBigUp } from 'react-icons/tb';

const CodeSnippet = (props) => {
  const deleteSnippet = async (id) => {
    const res = await api.post("/snippets/delete-snippet", {
      snippetId: props.id
    })

    if (res.data.type) {
      toast.success(res.data.message);
      window.location.reload();
    }
    else {
      toast.error(res.data.message);
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
          <Link href={`/snippets/${props.category.toLowerCase().replaceAll(" ", "-")}/${props.id}`} className='text-4xl my-8'>
            {props.title}
          </Link>
          <div className="flex justify-between w-[120%] items-center ">
        



        {/* left side */}

        <div className="flex justify-center items-center">
        <div className="bg-gray-300 bg-opacity-0 p-1 rounded-3xl flex justify-center items-center border-none rounded-2xl bg-gray-300 bg-opacity-10">
       

              <button><TbArrowBigUp className="text-2xl" /></button>
              <p className="mx-2">10</p>
              <button><TbArrowBigDown className="text-2xl" /></button>
          
        </div>

        <div className="bg-gray-300 bg-opacity-0 p-2 rounded-3xl flex justify-center items-center">
          <details  onClick={()=>document.getElementById('comments').showModal()}  className="dropdown">
            <summary className="btn btn-sm border-none rounded-2xl bg-gray-300 bg-opacity-10">
              <BiComment className="text-2xl" />
              <p>{10}</p>
            </summary>
           
          </details>
        </div>


       
        <div className="bg-gray-300 bg-opacity-0 p-2 rounded-3xl flex justify-center items-center">
          <details className="dropdown">
            <summary className="btn btn-sm border-none rounded-2xl bg-gray-300 bg-opacity-10">
              <FaShare className="text-2xl" />
              Share
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2">
              <li>
                <button>Copy URL</button>
              </li>
              <li>
                <button>Embed Code</button>
              </li>
            </ul>
          </details>
        </div>


        <Link href={`/my-snippets/edit?id=${props.id}`} className='btn btn-sm btn-primary'>Edit</Link>
        <button onClick={deleteSnippet} className='mx-2 btn btn-sm btn-error'>Delete</button>
    

      


        </div>




      
      
      </div>
        </div>
      </div>
  )
}

export default CodeSnippet
