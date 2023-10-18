"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const CodeSnippet = (props) => {
  return (
    <div href={"/explore"} className="card card-side bg-base-100 shadow-xl w-[60vw] mx-auto flex items-center justify-center">
        <div className='mx-8'>
          <FaArrowUp className='my-4 text-2xl' id="like" />
          <FaArrowDown className='text-2xl' id="dislike"/>
        </div>
        <div className='flex flex-col justify-center items-center my-8'>
          <div className='w-full flex justify-between items-center'>
            <div className='flex justify-center items-center'>
            <img src="/HTML.png" alt="HTML" className='w-8 rounded-full' />
            <p>Posted by: <span className='font-bold'>{props.author}</span> </p>
            </div>
            <p className='font-thin'>({new Date(props.createdAt).toLocaleString()})</p>
          </div>
          <Link href={`/snippets/${props.category.toLowerCase().replaceAll(" ", "-")}/${props.id}`} className='text-4xl my-8'>
            {props.title}
          </Link>
          <div className='text-xl rounded-2xl leading-10'>
          </div>
        </div>
      </div>
  )
}

export default CodeSnippet
