// const bodyParser = require("body-parser")
const express = require("express");
const path = require("path");
const app = express();
const ejs = require ("ejs")
const LogInCollection = require ("./LoginInfo")
// const mongoose = require ("mongoose")
// const hbs = require("hbs");
const connect = require("../DB connect/mongo");
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../views");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);


//SET

app.set("view engine", "ejs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));

//GET

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});


//POST

app.post("/register", async (req, res) => {
  const { username, email, password, confirm_password, telephone, role } = req.body;

  if (confirm_password != password) {
    alert("Password does not match, enter password again.");
  } else {
    LogInCollection.exists({ name: username }).then((result) => {
      if (result === null) {
        const newUser = new LogInCollection({
          name: username,
          password: password,
          email: email,
          telephone: telephone,
          role: role,
        });
        if (newUser.role == "customer") {
          res.render("customer");
        } else if (newUser.role == "vendor") {
          res.render("index");
        } else {
          res.render("index");
        }
        newUser
          .save()
          .then(() =>
            console.log("Inserted user with username: ", req.body.username)
          )
          .catch((error) => console.log(error));
      } else {
        console.log("user already exists!");
        res.render("user details already exists");
      }
    });
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if a user with the given username and password exists
  LogInCollection.findOne({ name: username, password: password}).then((success) => {
      if (success) {
          // User with matching username and password exists
          // Implement session management or JWT for authentication here

          // For this example, let's just send a success message
          // res.send("Login successful!");
          res.render("index")
      } else {
          // No matching user found; authentication failed
          res.render("login", { error: "Invalid username or password" });
      }
  });
});


//PORT CONNECT
app.listen(port, () => {
  console.log("port connected");
});