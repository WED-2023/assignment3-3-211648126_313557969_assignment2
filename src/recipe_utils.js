function getRecipeFromCacheOrFetch(recipeId, fetchFunc) {
  const cached = JSON.parse(localStorage.getItem("recipes") || "{}");
  if (cached[recipeId]) {
    return Promise.resolve(cached[recipeId]);
  } else {
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
