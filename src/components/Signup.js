"use client";
import Link from "next/link";
import React, { useState } from "react";
import "../css/login.css";
import { toast } from "react-toastify";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {
    console.log("Creating account...");
   if (email == "" || username == "" || password == "") {
    toast.error("Fill all fields to create your account.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
   }
   else if (username.indexOf(" ") != -1){
    alert("Username should not include a space.")
  }
   else {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        isBlocked: false,
        isAdmin: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorCode == 11000) {
          // User already exist with this username
          toast.error("A User already exist with username you provided. Please enter another username.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        } else {
          if (data.type == "success") {
            toast.success(data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          else {
            toast.error(data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
          }
        }
      });
   }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(/login.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div
          id="content"
          className="flex justify-center items-center flex-col max-w-md"
        >
          <h1 className="text-4xl font-bold">Create an Account</h1>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered input-primary w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered input-primary w-full max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary" onClick={createAccount}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
