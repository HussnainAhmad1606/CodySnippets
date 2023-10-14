import React from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
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
    return (
        <div>
            <h1 className='text-4xl my-8 text-center'>Categories</h1>
            <div className='grid w-full justify-center gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {Categories}
            </div>
        </div>
    )
}

export default Categories
