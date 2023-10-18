"use client"
import SnippetContainer from '@/components/SnippetContainer'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

 
  
  return (
  <div className='flex justify-center items-center flex-col'>
    <p className='my-5 font-bold text-4xl'>Explore CodySnippets</p>
   <SnippetContainer/>
  </div>
  )
}
