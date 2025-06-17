import { getStorage, setStorage } from "./data.mjs";
import { addSubscript } from "./utils.mjs";
addSubscript;

export default function buildShoppingCart() {
  //Build the entire shopping cart page
  const cartItems = getStorage("cart");
  const section = document.querySelector("#cart");
  section.innerHTML = "";

  if (cartItems.length > 0) {
    //Display each shopping cart item div
    for (const item of cartItems) {
      const div = document.createElement("div");
      div.classList.add("cart-card");

      div.innerHTML = `
            <img src="${item.images[0]}" alt="${
        item.title
      }." width="100" height="100" lazyload>
            <h2>${item.title}</h2>
            <p>${item.price.toFixed(2)}</p>`;

      // Quantity display and add/subtract
      const quantityDiv = document.createElement("div");
      div.classList.add("quantity");
      const buttonAdd = document.createElement("button");
      buttonAdd.textContent = "+";
      const buttonSubtract = document.createElement("button");
      buttonSubtract.textContent = "-";
      const textNode = document.createTextNode(item.quantity);

      quantityDiv.appendChild(buttonSubtract);
      quantityDiv.appendChild(textNode);
      quantityDiv.appendChild(buttonAdd);

      div.appendChild(quantityDiv);

      buttonSubtract.addEventListener("click", () => {
        if (item.quantity == 0) {
          item.quantity = 0;
          textNode.textContent = item.quantity;
        } else if (item.quantity == 1) {
          const index = cartItems.indexOf(item);
          cartItems.splice(index, 1);
          div.remove();
          if (cartItems == 0) {
            buildShoppingCart();
          }
        } else {
          item.quantity -= 1;
          textNode.textContent = item.quantity;
        }
        setStorage("cart", cartItems);
        buildShoppingCart();
        addSubscript();
      });

      buttonAdd.addEventListener("click", () => {
        item.quantity += 1;
        textNode.textContent = item.quantity;
        setStorage("cart", cartItems);
        buildShoppingCart();
        addSubscript();
      });

      section.append(div);
    }

    //Add subtotal and order button to end of page
    section.insertAdjacentHTML("beforeend", getCartTotalsHtml(cartItems));
    section.insertAdjacentHTML(
      "beforeend",
      `<button id="order" type="button">Order
      </button>`
    );

    //Dialog order form
    const orderForm = document.querySelector("#order-form");
    const orderNow = document.querySelector("#order");
    const close = document.querySelector(".close");

    orderNow.addEventListener("click", () => {
      orderForm.showModal();
    });

    close.addEventListener("click", () => {
      orderForm.close();
    });

    //Displaying total in form
    const formTotal = document.querySelector("#form-total");
    formTotal.innerHTML = getCartTotalsHtml(cartItems);

    //Submitting Form
    const form = document.querySelector("form");
    const timeStamp = document.querySelector("#timestamp");

    form.addEventListener("submit", () => {
      timeStamp.value = getTodaysDate();
      localStorage.clear("cart");
    });
  } else {
    section.innerHTML = `<h2>There are no items in your cart.</h2>`;
  }
}

function getCartTotalsHtml(cart) {
  //Calculate tax and total for cart items and return template
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
  //calculate subtotal
  let subtotal = array.reduce((value, item) => {
    return value + item.price * item.quantity;
  }, 0);
  return subtotal;
}

function getTodaysDate() {
  //get todays date
  const today = new Date();
  return today.toString();
}
