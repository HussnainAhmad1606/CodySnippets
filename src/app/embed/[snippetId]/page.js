"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const EmbedSnippet = ({params}) => {
//   const router = useRouter();
  const { snippetId } = params;
  const [snippet, setSnippet] = useState(null);
  const [snippetCode, setSnippetCodeW] = useState(null);

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
              console.log(data.snippet);
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
    <div className="flex justify-center items-center">
      <pre>
        <code className={`my-10 language-${snippet.language?.toLowerCase()}`}>
          {snippet.code}
        </code>
      </pre>
      <div className="text-center mt-4">
        <p>Embedded by Your Name</p>
      </div>
    </div>
  );
};

export default EmbedSnippet;
