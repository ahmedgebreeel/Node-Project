const http = require("http");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Router = require("./routes/userRoutes.js")
const dotenv = require("dotenv")
const { connect } = require("./db");
const cors = require('cors');

app.use(cors());

app.use(express.json())
dotenv.config({ path: './config.env' })


app.get("/", (req, res) => {
  console.log("Hello", req.url);
  res.send("Welcome")
})

app.use("/user", Router);

app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});


connect()

app.listen(process.env.PORT, () => {
  console.log("Hello");
})