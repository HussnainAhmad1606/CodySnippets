"use client"

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMsg = async() => {
    if (name == "" || email == "" || message == "") {
      toast.error("All fields are required");
      return;
    }
    console.log("Sending");
    const res = await axios.post("/api/contact", { 
      name: name,
      email: email,
      message: message
  
    })
    if (res.data.type == "success") {
      toast.success(res.data.message);
      setName("");
      setEmail("");
      setMessage("");
    }
    else {
      toast.error(res.data.message);
    }
  }  
  
  return (
    <div className="flex justify-between items-center flex-col min-h-[90vh]">
      <h1 className="my-5 text-3xl font-bold">Contact Us</h1>
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Your Name:</span>
  </div>
  <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

</label>


      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Your Email:</span>
  </div>
  <input  value={email} onChange={e=>setEmail(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />

</label>


<label className="form-control">
  <div className="label">
    <span className="label-text">Your Message:</span>
  </div>
  <textarea  value={message} onChange={e=>setMessage(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Your Message"></textarea>

</label>

<button className="my-10 btn btn-sm btn-primary" onClick={()=> {
  sendMsg();
}}>Send Message</button>
    
    </div>
  );
}