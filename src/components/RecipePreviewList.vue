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
   },
   methods: {
    /* fetch random 3 recipes from backend when no prop is given */
    async updateRandomRecipes() {
       try {
         const response = await window.axios.get("/recipes", { params: { limit: 3 }});
         const recipes = response.data.map(r => ({
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
        this.internalRecipes = recipes;
       } catch (error) {
         console.error(error);
       }
     }
   },
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
