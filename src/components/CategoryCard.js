"use client"
import React from 'react'

const CategoryCard = (props) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
            <figure className="px-10 pt-10">
                <img src="/HTML.png" alt="Shoes" className="rounded-xl w-24" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.name} Code Snippets</h2>
                <p>You can get Infinite {props.name}.Click on the button below</p>
                <div className="card-actions">
                    <button className="btn btn-warning" onClick={()=>console.log("object")}>{props.name} Snippets</button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard
