import { Configuration, OpenAIApi } from "openai";

export const config = {
  bodyParser: false,
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (req, res) => {
  if (!req.body.prompt)
    return res
      .status(400)
      .json({ message: "Pass in prompt field for phrase generation" });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: req.body.prompt,
      },
    ],
  });
  if (!response.data) throw new Error("Unable to get phrase");

  return res.status(200).json({
    message: response.data.choices[0].message?.content,
  });
};

export default handler;
