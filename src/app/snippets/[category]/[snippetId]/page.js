import Image from 'next/image'

export default function Home({params}) {
  const {snippetId} = params;
  return (
    <>
    <h1 className='text-4xl text-center font-bold'>{snippetId} Snippets</h1>
    </>
  )
}
