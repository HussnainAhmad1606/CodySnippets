import SnippetContainer from '@/components/SnippetContainer'
import Image from 'next/image'

export default function Home() {
  return (
    // <div className='flex justify-center items-center'>
    //   <p className='my-5 font-bold text-4xl'>Trending CodySnippets</p>
    // </div>
    <div style={{
      minHeight: "70vh"
    }}>
    <p className='my-5 text-center font-bold text-4xl'>Trending on CodySnippets</p>

      <SnippetContainer />

    </div>
  )
}
