import { getProductData, setStorage, getStorage } from "./data.mjs";


export async function displayProducts() {
  const products = await getProductData();
  const productSection = document.querySelector("#product-cards");

  for (const product of products.products) {
    productSection.append(buildProductCard(product));
  }
}

function buildProductCard(product) {
  const div = document.createElement("div");
  div.classList.add('product-card');

  div.innerHTML = `
  <h2>${product.title}</h2>
  <img src="${product.images[0]}" alt="${product.title}." width="200" height="200" lazyload>
  <p>$${product.price}</p>`;

  const button = document.createElement("button");
  button.classList.add("add-to-cart");
  button.innerHTML = "Add to cart";

  button.addEventListener("click", () => {
    addToCart(product);
    Toastify({
      text: `${product.title} was added to the cart!`,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #118ab2ff, #073b4cff)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  })

  div.append(button);

  return div;

}

function addToCart(product) {
    const cart = getStorage("cart");
    let inCart = null;

    if (cart.length > 0) {
        inCart = cart.find((item, i) => {
            if (item.id === product.id) {
                cart[i].quantity += 1;
                return true;
            }
        })
    } 

    if (inCart === null || inCart === undefined) {
        product.quantity = 1;
        cart.push(product);
    }
    
    setStorage("cart", cart)
}