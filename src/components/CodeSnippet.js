"use client"
import React, { useState } from 'react'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const CodeSnippet = (props) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl w-[90vw] mx-auto flex items-center justify-center">
        <div className='mx-8'>
          <FaArrowUp className='my-4 text-2xl' id="like" onClick={props.handleClick} color={props.like ? "pink" : "white"} />
          <FaArrowDown className='text-2xl' id="dislike" onClick={props.handleClick} color={props.dislike ? "red" : "white"} />
        </div>
        <div className='flex flex-col justify-center items-center my-8'>
          <div className='flex justify-center items-left'>
            <img src="/HTML.png" alt="HTML" className='w-8 rounded-e-full' />
            <p>Posted by: <span className='font-bold'>Zohaib Saeed</span> </p>
            <p className='font-thin'>(11 hours ago)</p>
          </div>
          <h1 className='text-4xl my-8'>
            Whats the best tip to get Funding?
          </h1>
          <div className='text-xl rounded-2xl leading-10'>
          </div>
        </div>
      </div>
  )
}

export default CodeSnippet
