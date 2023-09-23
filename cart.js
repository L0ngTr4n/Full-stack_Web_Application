// Initialize an array to store product data
const products = [];

// Function to add a new product to the array and the DOM
function addProduct(name, price, quantity) {
    // Create a unique ID for the product
    const productId = `product${products.length + 1}`;

    // Add the product to the array
    products.push({
        id: productId,
        name: name,
        price: price,
        quantity: quantity,
    });

    // Create a new product element
    const productElement = document.createElement('div');
    productElement.className = 'card border shadow-none';
    productElement.id = productId; // Set the ID
    productElement.innerHTML = `
    
<!-- Product Content -->
<div class="card-body">
  <div class="d-flex align-items-start border-bottom pb-3">
    <div class="me-4">
      <img src="https://www.bootdey.com/image/380x380/008B8B/000000" alt class="avatar-lg rounded">
    </div>
    <div class="flex-grow-1 align-self-center overflow-hidden">
      <div>
        <h5 class="text-truncate font-size-18">${name}</h5>
      </div>
    </div>
    <div class "flex-shrink-0 ms-2">
      <ul class="list-inline mb-0 font-size-16">
        <li class="list-inline-item">
          <a href="#" class="text-muted px-1" onclick="removeProduct('${productId}')">
            <i class="mdi mdi-trash-can-outline"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <!-- Quantity Selector -->
  <div class="row">
    <div class="col-md-4">
      <div class="mt-3">
        <p class="text-muted mb-2">Price</p>
        <h5 class="mb-0 mt-2">$${price}</h5>
      </div>
    </div>
    <div class="col-md-5">
    <div class="mt-3">
        <p class="text-muted mb-2">Quantity</p>
        <input type="number" class="form-control form-control-sm w-xl" id="quantity${productId}" min="1" max="99" value="${quantity}" oninput="validateQuantityInput(this, '${productId}')" onkeypress="return isNumberKey(event)">
    </div>
</div>
    <div class="col-md-3">
      <div class="mt-3">
        <p class="text-muted mb-2">Total</p>
        <h5 id="totalPrice${productId}">$${(price * quantity).toFixed(2)}</h5>
      </div>
    </div>
  </div>
</div>
  `;

    // Append the product to the product container
    document.getElementById('productContainer').appendChild(productElement);
    updateOrderSummary(); // Update the summary when adding a product
}

// Function to validate quantity input
function validateQuantityInput(input, productId) {
    let value = input.value;
    // Ensure the value is a number and within the desired range
    if (isNaN(value) || value < 1 || value > 99) {
        // If the input is invalid, reset it to 1
        input.value = 9;
        value = 9;
    }
    // Update the total
    updateTotal(productId);
}

// Function to restrict input to numbers only
function isNumberKey(event) {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow only numbers (0-9) and prevent other characters
    return charCode >= 48 && charCode <= 57;
}


// Function to update the total price based on quantity
function updateTotal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const quantity = parseInt(document.getElementById(`quantity${productId}`).value, 10);
        if (!isNaN(quantity) && quantity >= 1 && quantity <= 99) {
            const total = product.price * quantity;
            document.getElementById(`totalPrice${productId}`).textContent = `$${total.toFixed(2)}`;
        } else {
            // Handle invalid input, e.g., show an error message
        }
    }
}
// Function to remove a product from the array and the DOM
function removeProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
        const productElement = document.getElementById(productId);
        productElement.remove();
        updateOrderSummary(); // Update the summary after removing a product
    }
}

// summary table part

// Variables to store dynamic values
let subTotal = 0;
let discount = 0;
var shippingCharge = 0;
const taxRate = 0.10; // 10% tax rate

// Function to update the shipping charge
function updateShippingCharge() {
    const location = document.getElementById('location').value;

    // Remove the 'let' declaration to update the global shippingCharge variable
    switch (location) {
        case 'Da Nang':
            shippingCharge = 2; // Set the shipping charge for Da Nang
            break;
        case 'Hanoi':
            shippingCharge = 5; // Set the shipping charge for Hanoi
            break;
        case 'Ho Chi Minh':
            shippingCharge = 10; // Set the shipping charge for Ho Chi Minh
            break;
        case 'Others':
            shippingCharge = 20; // Set the shipping charge for Others
            break;
    }
    // Update the displayed shipping charge in your summary
    document.getElementById('shippingCharge').textContent = `$ ${shippingCharge.toFixed(2)}`;

    // After updating the shipping charge, make sure to call your updateOrderSummary() function to recalculate the total.
    updateOrderSummary();
}

// Function to update the order summary
function updateOrderSummary() {
    let subTotal = 0;

    for (const product of products) {
        subTotal += product.price * product.quantity;
    }

    const totalBeforeTax = subTotal - discount + shippingCharge;
    const tax = totalBeforeTax * taxRate;
    const total = totalBeforeTax + tax;

    document.getElementById('subTotal').textContent = `$ ${subTotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `- $ ${discount.toFixed(2)}`;
    document.getElementById('shippingCharge').textContent = `$ ${shippingCharge.toFixed(2)}`;
    document.getElementById('tax').textContent = `$ ${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$ ${total.toFixed(2)}`;
}

// Example: Adding a product
addProduct('Wireless Bluetooth Earbuds', 80, 1); // Product name, price, and quantity
addProduct('Smartwatch with Heart Rate Monitor', 120, 1); // Product name, price, and quantity
addProduct('Laptop Backpack', 50, 1); // Product name, price, and quantity

