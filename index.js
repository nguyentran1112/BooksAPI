//import packages
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
let bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/book");
dotenv.config();
//connect Database

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
  console.log("Database_URL", process.env.MONGODB_URL);
});
//code app
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan());
app.use("/v1/author", authorRouter);
app.use("/v1/book", bookRouter);
app.get("/", (req, res) => {
  res.send("home");
});
//const port = 3333;
//const host = '0.0.0.0';
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

