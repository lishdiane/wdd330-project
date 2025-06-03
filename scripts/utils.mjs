//-------Load Templates---------//

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

//header and footer
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector(".main-header");
    headerElement.innerHTML = headerTemplate;
    showMenu()

    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector(".main-footer");
    footerElement.innerHTML = footerTemplate;
    buildFooterContent()
}

function buildFooterContent() {
    //get year and modification date and insert into footer
    const year = document.querySelector('#currentYear');
    const modifies = document.querySelector("#lastModified");

    const today = new Date();

    year.innerHTML = today.getFullYear();
    modifies.innerHTML = document.lastModified;
}

function showMenu() {
    const menuButton = document.querySelector("#menu");
    const nav = document.querySelector("#navigation");

    menuButton.addEventListener("click", () => {
        menuButton.classList.toggle("show");
        nav.classList.toggle("show");
    })
}

