function getRecipeFromCacheOrFetch(recipeId, myRecipeMode, fetchFunc) {
  const cacheKey = myRecipeMode ? "myRecipes" : "recipes";
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "{}");
  if (cached[recipeId]) {
    return Promise.resolve(cached[recipeId]);
  } else {
    return fetchFunc().then(recipe => {
      cached[recipeId] = recipe;
      localStorage.setItem(cacheKey, JSON.stringify(cached));
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