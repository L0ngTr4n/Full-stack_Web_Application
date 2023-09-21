// script.js

// Define an array of product objects
const products = [
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp",
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "$790.50"
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp",
      title: "Canon camera 20x zoom, Black color EOS 2000",
      price: "$320.00"
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp",
      title: "Xiaomi Redmi 8 Original Global Version 4GB",
      price: "$120.00"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp",
        title: "Apple iPhone 12 Pro 6.1\" RAM 6GB 512GB Unlocked",
        price: "$120.00"
      },
      {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp",
        title: "Apple Watch Series 1 Sport Case 38mm Black",
        price: "$790.50"
      },
      {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/6.webp",
        title: "T-shirts with multiple colors, for men and lady",
        price: "$120.00"
      },
      {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp",
        title: "Gaming Headset 32db Black built-in mic",
        price: "$99.50"
      },
      {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp",
        title: "T-shirts with multiple colors, for men and lady",
        price: "$120.00"
      }
    // Add more product objects here
  ];
  
  // Function to generate product cards dynamically
  function generateProductCards() {
    const productList = document.getElementById("product-list");
  
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-lg-3", "col-md-6", "col-sm-6", "d-flex");
      productCard.innerHTML = `
        <div class="card w-100 my-2 shadow-2-strong">
          <img src="${product.imgSrc}" class="card-img-top" style="aspect-ratio: 1 / 1" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.price}</p>
            <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <a href="#!" class="btn btn-primary shadow-0 me-1">Add to cart</a>
              <a href="#!" class="btn btn-light border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-secondary px-1"></i></a>
            </div>
          </div>
        </div>
      `;
  
      productList.appendChild(productCard);
    });
  }
  
  // Call the function to generate product cards when the page loads
  window.addEventListener("load", generateProductCards);
  