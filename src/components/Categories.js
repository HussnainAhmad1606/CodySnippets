"use client"
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/get-categories`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.categories)
            setCategories(data.categories)
            setIsLoading(false)
        })
        .catch((error) => console.log(error));
      }, []);

    
    
  
    const CATEGORIES = categories.map(category => <CategoryCard key={category.name} name={category.name} description={category.description} slug={category.slug} image={category.image} />)
    return (
        <div style={{
            minHeight: "80vh"
        }}>
            <h1 className='text-4xl my-8 text-center font-bold'>Categories</h1>
            <p className='text-center'>Check out some of our categories below!</p>
            {isLoading?<center><span className="my-10 loading loading-spinner loading-lg"></span></center>: ""}
            <div className='grid w-full justify-center gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {CATEGORIES}
            </div>

        </div>
    )
}

export default Categories
