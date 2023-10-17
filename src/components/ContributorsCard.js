"use client"
import Link from 'next/link'
import React from 'react'

const ContributorsCard = (props) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
            <figure className="px-10 pt-10">
                <img style={{
                    borderRadius: "50%"
                }} src={`${props.avatar}`} alt="Contributor Avatar" className="rounded-xl w-24" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{props.name}</h2>
                <p>Contributions: {props.contributions}</p>
                <div className="card-actions">
                    <Link href={props.url} className="btn btn-primary">Visit GitHub</Link>
                </div>
            </div>
        </div>
    )
}

export default ContributorsCard
