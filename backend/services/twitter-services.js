const { TwitterApi } = require("twitter-api-v2");
const config = require("../config/config");

const client = new TwitterApi(config.twitter);
const twitterClient = client.readWrite;
const twitterBearer = client.readOnly;

exports.tweetContent = async (content) => {
  try {
    await twitterClient.v2.tweet(content);
    console.log("Tweet posted:", content);
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
};
