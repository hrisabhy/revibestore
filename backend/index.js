const express = require("express");
const app = express();

const env = require("./config/envConfig");

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to revibe" });
});

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
