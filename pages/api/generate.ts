import { OpenAIStreamPayload, OpenAIStream } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  bodyParser: false,
};

const handler = async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload = {
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 4000,
  };

  const response = await fetch("https://api.openai.com/v1/completions", {
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    }),
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return res.send({ status: 200, message: data });
};

export default handler;
