let products = [
  {name:"Men Hair Oil", price:699, img:"images/menhair.jpg"},
  {name:"Sleep Oil", price:599, img:"images/sleep.jpg"},
  {name:"Pain Recovery Oil", price:499, img:"images/pain.jpg"}
];

function displayProducts(){
  let box = document.getElementById("product-list");
  box.innerHTML="";

  products.forEach((p,i)=>{
    box.innerHTML += `
    <div class="product">
      <img src="${p.img}" width="100%">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${i})">Add to Cart</button>
      <button onclick="wishlist(${i})">❤️</button>
    </div>`;
  });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(i){
  cart.push(products[i]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added");
}

function wishlist(i){
  alert("Saved ❤️");
}

displayProducts();