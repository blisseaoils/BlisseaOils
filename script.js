let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  let items = document.getElementById("cart-items");
  let total = 0;

  items.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
    items.appendChild(li);
    total += item.price;
  });

  document.getElementById("cart-count").textContent = cart.length;
  document.getElementById("cart-total").textContent = total;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

/* RAZORPAY PAYMENT */
function payNow() {
  let total = document.getElementById("cart-total").textContent;

  var options = {
    "key": "YOUR_RAZORPAY_KEY",
    "amount": total * 100,
    "currency": "INR",
    "name": "Blissea Oils",
    "description": "Order Payment",
    "handler": function (response){
        alert("Payment Successful!");
    }
  };

  var rzp = new Razorpay(options);
  rzp.open();
}