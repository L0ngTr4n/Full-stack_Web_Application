// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Nguyen Ha Tuan Nguyen
// Nguyen Hai Nguyen
// Le Ha My
// Tran Duc Long
// Nguyen Minh Hieu
// ID: S3978072
// S3978275
// S3938177
// S3978673
// S3978107
// Acknowledgement: ChatGPT, Claude, bootstrap, w3school.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  // productCode: { 
  //   type: String,
  //   unique: true 
  // },

  title: {
    type: String,
    required: true,
  },
  
  // imagePath: {
  //   type: String,
  //   required: true,
  // },

  imgSrc:{
    type: String,
    required: true,
    unique: true,
  },

  id: {
    type: Number,
    require: true,
  },
  price: {
    type: String,
    required: true,
  },
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  // },
  // manufacturer: {
  //   type: String,
  // },
  // available: {
  //   type: Boolean,
  //   required: true,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// module.exports = mongoose.model("Product", productSchema);
const productModel = mongoose.model("Product", productSchema);
module.exports= productModel;


