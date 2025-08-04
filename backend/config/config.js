const dotenv = require("dotenv");

// Load environment variables from .env (only works locally)
dotenv.config();

if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is not defined!");
  process.exit(1); // Stop app if URL is missing
}

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8082,
  mongoose: {
    url:
      process.env.MONGODB_URL +
      (process.env.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
