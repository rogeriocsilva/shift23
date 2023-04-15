import { useState } from "react";
import Head from "next/head";
import GeneratedImage from "../components/GenerateImage";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      prompt: "the most random picture ever",
    };

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictions(predictions.concat([prediction]));

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPredictions(predictions.concat([prediction]));
    }
  };

  const startOver = async (e) => {
    e.preventDefault();
    setPredictions([]);
    setError(null);
  };

  return (
    <div>
      <Head>
        <title>Inpainting with Stable Diffusion &amp; Replicate</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="container mx-auto p-5">
        {error && <div>{error}</div>}

        <div className="max-w-[512px] mx-auto">
          <button onClick={handleSubmit}>generate</button>

          {predictions.length > 0 &&
            predictions[predictions.length - 1].output && (
              <div className="text-center">
                <GeneratedImage predictions={predictions}></GeneratedImage>
                <button className="lil-button" onClick={startOver}>
                  Start over
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
