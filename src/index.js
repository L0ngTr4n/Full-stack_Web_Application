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

const express = require("express");
const path = require("path");
const app = express();
const ejs = require ("ejs");

const {
  CustomerInfo,
  VendorInfo,
  ShipperInfo,
} = require ("./LoginInfo")

const productModel = require ("./productInfo")

const connect = require("../DB connect/mongo");
const port = process.env.PORT || 3002;
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
app.get("/customer_register", (req, res) => {
  // Render the customer.html view
  res.render("customer_register");
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

app.get("/newPassword", (req, res) => {
  res.render("newPassword");
});

app.get("/customer", (req, res) => {
  productModel.find()
  .then((products) => {
    console.log(products);
    res.render("customer", {products});})
  .catch((error) => console.log(error.message));
});

app.get("/vendor", (req, res) => {
  res.render("vendor");
});

app.get("/shipper", (req, res) => {
  const orders = [
    {
      products: ['Electronic device 1', 'Electronic device 2', 'Electronic device 3'],
      price: 250,
      address: 'RMIT University' 
    },
    {
      products: ['Household good 1', 'Household good 2', 'Household good 3'],
      price: 100,
      address: 'RMIT University' 
    },
    {
      products: ['Household good 4', 'Household good 5', 'Household good 6'],
      price: 310,
      address: 'RMIT University' 
    },
  ]
  
  res.render("shipper", {orders});
});

app.get("/add_product", (req, res) => {
  res.render("add_product");
});


app.get('/product/:id', (req, res) => {
  productModel.findOne({id: req.params.id})
  .then((product) => {
    console.log(product);
    if (!product) {
      return res.send("Cannot found that ID!");
    }
    res.render('electronics', {product: product});
  })
  .catch((error) => res.send(error));
});


app.get("/footer", (req, res) => {
  res.render("footer");
});

app.get("/elec_page", (req, res) => {
  productModel.find()
  .then((products) => res.render("elec_page", {products}))
  .catch((error) => console.log(error.message));
});

app.get("/header", (req, res) => {
  res.render("header");
});
app.get("/electronics", (req, res) => {
  res.render("electronics");
});




//POST

app.post("/customer_register", async (req, res) => {
const { username, email, password, address} = req.body;

  const newCustomer = new CustomerInfo({
      username: username,
      password: password,
      email: email,
      address: address,
  })
  newCustomer.save();
  res.render("customer");
// }
})

app.post("/shipper_register", async (req, res) => {
  const { username, email, password, dis_hub} = req.body;

  const newShipper = new ShipperInfo({
      username: username,
      password: password,
      email: email,
      dis_hub: dis_hub,
  })
  newShipper.save()
  res.render("shipper");
})

app.post("/vendor_register", async (req, res) => {
  const { username, email, password, bus_name, bus_address} = req.body;
  
  const newVendor = new VendorInfo({
      username: username,
      password: password,
      email: email,
      bus_address: bus_address,
      bus_name: bus_name,
  })
  newVendor.save();
  res.render("vendor");
})



app.post("/login", async (req, res) => {
  const {username, password} = req.body;

  let customer = await CustomerInfo.findOne({ username, password });

  if(customer) {
    console.log(customer);
    res.redirect("/customer");
    return;
  }

  let vendor = await VendorInfo.findOne({ username, password });
  
  if(vendor) {
    console.log(vendor);
    res.redirect("/vendor"); 
    return;
  }

  let shipper = await ShipperInfo.findOne({ username, password });

  if(shipper) {
    console.log(shipper);
    res.redirect("/shipper");
    return; 
  }

  res.send("validation failed");
  
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

app.get("/shopping_cart", (req,res) => {
  res.render("shopping_cart");
})

app.get("/wishlist", (req,res) => {
  res.render("wishlist");
})



//PORT CONNECT
app.listen(port, () => {
  console.log("port connected");
});