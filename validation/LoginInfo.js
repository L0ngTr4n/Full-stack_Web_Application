const mongoose = require("mongoose");

const logInSchema = new mongoose.Schema({
  name: {
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
  telephone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["customer", "vendor", "shipper"],
  },
});

const LogInCollection = mongoose.model("LogInCollection", logInSchema);

module.exports = LogInCollection;
