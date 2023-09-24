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
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./DB connect/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./validation/index'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});