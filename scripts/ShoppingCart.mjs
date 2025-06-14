import { getStorage } from "./data.mjs";

export default function displayShoppingCart() {
  const cartItems = getStorage("cart");
  const section = document.querySelector("#cart");

  if (cartItems.length > 0) {
    const htmlStrings = cartItems.map(cartCardTemplate).join("");
    section.innerHTML = htmlStrings;
    section.insertAdjacentHTML("beforeend", getCartTotalsHtml(cartItems));
  } else {
    section.innerHTML = "There are no items in your cart."
  }
}

function cartCardTemplate(product) {
  return `
    <div class="cart-card">
        <img src="${product.images[0]}" alt="${product.title}." width="100" height="100" lazyload>
        <h2>${product.title}</h2>
        <p>${product.price.toFixed(2)}</p>
        <p>${product.quantity}</p>
    </div>`;
}

function getCartTotalsHtml(cart) {
  const subtotal = calculateSubtotal(cart);
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  return ` <div id="total"> 
    <p>Subtotal: ${subtotal.toFixed(2)}</p>
    <p>Tax: ${tax.toFixed(2)}</p>
    <p>Total: ${total.toFixed(2)}</p>
     </div>`;
}

function calculateSubtotal(array) {
  let subtotal = array.reduce((value, item) => {
    return value + item.price * item.quantity;
  }, 0);
  return subtotal;
}
