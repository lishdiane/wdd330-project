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

    const recipecards = recipes.forEach(recipe => {
        section.append(recipeTemplate(recipe));
    })

}

function recipeTemplate(recipe) {
    const div = document.createElement("div");
    // const h2 = document.createElement("h2");
    // h2.innerHTML = `${recipe.meals[0].strMeal}`;
    // const img = `<img src="${recipe.meals[0].strMealThumb}" alt="Recipe Image">`
    
    div.innerHTML = `
    <div>
    <h2>${recipe.meals[0].strMeal}</h2>
    <img src="${recipe.meals[0].strMealThumb}" alt="Recipe Image">
    </div>`;
    
    const button = document.createElement("button");
    button.classList.add("view-recipe");
    button.innerHTML = "View Recipe";
    button.addEventListener("click", () => {
        displayModel(recipe);
    })

    div.append(button);

    return div;
}