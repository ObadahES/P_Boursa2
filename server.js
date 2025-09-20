/********************************************************************** */
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");
const _ = require("lodash");
const app = express();
require("dotenv").config();

/********************************************************************** */
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(" Server Is Working On " + port + " ... "));
/********************************************************************** */
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
// app.use("/api", require("./Routes/Routes"));
app.get("/", (req, res) => {
  res.send("Server is up 🚀");
});
