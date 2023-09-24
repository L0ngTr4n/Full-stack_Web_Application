const express = require("express");
const path = require("path");
const app = express();
const ejs = require ("ejs")
// const mongoose = require("mongoose");
const {
  Userinfo, 
  // CustomerModel,
  // VendorModel,
  // ShipperModel,
} = require ("./LoginInfo")


const connect = require("../DB connect/mongo");
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../views");
const publicPath = path.join(__dirname, "../asset");
console.log(publicPath);


//SET

app.set("view engine", "ejs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));


//GET
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Route for the customer dashboard
app.get("/register", (req, res) => {
  // Render the customer.html view
  res.render("register");
});

// Route for the vendor dashboard
app.get("/vendor_register", (req, res) => {
  // Render the vendor.html view
  res.render("vendor_register");
});

// Route for the shipper dashboard
app.get("/shipper_register", (req, res) => {
  // Render the shipper.html view
  res.render("shipper_register");
});

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword");
});

app.get("/newPassword", (req, res) => {
  res.render("newPassword");
});

app.get("/customer", (req, res) => {
  res.render("customer");
});
app.get("/vendor", (req, res) => {
  res.render("vendor");
});
app.get("/shipper", (req, res) => {
  res.render("shipper");
});


//POST

app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // if (confirm_password != password) {
  //   alert("Password does not match, enter password again.");
  // } else {
    Userinfo.exists({ name: username }).then((result) => {
      if (result === null) {
        const newUser = new Userinfo({
          username: username,
          password: password,
          email: email,
          // telephone: telephone,
          role: role,
        });
        if (newUser.role == "customer") {
          res.render("customer");
        } else if (newUser.role == "vendor") {
          res.render("vendor");
        } else {
          res.render("shipper");
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
  // }
});


app.post("/login", async (req, res) => {
  const { username, password , role} = req.body;

  // Query the database to find the user by username and password
  Userinfo.findOne({ username: username, password: password })
    .then((user) => {
      if (user) {
        // User with matching username and password exists
        // Check the user's role and redirect accordingly
        if (user.role === "customer") {
          // Redirect to the customer dashboard
          res.redirect("/customer");
        } else if (user.role === "vendor") {
          // Redirect to the vendor dashboard
          res.redirect("/vendor");
        } else if (user.role === "shipper") {
          // Redirect to the shipper dashboard
          res.redirect("/shipper");
        }
      } else {
        // No matching user found; authentication failed
        res.render("login", { error: "Invalid username or password" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.render("error", { message: "Login failed" });
    });
});


//PORT CONNECT
app.listen(port, () => {
  console.log("port connected");
});