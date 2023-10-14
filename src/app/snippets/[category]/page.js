import Image from 'next/image'

export default function Home({params}) {
  const {category} = params;
  return (
    <>
    <h1 className='text-4xl text-center font-bold'>{category} Snippets</h1>
    </>
  )
}
