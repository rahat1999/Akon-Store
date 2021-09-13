const loadProducts = () => {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product m-1" style='height:380px;'>
      <div>
    <img class="product-image" style='height:160px' src="${image}"></img>
      </div>
      <h3>${product.title.slice(0,65)}</h3>
      <h5>Category: ${product.category}</h5>
      <h5>rate: ${product.rating.rate},  count: ${product.rating.count}</h5>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadDetails('${product.id}')" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// card details
const loadDetails = id =>{
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res=>res.json())
    .then(data=>displayDetails(data))
}
const displayDetails = details =>{
  document.getElementById('card-details').textContent=''
  const div = document.createElement('div')
  div.innerHTML=`
  <div class="card border-2 border-dark bg-warning shadow" style="width: 30rem;">
    <div class="card-body">
        <h2 class="card-title text-center fw-bold">🧣${details.category}</h2>
        <li class="card-text fw-bold">${details.title}</li>
        <li class="card-text fw-bold">${details.description.slice(0,100)}</li>
    </div>
</div>`
document.getElementById('card-details').appendChild(div)
}

let count = 0;
const addToCart = (id, price) => {
  // hide card-details
  document.getElementById('card-details').textContent=''

  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = parseFloat(count);
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText =parseFloat(total).toFixed(2);
  
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};

