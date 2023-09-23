// Initialize an array to store product data
const products = [];

// Function to add a new product to the array and the DOM
function addProduct(name, price) {
    // Create a unique ID for the product
    const productId = `product${products.length + 1}`;

    // Add the product to the array
    products.push({
        id: productId,
        name: name,
        price: price,
        quantity: 1,
    });

    // Create a new product element
    const productElement = document.createElement('div');
    productElement.className = 'card border shadow-none';
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
        <div class="flex-shrink-0 ms-2">
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
            <div class="d-inline-flex">
              <select class="form-select form-select-sm w-xl" id="quantity${productId}" onchange="updateTotal('${productId}')">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="mt-3">
            <p class="text-muted mb-2">Total</p>
            <h5 id="totalPrice${productId}">$${price}</h5>
          </div>
        </div>
      </div>
    </div>
  `;

    // Append the product to the product container
    document.getElementById('productContainer').appendChild(productElement);
}



// Function to update the total price based on quantity
function updateTotal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const quantity = document.getElementById(`quantity${productId}`).value;
        const total = product.price * quantity;
        document.getElementById(`totalPrice${productId}`).textContent = `$${total.toFixed(2)}`;
    }
}

// Function to remove a product from the array and the DOM
function removeProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
        const productElement = document.getElementById(productId);
        productElement.remove();
    }
}

// Example: Adding a product
addProduct('Waterproof Mobile Phone', 450);
addProduct('Smartphone Dual Camera', 240);
addProduct('Black Colour Smartphone', 950);

// summary table part

// Variables to store dynamic values
let subTotal = 0;
let discount = 0;
let shippingCharge = 0;
const taxRate = 0.10; // 10% tax rate

// Function to update the order summary
function updateOrderSummary() {
  const totalBeforeTax = subTotal - discount + shippingCharge;
  const tax = totalBeforeTax * taxRate;
  const total = totalBeforeTax + tax;

  document.getElementById('subTotal').textContent = `$ ${subTotal.toFixed(2)}`;
  document.getElementById('discount').textContent = `- $ ${discount.toFixed(2)}`;
  document.getElementById('shippingCharge').textContent = `$ ${shippingCharge.toFixed(2)}`;
  document.getElementById('tax').textContent = `$ ${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `$ ${total.toFixed(2)}`;
}

// Function to update the shipping charge based on the selected location
function updateShippingCharge(location) {
  // You can add your logic here to calculate shipping charges based on location
  // For now, we'll set it to a random value between 10 and 50.
  shippingCharge = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

  document.getElementById('shippingCharge').textContent = `$ ${shippingCharge.toFixed(2)}`;
  updateOrderSummary();
}

// Example: Adding a product
function addProductToSummary(price) {
  subTotal += price;
  updateOrderSummary();
}

// Example: Applying a discount when a valid voucher code is entered
function applyDiscount(voucherCode) {
  if (voucherCode === 'DS2003') {
    discount = 50; // Adjust the discount value as needed
    updateOrderSummary();
  }
}
