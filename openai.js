const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatCall =(content, temperature = 0, max_tokens = 1000) => {
    return openai.createCompletion({
        model: "text-davinci-003",
        prompt: content,
        temperature,
        max_tokens,
    });
}

module.exports = {
    chatCall
};