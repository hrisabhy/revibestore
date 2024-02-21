const mongoose = require("mongoose");
const env = require("./envConfig");
const connect = async () => {
  try {
    await mongoose.connect(env.URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Db connection established");
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};

module.exports = connect;
