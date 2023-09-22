const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect(
    "mongodb+srv://hmyle:C6lrHMWYYDO2K5Bz@cluster0.sujlcna.mongodb.net/?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'vendor','shipper'],
  }
});

const LogInCollection = new mongoose.model("LogInCollection", logInSchema);
module.exports = LogInCollection;
