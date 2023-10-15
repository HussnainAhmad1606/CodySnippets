"use client"
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
<<<<<<< HEAD
    const categories = [
        {
            id: 1,
            name: 'HTML',
            img: '/HTML.png',
        },
        {
            id: 2,
            name: 'HTML',
            img: '/HTML.png',
        },
        {
            id: 3,
            name: 'HTML',
            img: '/HTML.png',
        },
        {
            id: 4,
            name: 'HTML',
            img: '/HTML.png',
        },
        {
            id: 5,
            name: 'HTML',
            img: '/HTML.png',
        },
        {
            id: 6,
            name: 'HTML',
            img: '/HTML.png',
        },
        {
            id: 7,
            name: 'HTML',
            img: '/HTML.png',
        },
        {
            id: 8,
            name: 'HTML',
            img: '/HTML.png',
        }
    ]
    const Categories = categories.map(category => <CategoryCard key={category.id} name={category.name} img={category.img} />)
=======
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/get-categories`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.categories)
            setCategories(data.categories)
        })
        .catch((error) => console.log(error));
      }, []);

    
    
  
    const CATEGORIES = categories.map(category => <CategoryCard key={category.name} name={category.name} description={category.description} slug={category.slug} image={category.image} />)
>>>>>>> ebdfbe6cbe5d1d1f76333c669db0073f31fa848a
    return (
        <div>
            <h1 className='text-4xl my-8 text-center font-bold'>Categories</h1>
            <div className='grid w-full justify-center gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {CATEGORIES}
            </div>

        </div>
    )
}

export default Categories
