"use client";

import { useState } from "react";
import GenerateImage from "./GenerateImage";

const PROMPT =
  "Give me a random phrase that generates a beautiful image with a maximum of 20 words";

export default function GeneratePhrase() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const generateResponse = async () => {
    setLoading(true);
    const apiResponse = await fetch("/api/generate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: PROMPT,
      }),
    });

    const response = await apiResponse.json();
    setResponse(response.message);
  };

  return (
    <div className="w-full max-w-xl">
      <button
        disabled={loading}
        className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
        onClick={generateResponse}
      >
        {response ? "Another one" : "Generate image"}
      </button>
      {response && (
        <>
          <div>{response}</div>
          <GenerateImage prompt={response} setLoading={setLoading} />
          <button className="bg-sky-500 hover:bg-emerald-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200">
            Save as NFT
          </button>
        </>
      )}
    </div>
  );
}
