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

