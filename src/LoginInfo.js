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
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;


const Customer = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
   
  },
 
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profile_picture: {
    data: Buffer,
    contentType: String
  },
});

const Shipper = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // profilePicture: {
  //   data: Buffer, // Store binary image data
  //   contentType: String, // Store the MIME type (e.g., 'image/jpeg', 'image/png')
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dis_hub: {
    type:String,
    enum: ['Ha Noi','Da Nang','Ho Chi Minh']
  }
});


const Vendor = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // profilePicture: {
  //   data: Buffer, // Store binary image data
  //   contentType: String, // Store the MIME type (e.g., 'image/jpeg', 'image/png')
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bus_name: {
    type: String,
    required: true,
    unique: true,
  },
  bus_address: {
    type: String,
    required: true,
    unique: true,
  },
  
});





const CustomerInfo = mongoose.model("customer", Customer);
const VendorInfo = mongoose.model("vendor", Vendor);
const ShipperInfo = mongoose.model("shipper", Shipper);
// const CustomerModel = Userinfo.discriminator('customer', customerSchema);
// const VendorModel = Userinfo.discriminator('vendor', vendorSchema);
// const ShipperModel = Userinfo.discriminator('shipper', shipperSchema);

module.exports =  {
  CustomerInfo,
  VendorInfo,
  ShipperInfo,
  // CustomerModel,
  // VendorModel,
  // ShipperModel,
}


