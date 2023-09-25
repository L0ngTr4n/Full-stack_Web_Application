const products = [
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp",
        title: "GoPro HERO6 4K Action Camera - Black",
        price: "$790.50",
        link: "productpage.html"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp",
        title: "Canon camera 20x zoom, Black color EOS 2000",
        price: "$320.00",
        link: "productpage.html"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp",
        title: "Xiaomi Redmi 8 Original Global Version 4GB",
        price: "$120.00",
        link: "productpage.html"
    },
    // Add more products here...
];

function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("card", "border", "shadow-none");

    // Create the product card's content
    productCard.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-start border-bottom pb-3">
                <div class="me-4">
                    <img src="${product.imgSrc}" alt="${product.title}" class="avatar-lg rounded">
                </div>
                <div class="flex-grow-1 align-self-center overflow-hidden">
                    <div>
                        <h5 class="text-truncate font-size-18">
                            <a href="${product.link}" class="text-dark">${product.title}</a>
                        </h5>
                    </div>
                </div>
                <div class="flex-shrink-0 ms-2">
                    <ul class="list-inline mb-0 font-size-16">
                        <li class="list-inline-item">
                            <a href="#" class="text-muted px-1" onclick="removeProduct('${product.title}')">
                                <i class="mdi mdi-trash-can-outline"></i> Remove
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="row my-4">
                        <div class="col-sm-6">
                            <p class="text-muted mb-2">Price</p>
                            <h5 class="mb-0 mt-2">${product.price}</h5>
                        </div>
                        <div class="col-sm-6">
                            <div class="text-sm-end mt-2 mt-sm-0">
                                <a href="ecommerce-checkout.html" class="btn btn-success">
                                    <i class="mdi mdi-cart-outline me-1"></i>Add to Cart
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return productCard;
}

// Function to remove a product by title
function removeProduct(title) {
    const productIndex = products.findIndex((product) => product.title === title);
    if (productIndex !== -1) {
        products.splice(productIndex, 1); // Remove the product from the array
        updateProductList(); // Update the product list to reflect the removal
    }
}

function populateProductList() {
    const productListContainer = document.getElementById("product-list");

    products.forEach((product) => {
        const productCard = createProductCard(product);
        productListContainer.appendChild(productCard);
    });
}

window.onload = populateProductList;
