// get form info //
const currentUrl = window.location.href;
const everything = currentUrl.split("?");
let formData = everything[1].split("&");
const thankyou = document.querySelector("#thankyou");


thankyou.innerHTML = `
<p>Thank you for joining our Pantry-Perks Club ${capitalize(show("fname"))}!</p>
<p>We will send a confirmation email to ${show("email")} shortly.</p>
`;

function show(info) {
  let result = "";
  formData.forEach((item) => {
    if (item.startsWith(info)) {
      result = item
        .split("=")[1]
        .replace("%40", "@");
    }
  });
  return result;
}

function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
