import { getYoutubeData, getRecipe, setStorage, getStorage } from "./data.mjs";

export default async function displayPage() {
  displayRecipes();

  const h2 = document.querySelector("#recipes-heading");

  const showFavorites = document.querySelector("#show-favorites");
  showFavorites.addEventListener("click", () => {
    h2.innerHTML = "Favorites";
    displayFavorites();
  });
  
  const showAllButton = document.querySelector("#show-all");
  showAllButton.addEventListener("click", () => {
    h2.innerHTML = "Recipes";
    displayRecipes();
  });
 
}

 async function displayRecipes() {
  //Display recipe cards on recipe page

  const section = document.querySelector("#recipes");
  
  section.innerHTML = "";
  
  const recipes = [];
  for (let i = 0; i < 8; i++) {
    const recipe = await getRecipe();
    recipes.push(recipe);
  }

  recipes.forEach((item) => {
    section.append(recipeTemplate(item.meals[0]));
  });

}

function recipeTemplate(recipe) {
  const favorites = getStorage("favorites");

  //Build recipe card and return the div
  const div = document.createElement("div");
  div.classList.add("recipe-card");

  div.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="A meal called ${recipe.strMeal}." width="200" height="200" loading="lazy">`;

  //create and add open dialog button
  const button = document.createElement("button");
  button.classList.add("view-recipe");
  button.innerHTML = "View Recipe";
  button.addEventListener("click", () => {
    displayRecipeDetails(recipe);
  });

  div.append(button);

  //create favorite checkbox and add change event
  const label = document.createElement("label");
  label.textContent = "Add to your favorites";
  label.id = "favorite-label";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.class = "favorite";
  input.name = "favorite";

  const itemIsIn = isIn(recipe, favorites);

  if (itemIsIn === true) {
    input.checked = true;
  } else {
    input.checked = false;
  }

  //listen for check box change
  input.addEventListener("change", function () {
    if (this.checked) {
   
      addToFavorites(recipe);
    } else {
  
      removeFromFavorites(recipe);
    }
  });

  label.append(input);

  div.insertAdjacentElement("beforeend", label);

  return div;
}

async function displayRecipeDetails(recipe) {
  //Display recipes details on recipe modal
  let youtubeVideoData = null;
  let videoId = "";
  const dialog = document.querySelector("dialog");

  //get YouTube video ID from URL and use ID to retrieve YouTube data
  if (recipe.strYoutube !== "") {
    const everything = recipe.strYoutube.split("?");
    const recipeData = everything[1].split("&");

    recipeData.forEach((item) => {
      if (item.startsWith("v")) {
        videoId = item.split("=")[1];
      }
    });
    youtubeVideoData = await getYoutubeData(videoId);
  }

  console.log(recipe);
  console.log(youtubeVideoData);

  //display dialog modal
  dialog.innerHTML = modalTemplate(recipe, youtubeVideoData);
  dialog.showModal();

  //close modal
  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => dialog.close());
}

function modalTemplate(recipe, videoData) {
  //Compile recipe and youtube data and return a template for the recipe modal


  let itemNumber = 1;
  const htmlStrings = [];
  let ingredient = `strIngredient${itemNumber}`;
  let measurement = `strMeasure${itemNumber}`;

  //Gather all measurements and ingredients and join them in a <li> item
  do {
    const string = `<li>${recipe[measurement]} ${recipe[ingredient]}</li>`;
    htmlStrings.push(string);
    itemNumber += 1;
    measurement = `strMeasure${itemNumber}`;
    ingredient = `strIngredient${itemNumber}`;
  } while (recipe[ingredient] !== "");

  //return in there is valid YouTube data
  if (videoData !== null) {
    if (videoData.items.length > 0) {
      return `
      <button class="close" id="recipe-close">Close</button>
      <h2 class="meal-name">${recipe.strMeal}</h2>
      <p><strong>Cuisine:</strong> ${recipe.strArea}</p>
      <p><strong>Category:</strong> ${recipe.strCategory}</p>
      <p><strong>Source:</strong><a href="${
        recipe.strSource
      }"> >Click here<</a></p>
      <img src="${recipe.strMealThumb}" alt="${
        recipe.strMeal
      }" width="200" height="200">
      <h3><strong>Ingredients:</strong></h3>
      <ul class="ingredients">${htmlStrings.join("")}</ul>
      <h3><strong>Instructions:</strong></h3>
      <p class="instructions">${recipe.strInstructions}</p>
      <h3>Youtube Link:</h3>
      <a href="${recipe.strYoutube}">
          <h4>${videoData.items[0].snippet.title || recipe.strMeal}</h4>
          <div class="youtubeIconOverlay">
              <img id="youtube-img" src="${
                videoData.items[0].snippet.thumbnails.medium.url ||
                recipe.strMealThumb
              }" alt="">
              <img id="overlay" src="../images/youtube-logo.svg">
          </div>
      </a>
      `;
    }
  } else {
    //Return if not valid YouTube data
    return `
    <button class="close" id="recipe-close">Close</button>
    <h2 class="meal-name">${recipe.strMeal}</h2>
          <p><strong>Cuisine:</strong> ${recipe.strArea}</p>
      <p><strong>Category:</strong> ${recipe.strCategory}</p>
      <p><strong>Source:</strong><a href="${
        recipe.strSource
      }"> >Click here<</a></p>
    <img src="${recipe.strMealThumb}" alt="${
      recipe.strMeal
    }" width="200" height="200">
    <h3><strong>Ingredients:</strong></h3>
    <ul class="ingredients">${htmlStrings.join("")}</ul>
    <h3><strong>Instructions:</strong></h3>
    <p class="instructions">${recipe.strInstructions}</p>
    </a>
    `;
  }
}

function addToFavorites(recipe) {
  const favorites = getStorage("favorites") || [];
  favorites.push(recipe);
  setStorage("favorites", favorites);
}

function removeFromFavorites(recipe) {
  const favorites = getStorage("favorites") || [];
  const index = favorites.indexOf(recipe);
  favorites.splice(index, 1);
  setStorage("favorites", favorites);
}

function isIn(item, array) {
  for (const recipe of array) {
    if (recipe.idMeal === item.idMeal) {
      return true;
    }
  }
}

function displayFavorites() {
  const favoritesList = getStorage("favorites");
  const section = document.querySelector("#recipes");

  if (favoritesList.length === 0) {
    section.innerHTML = "You have not saved any favorite recipes.";
  }

  favoritesList.forEach((recipe) => {
    section.append(recipeTemplate(recipe));
  });
}

