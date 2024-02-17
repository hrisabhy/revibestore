const express = require("express");
const cors = require("cors");

const env = require("./config/envConfig");
const connect = require("./config/db");

const userRoutes = require("./routes/user/userRoutes");

const app = express();

// Database connection
connect();

// Middleware
app.use(cors());
app.use(express.json());

// user routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to revibe" });
});

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
