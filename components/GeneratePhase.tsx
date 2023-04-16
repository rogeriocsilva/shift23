"use client";

import { useState } from "react";
import GenerateImage from "./GenerateImage";
import Image from "next/image";

import add from "../assets/plus.png"
import redo from "../assets/redo.png"

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
    <div className="flex items-center flex-col gap-6 m-4">
      {!response && (
        <>
          <div className="lg:flex lg:items-center lg:justify-between">
            <p className="mt-2 flex items-center text-sm text-gray-500">Get started by generating a new image from a generated prompt.</p>
          </div>
        </>
      )}
      <div className="mt-5 flex flex-col items-center lg:ml-4 lg:mt-0">
        <div className="flex gap-2">
          <button
            type="button"
            disabled={loading}
            className={
              `inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm
              ${response
                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 border-none'
                : 'bg-sky-metamask text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-metamask'
              }`}
            onClick={generateResponse}
          >
            <Image className="pr-1" src={response ? redo : add} width={20} height={20} alt="Metamask logo" />
            {response ? "Another one" : "Generate image"}
          </button>
          {response && (
            <>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-sky-metamask px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-metamask"
              >
                Save as NFT
              </button>
            </>
          )}
        </div>
        {response && (
          <>
            <div className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mt-12">{response}</div>
            <GenerateImage prompt={response} setLoading={setLoading} />
          </>
        )}
      </div>
    </div>
  );
}
