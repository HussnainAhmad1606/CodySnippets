"use client"
import Link from 'next/link'
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
                    <Link href={`/snippets/${props.slug}`} className="btn btn-primary">Show Snippets</Link>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard
