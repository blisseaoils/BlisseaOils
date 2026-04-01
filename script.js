function scrollToProducts() {
  document.getElementById("products").scrollIntoView();
}

let products = [
  {
    name: "Hair Growth Oil",
    price: 230,
    img: "images/menhair.jpg"
  },
  {
    name: "Pain Recovery Roll On",
    price: 156,
    img: "images/pain.jpg"
  },
  {
    name: "Stressless Sleep Oil Blend",
    price: 105,
    img: "images/sleep.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  let container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach((p, i) => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
        <button onclick="addToWishlist(${i})">❤️</button>
      </div>
    `;
  });
}

function addToCart(i) {
  cart.push(products[i]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function addToWishlist(i) {
  alert("Added to wishlist");
}

displayProducts();