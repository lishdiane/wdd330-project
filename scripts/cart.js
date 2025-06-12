import { getStorage } from "./data.mjs";
import { buildFooterContent, showMenu } from "./utils.mjs";


displayShoppingCart();
buildFooterContent();
showMenu();

function displayShoppingCart() {
    const cartItems = getStorage("cart");
    console.log(cartItems)
    const section = document.querySelector("#cart");
    const htmlStrings = cartItems.map(cartCardTemplate).join("");

    section.innerHTML= htmlStrings;


}

function cartCardTemplate(product) {
    return `
    <div class="cart-card">
        <img src="${product.images[0]}" alt="${product.title}." width="200" height="200" lazyload>
        <h2>${product.title}</h2>
        <p>${product.price}</p>
        <p>${product.quantity}</p>
    </div>`;
}