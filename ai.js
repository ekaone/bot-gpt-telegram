const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

openai
  .createCompletion({
    model: "text-davinci-003",
    prompt: "What is capital city indonesia?",
    max_tokens: 2048,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
  .then((response) => {
    const generatedText = response.data.choices[0].text;
    console.log(generatedText);
  })
  .catch((error) => {
    console.log(error);
  });
