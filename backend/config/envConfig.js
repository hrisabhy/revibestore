require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  URL: process.env.URL,
  JWT_SECRET: process.env.JWT_SECRET,
  RAZOR_KEYID: process.env.RAZOR_KEYID,
  RAZOR_SECRET: process.env.RAZOR_SECRET,
};
