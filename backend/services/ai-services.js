const axios = require("axios");
const config = require("../config/config");

const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limit exceeded. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

exports.generateTweet = async (topic) => {
  if (!topic || typeof topic !== "string") {
    throw new Error("Invalid or missing topic");
  }

  const generate = async () => {
    const response = await axios.post(
      process.env.OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Generate an engaging tweet about ${topic}.` }],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_TOKEN}` },
      }
    );
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  };

  try {
    return await retryWithBackoff(generate);
  } catch (error) {
    console.error("Error generating tweet:", error);
    throw error;
  }
};