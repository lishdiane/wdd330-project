import { getStorage } from "./data.mjs";

export function buildFooterContent() {
  //get year and modification date and insert into footer
  const year = document.querySelector("#currentYear");
  const modifies = document.querySelector("#lastModified");

  const today = new Date();

  year.innerHTML = today.getFullYear();
  modifies.innerHTML = document.lastModified;
}

export function showMenu() {
  // hamburger menu for small view
  const menuButton = document.querySelector("#menu");
  const nav = document.querySelector("#navigation");

  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("show");
    nav.classList.toggle("show");
  });
}

export function addSubscript() {
  const order = getStorage("cart") || [];
  const itemNumber = document.querySelector("#item-number");

  itemNumber.textContent = getTotalItems(order);
}

function getTotalItems(array) {
  const totalItems = array.reduce((pv, item) => {
    return pv + item.quantity;
  }, 0);
  return totalItems;
}
