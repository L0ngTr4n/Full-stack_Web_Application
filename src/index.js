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

// app.get("/forgotPassword", (req, res) => {
//   res.render("forgotPassword");
// });

app.get("/newPassword", (req, res) => {
  res.render("newPassword");
});

app.get("/customer", (req, res) => {
  productModel.find()
  .then((products) => res.render("customer", {products}))
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
  res.render("elec_page");
});

app.get("/header", (req, res) => {
  res.render("header");
});




// app.get("/", async (req, res) => {
//   try {
//     // Fetch products from the database using the Product model
//     const products = await productModel.find();

//     // Render an EJS view to display the products
//     res.render("products", { products: products });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     // Handle the error and render an error page or redirect as needed
//   }
// });



//POST

// app.post("/customer_register", async (req, res) => {
//   const { username, email, password, role } = req.body;

//   // Handle the profile picture upload
//   // const profilePicture = req.files.profilePicture;

//   // if (confirm_password != password) {
//   //   alert("Password does not match, enter password again.");
//   // } else {
//     Userinfo.exists({ name: username }).then((result) => {
//       if (result === null) {
//         const newUser = new Userinfo({
//           username: username,
//           password: password,
//           email: email,
//           // telephone: telephone,
//           // role: role,
//           // profilePicture: {
//           //   data: profilePicture.data, // Binary image data
//           //   contentType: profilePicture.mimetype, // MIME type
//           // },
//         });
//         // if (newUser.role == "customer") {
//         //   res.render("customer");
//         // } else if (newUser.role == "vendor") {
//         //   res.render("vendor");
//         // } else {
//         //   res.render("shipper");
//         // }
//         if (username === username)
//         newUser
//           .save()
//           .then(() =>
//             console.log("Inserted user with username: ", req.body.username)
//           )
//           .catch((error) => console.log(error));
//       } else {
//         console.log("user already exists!");
//         res.render("user details already exists");
//       }
//     });
//   // }
// });

app.post("/customer_register", async (req, res) => {
const { username, email, password, address} = req.body;
// if (CustomerInfo.exists({ name: username })) {
//   console.log("user already exists!");
//   res.render("customer_register");
// }
// else{
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
// ShipperInfo.exists({ name: username }).then(() => {
//   console.log("user already exists!");
//   res.render("user details already exists");
// })
  const newShipper = new ShipperInfo({
      username: username,
      password: password,
      email: email,
      dis_hub: dis_hub,
  })
  newShipper.save()
  res.render("shipper_register");
})

app.post("/vendor_register", async (req, res) => {
  const { username, email, password, bus_name, bus_address} = req.body;
// VendorInfo.findOne({ name: username }).then(() => {
//   console.log("user already exists!");
//   res.render("vendor_register");
//   return;
// })
  const newVendor = new VendorInfo({
      username: username,
      password: password,
      email: email,
      bus_address: bus_address,
      bus_name: bus_name,
  })
  newVendor.save();
  res.render("vendor_register");
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

  res.render("Login failed!");
  
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