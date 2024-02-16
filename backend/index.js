const express = require("express");

const env = require("./config/envConfig");
const connect = require("./config/db");

const app = express();

// Database connection
connect();

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to revibe" });
});

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
