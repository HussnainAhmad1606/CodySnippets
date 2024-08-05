"use client";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import "@/css/add-snippet.css";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
function page() {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");

  const params = useSearchParams();
  const snippetId = params.get("id");

  const updateSnippet = async () => {
    if (title == "" || code == "") {
      toast.error("All fields are required");
      return; 
    }
    const data = {
      snippetId: snippetId,
      title: title,
      category: category,
      language: language,
      code: code
    }
    console.log(data)
    const res = await api.post("/snippets/update-snippet", data);
    console.log(res);
    if (res.data.type == "success") {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };
  
  const getSnippet = async () => {
    const res = await api.post("/snippets/get-single-user-snippet", {
      snippetId: snippetId
    });
    if (res.data.type == "success") {
      setTitle(res.data.snippet.title);
      setCategory(res.data.snippet.category);
      setLanguage(res.data.snippet.language);
      setCode(res.data.snippet.code);
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    getSnippet();
  }, [])
  

  return (
    <div className="min-h-[100vh]">
      <h1 className="my-5 text-3xl font-bold text-center">Add Snippet</h1>

      <div className="flex justify-center items-center flex-col">


        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Snippet Title:</span>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>



        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Pick Snippet Category:</span>
  </div>
  <select value={category} onChange={e=>setCategory(e.target.value)} className="select select-bordered">
    <option value={"Web Development"}>Web Development</option>
    <option value={"Machine Learning/AI"}>Machine Learning/AI</option>
    <option value={"Data Science"}>Data Science</option>
    <option value={"Game Development"} >Game Development</option>
    <option value={"Android Development"}>Android Development</option>
    <option value={"Other"}>Other</option>
  </select>
 
</label>

        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Pick Snippet Language:</span>
  </div>
  <select value={language} onChange={e=>setLanguage(e.target.value)} className="select select-bordered">
    <option value={"JavaScript"}>JavaScript</option>
    <option value={"TypeScript"}>TypeScript</option>
    <option value={"Python"}>Python</option>
    <option value={"Java"} >Java</option>
    <option value={"C"}>C</option>
    <option value={"Cpp"}>C++</option>
    <option value={"Csharp"}>C#</option>
    <option value={"Ruby"}>Ruby</option>
    <option value={"Swift"}>Swift</option>
    <option value={"Kotlin"}>Kotlin</option>
    <option value={"Go"}>Go</option>
    <option value={"Rust"}>Rust</option>
    <option value={"PHP"}>PHP</option>
    <option value={"CSS"}>CSS</option>
    <option value={"Dart"}>Dart</option>
    <option value={"NASM"}>NASM</option>
    <option value={"JSX"}>JSX</option>
    <option value={"TSX"}>TSX</option>
    <option value={"Docker"}>Docker</option>

  </select>
 
</label>



<label className="w-[24%] form-control">
  <div className="label">
    <span className="label-text">Your Code:</span>
  </div>
  <textarea value={code} onChange={e=>setCode(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Your Code"></textarea>

</label>

<button onClick={updateSnippet} className="my-5 btn btn-sm btn-primary">Update Snippet</button>



      </div>
    </div>
  );
}

export default page;
