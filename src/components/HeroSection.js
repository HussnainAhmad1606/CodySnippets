import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <div
      className="hero min-h-screen"
      style={{ background: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),url(/hero.JPG)", backgroundSize: "cover", }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Your Code Discovery heaven</h1>
          <p className="mb-5">
          A comprehensive resource for code snippets across various programming languages
          </p>
          <Link href="/trending" className="hoverffect btn btn-primary">Explore</Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
