const express = require("express");
const path = require("path");
const app = express();
const ejs = require ("ejs")
// const mongoose = require("mongoose");


const {
  CustomerInfo,
  VendorInfo,
  ShipperInfo,
  // CustomerModel,
  // VendorModel,
  // ShipperModel,
} = require ("./LoginInfo")

const productModel = require ("./productInfo")

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
  productModel.find()
  .then((products) => res.render("index", {products}))
  .catch((error) => console.log(error.message));
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

app.get("/add_product", (req, res) => {
  res.render("add_product");
});

app.get("/", async (req, res) => {
  try {
    // Fetch products from the database using the Product model
    const products = await productModel.find();

    // Render an EJS view to display the products
    res.render("products", { products: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle the error and render an error page or redirect as needed
  }
});



//POST

app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Handle the profile picture upload
  // const profilePicture = req.files.profilePicture;

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
          // role: role,
          // profilePicture: {
          //   data: profilePicture.data, // Binary image data
          //   contentType: profilePicture.mimetype, // MIME type
          // },
          role: String('customer')
        });
        // if (newUser.role == "customer") {
        //   res.render("customer");
        // } else if (newUser.role == "vendor") {
        //   res.render("vendor");
        // } else {
        //   res.render("shipper");
        // }
        if (username === username)
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

app.post("/vendor_register", async (req, res) => {
  const { username, email, password, bus_name, bus_address} = req.body;
Userinfo.exists({ name: username }).then((result) => {
  console.log("user already exists!");
  res.render("user details already exists");
})
  const newUser = new Userinfo({
      username: username,
      password: password,
      email: email,
      role: 'vendor',
      bus_address: bus_address,
      bus_name: bus_name,
  })
  newUser.save();
})
  // Handle the profile picture upload
  // const profilePicture = req.files.profilePicture;

  // if (confirm_password != password) {
  //   alert("Password does not match, enter password again.");
  // } else {
    
      // 
      // if (result != newUser) {
   
      //   newUser
      //     .save()
      //     .then(() =>
      //       console.log("Inserted user with username: ", req.body.username)
      //     )
      //     .catch((error) => console.log(error));
      // } 
      // else {
        
    
//     });
//     });
// });


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

app.post("/add_product", async (req, res) => {
  const { title, imgSrc, price, link } = req.body;

  // Create a new product document
  const newProduct = new productModel({
    imgSrc: imgSrc,
    title: title,
    price: price,
    link: link,
    // Set other product fields as needed
  });

  // Save the product to the database
  newProduct
    .save()
    .then(() => {
      console.log("Product added:", newProduct);
      res.redirect("/vendor"); // Redirect back to the vendor dashboard
    })
    .catch((error) => {
      console.error(error);
    });
});




//PORT CONNECT
app.listen(port, () => {
  console.log("port connected");
});