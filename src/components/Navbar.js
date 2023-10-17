import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link href={"/"}>Home</Link></li>
      <li><Link href={"/trending"}>Trending</Link></li>
      <li tabIndex={0}>
        <details>
          <summary>Categories</summary>
          <ul className="p-2">
            <li><Link href={"/categories"}>Web Development</Link></li>
            <li><Link href={"/categories"}>Machine Learning</Link></li>
            <li><Link href={"/categories"}>More.....</Link></li>
          </ul>
        </details>
      </li>
      <li><Link href={"/about"}>About</Link></li>
      <li><Link href={"/contact"}>Contact</Link></li>
      <li><Link href={"/contributors"}>Contributors</Link></li>

      </ul>
    </div>
    <Link href={"/"} className="btn btn-ghost normal-case text-xl">CodySnippets</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={"/"}>Home</Link></li>
      <li><Link href={"/trending"}>Trending</Link></li>
      <li tabIndex={0}>
        <details>
          <summary>Categories</summary>
          <ul className="p-2">
          <li><Link href={"/categories"}>Web Development</Link></li>
            <li><Link href={"/categories"}>Machine Learning</Link></li>
            <li><Link href={"/categories"}>More.....</Link></li>
          </ul>
        </details>
      </li>
      <li><Link href={"/about"}>About</Link></li>
      <li><Link href={"/contact"}>Contact</Link></li>
      <li><Link href={"/contributors"}>Contributors</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link href={"/login"} className="mx-2 btn-primary btn">Login</Link>
    <Link href={"/signup"} className="btn-primary btn">Signup</Link>
  </div>
</div>
  )
}

export default Navbar