import {getYoutubeData, getRecipe} from "./data.mjs";
import { buildFooterContent, showMenu } from "./utils.mjs";


buildFooterContent();
showMenu();

displayRecipes();



async function displayRecipes() {
    const section = document.querySelector("#recipes");

    const recipes = [];
    for (let i = 0; i < 4; i++ ) {
        const recipe = await getRecipe();
        recipes.push(recipe);
    }

    recipes.forEach(recipe => {
        section.append(recipeTemplate(recipe));
    })

}

function recipeTemplate(recipe) {
    const div = document.createElement("div");
    
    div.innerHTML = `
    <div class="recipe-card">
    <h2>${recipe.meals[0].strMeal}</h2>
    <img src="${recipe.meals[0].strMealThumb}" alt="A meal called ${recipe.meals[0].strMeal}." width="200" height="200" lazyload>
    </div>`;
    
    const button = document.createElement("button");
    button.classList.add("view-recipe");
    button.innerHTML = "View Recipe";
    button.addEventListener("click", () => {
        displayRecipeDetails(recipe);
    })

    div.append(button);

    return div;
}

async function displayRecipeDetails(recipe) {
    const dialog = document.querySelector("dialog");
    recipe = recipe.meals[0];
    const videoId = recipe.strYoutube.split("v=")[1];
    const youtubeVideoData = await getYoutubeData(videoId);

    dialog.innerHTML = modalTemplate(recipe, youtubeVideoData);
    dialog.showModal();
    
    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", () => dialog.close())

}

function modalTemplate(recipe, videoData) {
    
    let itemNumber = 1;
    const htmlStrings = [];
    let ingredient = `strIngredient${itemNumber}`;
    let measurement = `strMeasure${itemNumber}`;

    do {
        const string = `<li>${recipe[measurement]} ${recipe[ingredient]}</li>`
        htmlStrings.push(string)
        itemNumber += 1;
        measurement = `strMeasure${itemNumber}`;
        ingredient = `strIngredient${itemNumber}`;
    } while (recipe[ingredient] !== "");
    

    return `
    <button class="close">Close</button>
    <h2 class="meal-name">${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="${
      recipe.strMeal
    }" width="200" height="200">
    <h3><strong>Ingredients:</strong></h3>
    <ul class="ingredients">${htmlStrings.join("")}</ul>
    <h3><strong>Instructions:</strong></h3>
    <p class="instructions">${recipe.strInstructions}</p>
    <h3>Youtube Link:</h3>
    <a href="${recipe.strYoutube}">
        <h4>${videoData.items[0].snippet.title}</h4>
        <div class="youtubeIconOverlay">
            <img src="${videoData.items[0].snippet.thumbnails.medium.url}" alt="">
            <img id="overlay" src="../images/youtube-logo.svg">
        </div>
    </a>
    `
}