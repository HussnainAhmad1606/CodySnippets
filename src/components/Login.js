"use client"
import React, { useState } from "react";
import  toast  from 'react-hot-toast';
import "../css/login.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";

function Login() {
  const {SetIsLogin, SetUsername, SetUserId} = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const logintoAccount = () => {
   if (username == "" || password == "") {
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
   else {
    fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        username: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       
          if (data.type == "success") {
            SetIsLogin(true);
            SetUsername(username);
            SetUserId(data.userId);
            localStorage.setItem("token", data.token);
            localStorage.setItem("refresh_token", data.refreshToken);
            toast.success(data.message);
            router.push("/");
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
      });
   }
  };
  return (
    <div
      className="hero min-h-screen"
      style={{ background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(/login.jpg)", backgroundSize: "cover", }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div id="content" className="flex justify-center items-center flex-col max-w-md">
          <h1 className="text-4xl font-bold">Login to your Account</h1>
        <input value={username} onChange={e=>setUsername(e.target.value)} type="text" placeholder="Username" className="input input-bordered input-primary w-full max-w-xs" />

        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered input-primary w-full max-w-xs" />

        <button className="btn btn-primary" onClick={logintoAccount}>Login</button>


        </div>
      </div>
    </div>
  );
}

export default Login;
