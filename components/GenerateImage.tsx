import { useState, useEffect, useCallback } from "react";

export default function GenerateImage({
  prompt,
  setLoading,
}: {
  prompt: string;
  setLoading: (state: boolean) => void;
}) {
  const [imageURL, setImageURL] = useState("");

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
  }, [prompt, setLoading]);

  useEffect(() => {
    getGeneratedImage();
  }, [getGeneratedImage]);

  if (imageURL) {
    return (
      <div className="flex flex-center mt-8 rounded-xl border shadow-md h-100 w-100">
        <img src={imageURL} className="w-full h-full" alt="random image"></img>
      </div>
    );
  }
  return <div>Loading...</div>;
}
