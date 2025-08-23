function getRecipeFromCacheOrFetch(recipeId, fetchFunc) {
  const cached = JSON.parse(localStorage.getItem("recipes") || "{}");
  console.log("Recipe cache view from RecipeViewPage" , cached);
  console.log("cached[recipeId] = ", cached[recipeId]);
  if (recipeId in cached) {
    console.log("fetched from cache successfully! ")
    return Promise.resolve(cached[recipeId]);
  } else {
    console.log("fetching from api")
    return fetchFunc().then(recipe => {
      cached[recipeId] = recipe;
      localStorage.setItem("recipes", JSON.stringify(cached));
      return recipe;
    });
  }
}

function removeRecipeFromCache(recipeId) {
  const cached = JSON.parse(localStorage.getItem("recipes") || "{}");
  delete cached[recipeId];
  localStorage.setItem("recipes", JSON.stringify(cached));
}

export { getRecipeFromCacheOrFetch, removeRecipeFromCache }; 