const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, "../.env");
// console.log("Looking for .env at:", envPath);
// console.log("File exists:", fs.existsSync(envPath)); // should be true

dotenv.config({ path: envPath });

// console.log("Loaded MONGODB_URL:", process.env.MONGODB_URL); // should show the URL

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8082,
  // Set mongoose configuration
  mongoose: {
    url:
      process.env.MONGODB_URL +
      (process.env.NODE_ENV === "test" ? "-test" : ""),
    options: {
      //   useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
