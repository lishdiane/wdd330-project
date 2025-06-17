import { buildFooterContent, showMenu, addSubscript } from "./utils.mjs";

buildFooterContent();
showMenu();
addSubscript();

//scroll to form on click
const signup = document.querySelector("#sign-up");
signup.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo(1, document.body.scrollHeight);
});
