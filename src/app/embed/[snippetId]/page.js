"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import "@/css/embed.css"

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


import { Ubuntu } from 'next/font/google'
const roboto = Ubuntu({ subsets: ['latin'], weight: '400' })


const EmbedSnippet = ({params}) => {
//   const router = useRouter();
  const { snippetId } = params;
  const [snippet, setSnippet] = useState(null);
  const [snippetCode, setSnippetCode] = useState(null);

  useEffect(() => {
    if (snippetId) {
      // Fetch the snippet from your backend or database using the snippetId
      // This is just a placeholder for demonstration purposes
      const fetchSnippet = async () => {
        fetch(`/api/snippets/get-single-snippet`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ snippetId: snippetId }),
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data.snippet);
              setSnippet(data.snippet);
              let code = data.snippet.code;
              let formattedCode = code.replace(/\\n/g, "\n");
              setSnippetCode(formattedCode);
              Prism.highlightAll();
            });
      };

      fetchSnippet();
    }
  }, [snippetId]);

  useEffect(() => {
    if (snippet) {
      Prism.highlightAll();
    }
  }, [snippet]);

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <div id='main'   ref={(html) => html && Prism.highlightAllUnder(html)} className="w-full h-full flex justify-center items-center ">
      <pre className='w-full'>
        <code className={`my-10 language-${snippet.language?.toLowerCase()}`}>
          {snippetCode}
        </code>
        <p className={`float-right ${roboto.className}`}>Code by <a href='https://codysnippets.vercel.app/' target='_blank'>CodySnippets</a></p>

      </pre>
     
    </div>
  );
};



export default EmbedSnippet;
