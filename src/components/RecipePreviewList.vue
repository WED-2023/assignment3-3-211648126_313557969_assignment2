<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
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
    title: { type: String, required: true }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await window.axios.get("/recipes", {
          params: { limit: 3 }
        });

        console.log("RESPONSE: ", response)

        const recipes = response.data.map((r) => {
          return {
            id: r.id,
            title: r.title,
            image: r.image,
            duration: r.duration,
            vegan: r.vegan,
            vegetarian: r.vegetarian,
            glutenFree: r.glutenFree,
            favorite: r.favorite || false,
            viewed: r.viewed || false
          };
        });

        this.recipes = recipes;
        console.log("recipes:", this.recipes);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
