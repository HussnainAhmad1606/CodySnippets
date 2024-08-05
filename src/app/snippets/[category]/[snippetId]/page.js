"use client";
import { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

import { format } from "timeago.js";
import CommentCard from "@/components/CommentCard";
import api from "@/utils/api";

import "prismjs/components/prism-markup-templating";
// Language Syntax Hightlighting
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-java";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-nasm";
import "prismjs/components/prism-go";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-arduino";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-php";

import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "@/css/prism-theme.css";
import "@/css/custom-prism-theme.css";

import {  generateChatId } from "@/utils/utils";


// Importing Icons
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidTime } from "react-icons/bi";
import { BsCodeSlash } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import {IoSend} from "react-icons/io5";
import { TbArrowBigDown } from "react-icons/tb";
import { TbArrowBigDownFilled } from "react-icons/tb";

import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { BiComment } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import { useUserStore } from "@/store/store";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function Home({ params }) {
  const [snippet, setSnippet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snippetCode, setSnippetCode] = useState(``);
  const [isFavourite, setIsFavourite] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [link, setLink] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { snippetId } = params;
  const codeRef = useRef(null);
  const [embedCode, setEmbedCode] = useState("");
  const [chatId, setChatId] = useState("");


;

  const {UserId} = useUserStore();


  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightAllUnder(codeRef.current);
    }
  }, [snippetCode]);


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
  
    } catch (err) {
      toast.error('Failed to copy!');
    }
  };

  const getAuthorId = async(username) => {
    console.log("Getting Author Id")
    const response = await axios.post("/api/users/get-author-id", {
      username: username
    })

    if (response.data.type == "success") {
      setAuthorId(response.data.user._id);

      const ChatId = generateChatId(UserId, response.data.user._id);
      setChatId(ChatId);

      console.log(response.data);
    }
    else {
      toast.error(response.data.message);
    }
  }

  const generateEmbedCode = (snippetId) => {
    return `<iframe src="${window.location.origin}/embed/${snippetId}" width="600" height="400"></iframe>`;
  };


  const handleGenerateEmbedCode = async() => {
    const code = generateEmbedCode(snippetId);
    setEmbedCode(code);
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Embed Code copied to clipboard!');
  
    } catch (err) {
      toast.error('Failed to make Embed code');
    }
  };


  const addComment = async() => {
    const data = {
      body: comment,
      snippetId: snippetId
    }

  try {
    const response = await api.post("/comments/add-comment", data);


    if (response.data.type == "success") {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  catch(error) {
    console.log(error.response.data.message)
    toast.error(error.response.data.message)
  }
  }


  const addToFavourite = async() => {
    const data = {
      userId: UserId,
      snippetId: snippetId
    }

  try {
    const response = await api.post("/favourites/add-to-favourite", data);


    if (response.data.type == "success") {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  catch(error) {
    console.log(error.response.data.message)
    toast.error(error.response.data.message)
  }
  }
const getSingleSnippet = async() => {
  fetch(`/api/snippets/get-single-snippet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ snippetId: snippetId, userId: UserId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setSnippet(data.snippet);
      getAuthorId(data.snippet.author);
      setIsFavourite(data.favourite);
      let code = data.snippet.code;
      let formattedCode = code.replace(/\\n/g, "\n");
      setSnippetCode(formattedCode);
      setIsLoading(false);
      Prism.highlightAll();
    });
}


const getComments = async() => {
  const response = await axios.post("/api/comments/get-comments", {
    snippetId: snippetId
  })


  if (response.data.type == "success") {
    setComments(response.data.comments)
  }
  else {
    toast.error(response.data.message)
  }
}
  useEffect(() => {
    getSingleSnippet();
    getComments();
    
  }, []);

  return (
    <>
    <div
      className="flex items-center flex-col"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* Breadcrumb start */}
      {/* <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/explore">Snippets</Link>
          </li>
          <li>
            <Link
              href={`/categories/${snippet.category
                ?.toLowerCase()
                .replaceAll(" ", "-")}`}
            >
              {snippet.category}
            </Link>
          </li>
          <li>{snippet.title}</li>
        </ul>
      </div> */}

      <h1 className="my-10 text-4xl text-center font-bold">{snippet.title}</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
        </div>
      ) : (
        <div
          ref={(html) => html && Prism.highlightAllUnder(html)}
          className="flex justify-center items-center "
        >
          <pre>
            <code
              className={`my-10 language-${snippet.language?.toLowerCase()}`}
            >
              {snippetCode}
            </code>
          </pre>
        </div>
      )}

      <div className="flex justify-between w-[60%] items-center gap-10">
        



        {/* left side */}

        <div className="flex justify-center items-center">
        <div className="bg-gray-300 bg-opacity-0 p-1 rounded-3xl flex justify-center items-center border-none rounded-2xl bg-gray-300 bg-opacity-10">
       

              <button><TbArrowBigUp className="text-2xl" /></button>
              <p className="mx-2">10</p>
              <button><TbArrowBigDown className="text-2xl" /></button>
          
        </div>

        <div className="bg-gray-300 bg-opacity-0 p-2 rounded-3xl flex justify-center items-center">
          <details  onClick={()=>document.getElementById('comments').showModal()}  className="dropdown">
            <summary className="btn btn-sm border-none rounded-2xl bg-gray-300 bg-opacity-10">
              <BiComment className="text-2xl" />
              <p>{comments.length}</p>
            </summary>
           
          </details>
        </div>

        <div className="bg-gray-300 bg-opacity-0 p-2 rounded-3xl flex justify-center items-center">
          <details className="dropdown">
            <summary className="btn btn-sm border-none rounded-2xl bg-gray-300 bg-opacity-10">
              <FaShare className="text-2xl" />
              Share
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2">
              <li>
                <button onClick={copyToClipboard}>Copy URL</button>
              </li>
              <li>
                <button onClick={handleGenerateEmbedCode}>Embed Code</button>
              </li>
            </ul>
          </details>
        </div>


        </div>




        {/* Right side */}

        
        <div className="bg-gray-300 bg-opacity-0 p-2 rounded-3xl flex justify-center items-center">
          <details onClick={addToFavourite} className="dropdown">
            <summary className="btn btn-sm border-none rounded-2xl bg-gray-300 bg-opacity-10">
              {
                isFavourite?(
              <FaStar className="text-2xl" />
              ):(
                <FaRegStar className="text-2xl" />
                )
              }
              20
            </summary>
        
          </details>
        </div>
      
      </div>

      <h1 className="text-center my-10 font-bold text-3xl">Snippet Details</h1>

      {isLoading ? (
        ""
      ) : (
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="stats shadow">
            <div className="stat flex justify-center items-center flex-col">
              <div className="stat-value">
                <BsFillPersonFill />
              </div>
              <div className="stat-title">{snippet.author} </div>
              <div className="stat-title"><Link className="btn btn-sm btn-neutral" href={`/chat/${chatId}`}>Chat</Link></div>
            </div>
          </div>

          <div className="stats shadow">
            <div className="stat flex justify-center items-center flex-col">
              <div className="stat-value">
                <BiSolidTime />
              </div>
              <div className="stat-title">{format(snippet.createdAt)}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat flex justify-center items-center flex-col">
              <div className="stat-value">
                <BsCodeSlash />
              </div>
              <div className="stat-title">{snippet.language}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat flex justify-center items-center flex-col">
              <div className="stat-value">
                <BiSolidCategory />
              </div>
              <div className="stat-title">{snippet.category}</div>
            </div>
          </div>
        </div>
      )}
    </div>
    <dialog id="comments" className="modal">
  <div className="modal-box">
    <h3 className="my-5 font-bold text-lg">Add New Comment</h3>
    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
     
 
    <div>

<input
type="text"
placeholder="Type Comment Here"
value={comment}
onChange={e=>setComment(e.target.value)}
className="mx-5 input input-primary w-full max-w-xs" />

<button onClick={addComment} className='btn btn-primary'>
<IoSend/>
</button>
</div>
    <h3 className="my-5 font-bold text-lg">Comments ({comments.length})</h3>
    {
      comments.map((comment,index)=> {
        return <CommentCard createdAt={comment.createdAt} body={comment.body} username={comment.author} key={index}/>
      })
    }
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  );
}
