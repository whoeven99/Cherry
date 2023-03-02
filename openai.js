const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatCall =(content, temperature = 0, max_tokens = 3000) => {
    return openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: content }],
        temperature,
        max_tokens,
    });
}

module.exports = {
    chatCall
};