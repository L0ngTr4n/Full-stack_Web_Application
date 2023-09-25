// Define an array of product objects
const products = [
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp",
        title: "GoPro HERO6 4K Action Camera - Black",
        price: "790.50",
        link: "/electronics",
        quantity: "1",
        productIndex: "1"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp",
        title: "Canon camera 20x zoom, Black color EOS 2000",
        price: "320.00",
        link: "/electronics",
        quantity: "1"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp",
        title: "Xiaomi Redmi 8 Original Global Version 4GB",
        price: "120.00",
        link: "/electronics",
        quantity: "1"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp",
        title: "Apple iPhone 12 Pro 6.1\" RAM 6GB 512GB Unlocked",
        price: "120.00",
        link: "/electronics",
        quantity: "1"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp",
        title: "Apple Watch Series 1 Sport Case 38mm Black",
        price: "790.50",
        link: "/electronics",
        quantity: "1"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/6.webp",
        title: "T-shirts with multiple colors, for men and lady",
        price: "120.00",
        link: "/electronics",
        quantity: "1"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp",
        title: "Gaming Headset 32db Black built-in mic",
        price: "99.50",
        link: "/electronics",
        quantity: "1"
    },
    {
        imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp",
        title: "T-shirts with multiple colors, for men and lady",
        price: "120.00",
        link: "/electronics",
        quantity: "1"
    }
    // Add more product objects here
];

// Function to add a new product
function addProduct(title, price, imgSrc, quantity) {
    products.push({
        title: title,
        price: price,
        imgSrc: imgSrc,
        quantity: quantity,
    });
}

// Function to handle form submission for adding a product
const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const quantity = document.getElementById("quantity").value;

    if (title && price && image && quantity) {
        addProduct(title, price, image, quantity);
        // Clear form fields
        document.getElementById("title").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";
        document.getElementById("quantity").value = "";
        // You can display a success message or update the product list here
        updateProductList();
    } else {
        alert("Please fill in all fields.");
    }
});

// Function to update the product list
function updateProductList() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing product list

    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-lg-3", "col-md-6", "col-sm-6", "d-flex");
        productCard.innerHTML = `
            <div class="card w-100 my-2 shadow-2-strong">
                <img src="${product.imgSrc}" class="card-img-top" style="aspect-ratio: 1 / 1" />
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <p>In Stock: ${product.quantity}</p>
                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <a href="#" class="btn btn-primary shadow-0 me-1" onclick="editProduct(${index})">Edit product</a>
                    </div>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

// Function to handle clicking the "Edit" button for a product
function editProduct(productIndex) {
    const product = products[productIndex];
    console.log("test");

    // Check if the edit form modal exists
    const editModal = document.getElementById("edit-product-modal");
    if (editModal) {
        // Find the elements inside the modal
        const editedTitleInput = editModal.querySelector("#edited-title");
        const editedPriceInput = editModal.querySelector("#edited-price");
        const editedImageInput = editModal.querySelector("#edited-image");
        const editedQuantityInput = editModal.querySelector("#edited-quantity");
        const productIndexInput = editModal.querySelector("#product-index-to-edit");

        // Set values only if the elements are found
        if (editedTitleInput) {
            editedTitleInput.value = product.title;
        }
        if (editedPriceInput) {
            editedPriceInput.value = product.price;
        }
        if (editedImageInput) {
            editedImageInput.value = product.imgSrc;
        }
        if (editedQuantityInput) {
            editedQuantityInput.value = product.quantity;
        }
        if (productIndexInput) {
            productIndexInput.value = productIndex;
        }

        // Display the edit form modal
        editModal.style.display = "block";
    }
}

// Function to handle clicking the "Save Changes" button
function saveChanges() {
    // Get the index of the product being edited from the hidden input field
    const productIndex = parseInt(document.getElementById("product-index-to-edit").value);

    // Retrieve the updated values from the input fields in the edit modal
    const editedTitle = document.getElementById("edited-title").value;
    const editedPrice = document.getElementById("edited-price").value;
    const editedImage = document.getElementById("edited-image").value;
    const editedQuantity = document.getElementById("edited-quantity").value;

    // Update the product in the array with the new values
    if (!isNaN(productIndex) && productIndex >= 0 && productIndex < products.length) {
        const product = products[productIndex];
        product.title = editedTitle;
        product.price = editedPrice;
        product.imgSrc = editedImage;
        product.quantity = editedQuantity;
    }

    // Close the edit modal
    const editModal = document.getElementById("edit-product-modal");
    if (editModal) {
        editModal.style.display = "none";
    }

    // Update the product list to reflect the changes
    updateProductList();
}

// Call the function to update the product list when the page loads
window.addEventListener("load", updateProductList);
