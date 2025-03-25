const { generateTweet } = require("../services/ai-services");
const { tweetContent } = require("../services/twitter-services");

exports.postTweet = async (req, res) => {
  try {
    const { topic } = req.body;
    const tweet = await generateTweet(topic);
    await tweetContent(tweet);
    res.json({ message: "Tweet posted successfully!", tweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
