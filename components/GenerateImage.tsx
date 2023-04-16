import { useEffect, useCallback } from "react";

import Image from "next/image";

export default function GenerateImage({
  prompt,
  setLoading,
  setImageURL,
  imageURL,
}: {
  prompt: string;
  setLoading: (state: boolean) => void;
  setImageURL: (state: string) => void;
  imageURL?: string;
}) {
  const getGeneratedImage = useCallback(async () => {
    const response = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const imageResponse = await response.json();
    setImageURL(imageResponse.imageURL);
    setLoading(false);
  }, [prompt, setImageURL, setLoading]);

  useEffect(() => {
    getGeneratedImage();
  }, [getGeneratedImage]);

  if (imageURL) {
    return (
      <div className="flex flex-center mt-8 rounded-xl border shadow-md h-100 w-100">
        <Image
          className="bg-slate-200 rounded-xl"
          src={imageURL}
          width={384}
          height={384}
          alt={prompt}
        />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-center mt-8 rounded-xl border shadow-md w-96 h-96 bg-slate-200"></div>
      <p className="mt-2 flex items-center text-sm text-gray-500">
        Loading your image.
      </p>
    </>
  );
}
