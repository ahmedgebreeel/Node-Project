const http = require("http");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Router = require("./routes/userRoutes.js")
const dotenv = require("dotenv")
const { connect } = require("./db");
app.use(express.json())
dotenv.config({ path: './config.env' })


app.get("/", (req, res) => {
  console.log("Hello", req.url);
  res.send("Welcome")
})

app.use("/user", Router)


connect()

app.listen(process.env.PORT, () => {
  console.log("Hello");
})