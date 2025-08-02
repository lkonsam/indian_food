// require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const foodRoutes = require("./routes/foodRoutes");
const config = require("./config/config");

const app = express();
const PORT = config.port || 8083;

mongoose.set("strictQuery", true);
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("Error in connecting DB", error));

app.use(cors());
app.use(express.json());

app.use("/api/food", foodRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on Port ${PORT}!`);
});
