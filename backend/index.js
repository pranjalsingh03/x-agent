require("dotenv").config();
const express = require("express");
const twitterRoutes = require("./routes/twitter-routes");

const app = express();
app.use(express.json());

app.use("/api/twitter", twitterRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
