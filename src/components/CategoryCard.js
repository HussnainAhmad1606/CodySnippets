<<<<<<< HEAD
"use client"
=======
import Link from 'next/link'
>>>>>>> ebdfbe6cbe5d1d1f76333c669db0073f31fa848a
import React from 'react'

const CategoryCard = (props) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
            <figure className="px-10 pt-10">
                <img src={`${props.image}`} alt="Shoes" className="rounded-xl w-24" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.name} Code Snippets</h2>
                <p>{props.description}</p>
                <div className="card-actions">
<<<<<<< HEAD
                    <button className="btn btn-warning" onClick={()=>console.log("object")}>{props.name} Snippets</button>
=======
                    <Link href={`/snippets/${props.slug}`} className="btn btn-primary">Show Snippets</Link>
>>>>>>> ebdfbe6cbe5d1d1f76333c669db0073f31fa848a
                </div>
            </div>
        </div>
    )
}

export default CategoryCard
