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
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "title",
  },
});

module.exports = mongoose.model("Category", categorySchema);
