const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
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
    unique: true,
  },
  // telephone: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  role: {
    type: String,
    enum: ["customer", "vendor", "shipper"],
  },
});

// Create a CustomerSchema as a discriminator
const CustomerSchema = UserSchema.discriminator("Customer",new mongoose.Schema({
    // Add customer-specific fields here
    address: {
    type: String,
    required: true,
    },
  })
);

// Create a VendorSchema as a discriminator
const VendorSchema = UserSchema.discriminator("Vendor",new mongoose.Schema({
    // Add vendor-specific fields here
    businessName: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
  })
);

// Create a ShipperSchema as a discriminator
const ShipperSchema = UserSchema.discriminator("Shipper",new mongoose.Schema({
    // Add shipper-specific fields here
    distributionHub: {
      type: String,
      enum: ["Ha Noi", "Da Nang", "Ho Chi Minh"],
      required: true,
    },
  })
);



const Userinfo = mongoose.model("UserInfo", UserSchema);
// const CustomerModel = Userinfo.discriminator('customer', customerSchema);
// const VendorModel = Userinfo.discriminator('vendor', vendorSchema);
// const ShipperModel = Userinfo.discriminator('shipper', shipperSchema);

module.exports =  {
  Userinfo,
  // CustomerModel,
  // VendorModel,
  // ShipperModel,
}


