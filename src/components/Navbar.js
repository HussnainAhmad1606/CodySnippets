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
      <li><Link href={"/explore"}>Explore</Link></li>
      <li><Link href={"/trending"}>Trending</Link></li> 
      <li><Link href={"/categories"}>Categories</Link></li>
      <li><Link href={"/contact"}>Contact</Link></li>
      <li><Link href={"/contributors"}>Contributors</Link></li>

      </ul>
    </div>
    <Link href={"/"} className="btn btn-ghost normal-case text-xl">CodySnippets</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><Link href={"/"}>Home</Link></li>
      <li><Link href={"/explore"}>Explore</Link></li>
      <li><Link href={"/trending"}>Trending</Link></li> 
      <li><Link href={"/categories"}>Categories</Link></li>
      <li><Link href={"/contact"}>Contact</Link></li>
      <li><Link href={"/contributors"}>Contributors</Link></li>
    </ul>
  </div>

  <div className="navbar-end">

    <Link href={"/login"} className="hoverffect mx-2 btn-primary btn">Login</Link>
    <Link href={"/signup"} className="hoverffect btn-primary btn">Signup</Link>
   

    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost avatar">
        <div className="w-10 rounded-full">
          <img src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/008337556bc2a8f594653f135b5fb120766e5aba_full.jpg" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link href={"/profile"} className="justify-between">
            My Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><button>Logout</button></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar