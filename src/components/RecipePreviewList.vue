<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in displayedRecipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import store from '../store'

 export default {
   name: "RecipePreviewList",
   components: { RecipePreview },
   props: {
    title:   { type: String, required: true },
    recipes: { type: Array,  default: null }   // ← NEW
   },
   data() {
     return {
      internalRecipes: []
     };
   },
   mounted() {
    // Only fetch randoms when parent did NOT supply a recipes prop
    if (!this.recipes) this.updateRandomRecipes();
    else this.updateRecipesInCache(this.recipes);
   },
   methods: {
    updateRecipesInCache(recipes){
        const cached = JSON.parse(localStorage.getItem("recipes") || "{}");
        console.log("Current cache before adding recipe: ", cached);
        for(const recipe of recipes){
          console.log("Adding recipe: ", recipe);
          cached[String(recipe.id??recipe.recipe_id)] = recipe;
          console.log("Cached object: ", cached);
          
        }
        localStorage.setItem("recipes", JSON.stringify(cached));
        console.log("Recipe cache after saving recipe  ",JSON.parse(localStorage.getItem("recipes")));
     },
     async fetchFromApi(){
      const response = await window.axios.get("/recipes", { params: { limit: 3 }});
      this.updateRecipesInCache(response.data, "recipes");
      const fullRecipes = response.data.map(r => ({
          id:         r.id,
          title:      r.title,
          image:      r.image,
          duration:   r.duration,
          vegan:      r.vegan,
          vegetarian: r.vegetarian,
          glutenFree: r.glutenFree,
          favorite:   r.favorite || false,
          viewed:     r.viewed   || false
        }));
      return fullRecipes;
     },
    /* fetch random 3 recipes from backend when no prop is given */
    
    async updateRandomRecipes() {

        try {
          console.log("The random recipes in stores are: ", store.randomRecipes);
        //first try - look in store  
        if (Array.isArray(store.randomRecipes) && store.randomRecipes.length === 3) {
          console.log("✅ Random recipes exist in store:", store.randomRecipes)
          this.internalRecipes = store.randomRecipes
        } else { // second try - gey from api
          console.log("ℹ️ Random recipes missing or wrong size, fetching new ones")
          const recipes = await this.fetchFromApi()
          store.randomRecipes = recipes;
          this.internalRecipes = recipes
        }
      } catch (err) {
        //last resort draw 3 random from cache
        console.error("❌ Failed to update random recipes", err)
        try {
        // get all cached recipes from localStorage
        const cachedStr = localStorage.getItem("recipes");
        if (cachedStr) {
          const cachedObj = JSON.parse(cachedStr);

          // turn into an array of recipes
          const allRecipes = Object.values(cachedObj);

          if (allRecipes.length > 0) {
            // pick 3 random unique ones
            const shuffled = allRecipes.sort(() => 0.5 - Math.random());
            const fallbackRecipes = shuffled.slice(0, 3);

            console.log("🗄️ Using 3 random recipes from localStorage fallback:", fallbackRecipes);

            this.internalRecipes = fallbackRecipes;
            store.randomRecipes = fallbackRecipes; // rehydrate store
            this.updateRecipesInCache(fallbackRecipes, "recipes");
            return;
          }
        }

        console.warn("⚠️ No recipes available in localStorage for fallback");
      } catch (parseErr) {
        console.error("❌ Failed to parse recipes from localStorage", parseErr);
      }
      }
    }},
   
   computed: {
     displayedRecipes() {
      // If parent sent a list, use it; otherwise use internal array
      return this.recipes ?? this.internalRecipes;
     }
   }
 };

</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
