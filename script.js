let pass = prompt("Enter Admin Password");

if(pass !== "admin123") {
  document.body.innerHTML = "Access Denied";
}
let cart = [];
let wishlist = [];

const products = [
  {name:"Pain Relief Oil", price:499, img:"images/pain.jpg"},
  {name:"Stressless Sleep", price:599, img:"images/sleep.jpg"},
  {name:"Hair Growth Oil", price:699, img:"images/hair.jpg"}
];

function loadProducts() {
  let container = document.getElementById("products");

  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${p.name}',${p.price})">Cart</button>
        <button onclick="addToWishlist('${p.name}')">❤️</button>
      </div>
    `;
  });
}

function addToCart(name, price) {
  cart.push({name, price});
  displayCart();
}

function displayCart() {
  let list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    list.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
    total += item.price;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

function addToWishlist(name) {
  wishlist.push(name);
  document.getElementById("wishlist-items").innerHTML += `<li>${name}</li>`;
}

function toggleWishlist() {
  document.getElementById("wishlist").classList.toggle("active");
}

// CHECKOUT + FIREBASE + RAZORPAY
function checkout() {

  let name = prompt("Enter Name");
  let phone = prompt("Enter Phone");

  let total = cart.reduce((sum, item) => sum + item.price, 0);

  var options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: total * 100,
    currency: "INR",
    name: "Blissea Oils",
    handler: function () {

      db.collection("orders").add({
        name,
        phone,
        cart,
        total,
        status: "Placed",
        date: new Date()
      }).then(doc => {
        alert("Order placed! ID: " + doc.id);
        cart = [];
        displayCart();
      });

    }
  };

  var rzp = new Razorpay(options);
  rzp.open();
}

// TRACK ORDER
function trackOrder() {
  let id = document.getElementById("track-id").value;

  db.collection("orders").doc(id).get().then(doc => {
    if (doc.exists) {
      alert("Status: " + doc.data().status);
    } else {
      alert("Invalid ID");
    }
  });
}

// REVIEWS
function submitReview() {
  let text = document.getElementById("review-input").value;

  db.collection("reviews").add({
    text,
    date: new Date()
  }).then(loadReviews);
}

function loadReviews() {
  let container = document.getElementById("review-list");
  container.innerHTML = "";

  db.collection("reviews").get().then(snapshot => {
    snapshot.forEach(doc => {
      container.innerHTML += `<p>⭐ ${doc.data().text}</p>`;
    });
  });
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView();
}

loadProducts();
loadReviews();