const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(
    "mongodb+srv://L0ngTr4n:longtd2411@test.nemlrfl.mongodb.net/?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });

