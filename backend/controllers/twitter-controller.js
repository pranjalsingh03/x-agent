const cron = require("node-cron");
const { generateTweet } = require("../services/ai-services");
const { tweetContent } = require("../services/twitter-services");

const topics = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Data Structures and Algorithms",
  "Cybersecurity",
  "Blockchain Technology",
  "Quantum Computing",
  "Cloud Computing",
  "Big Data Analytics",
  "Computer Vision",
  "Internet of Things (IoT)",
  "Software Development Best Practices",
  "Microservices Architecture",
  "Edge Computing",
  "Augmented Reality and Virtual Reality",
  "Human-Computer Interaction",
  "Database Management Systems",
  "Operating Systems Concepts",
  "Distributed Computing",
  "Web Development Trends",
  "Programming Paradigms",
  "Compiler Design",
  "Networking and Protocols",
  "DevOps and Continuous Integration",
  "Ethical Hacking and Penetration Testing",
  "Embedded Systems",
  "Robotics and Automation",
  "Graph Theory in Computer Science",
  "Digital Signal Processing",
];

const getRandomTopic = () => {
  return topics[Math.floor(Math.random() * topics.length)];
};

const postTweet = async () => {
  try {
    const topic = getRandomTopic();
    const tweet = await generateTweet(topic);
    await tweetContent(tweet);
    console.log("Tweet posted successfully!", tweet);
  } catch (error) {
    console.error("Error posting tweet:", error.message);
  }
};

cron.schedule("0 * * * *", () => {
  console.log("Running scheduled tweet post...");
  postTweet();
});

module.exports = { postTweet };
