import { buildFooterContent, showMenu, addSubscript } from "./utils.mjs";

buildFooterContent();
showMenu();
addSubscript();

// get form info from url and display//
const currentUrl = window.location.href;
const everything = currentUrl.split("?");
let formData = everything[1].split("&");
const thankyou = document.querySelector("#thankyou");
const success = document.querySelector("#success");

if (thankyou) {
  thankyou.innerHTML = `
<p>Thank you for joining our Pantry-Perks Club ${capitalize(show("fname"))}!</p>
<p>We will send a confirmation email to ${show("email")} shortly.</p>
`;
} else if (success) {
  success.innerHTML = `<p>Your order was successful! Allow 20 min for your order to be ready for pick-up.</p>
    <p><strong>Name:</strong> ${capitalize(show("fname"))} ${capitalize(
    show("lname")
  )}</p>
    <p><strong>Your Phone:</strong> ${capitalize(show("phone"))}</p>
    <p><strong>Order time: </strong>${show("timestamp")}</p>`;
}

function show(info) {
  //search for key and return value
  let result = "";
  formData.forEach((item) => {
    if (item.startsWith(info)) {
      result = item
        .split("=")[1]
        .replace("%40", "@")
        .replaceAll("%3A", ":")
        .replaceAll("+", " ")
        .replaceAll("%28", "(")
        .replaceAll("%29", ")");
    }
  });
  return result;
}

function capitalize(string) {
  //capitalize string
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
