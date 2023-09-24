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


