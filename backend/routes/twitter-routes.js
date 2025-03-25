const express = require("express");
const { postTweet } = require("../controllers/twitter-controller");

const router = express.Router();

router.post("/tweet", postTweet);

module.exports = router;
