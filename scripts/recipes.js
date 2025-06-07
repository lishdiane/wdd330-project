import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
displayRecipes();

async function getRecipe() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    console.log(data);
    return data;
}

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
    <div>
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

function displayRecipeDetails(recipe) {
    const dialog = document.querySelector("dialog");
    
    dialog.innerHTML = modalTemplate(recipe);
    dialog.showModal();
    
    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", () => dialog.close())

}

function modalTemplate(recipe) {
  recipe = recipe.meals[0];
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
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" width="200" height="200">
    <h3><strong>Ingredients:</strong></h3>
    <ul class="ingredients">${htmlStrings.join("")}</ul>
    <h3><strong>Instructions:</strong></h3>
    <p class="instructions">${recipe.strInstructions}</p>
    <a href="${recipe}"></a>
    <a href="${recipe}"></a>`;
