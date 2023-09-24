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
  // profilePicture: {
  //   data: Buffer, // Store binary image data
  //   contentType: String, // Store the MIME type (e.g., 'image/jpeg', 'image/png')
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  }
  
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

// // Create a CustomerSchema as a discriminator
// const CustomerSchema = UserSchema.discriminator("Customer",new mongoose.Schema({
//     // Add customer-specific fields here
//     address: {
//     type: String,
//     required: true,
//     },
//   })
// );

// // Create a VendorSchema as a discriminator
// const VendorSchema = UserSchema.discriminator("Vendor",new mongoose.Schema({
//     // Add vendor-specific fields here
//     businessName: {
//       type: String,
//       required: true,
//     },
//     businessAddress: {
//       type: String,
//       required: true,
//     },
//   })
// );

// // Create a ShipperSchema as a discriminator
// const ShipperSchema = UserSchema.discriminator("Shipper",new mongoose.Schema({
//     // Add shipper-specific fields here
//     distributionHub: {
//       type: String,
//       enum: ["Ha Noi", "Da Nang", "Ho Chi Minh"],
//       required: true,
//     },
//   })
// );



const CustomerInfo = mongoose.model("customer", Customer);
const VendorInfo = mongoose.model("vendor", Vendor);
const ShipperInfo = mongoose.model("UserInfo", Shipper);
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


