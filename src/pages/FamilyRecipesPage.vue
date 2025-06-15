<template>
  <main class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">Our Family Recipes</h1>

    <div class="grid gap-8 md:grid-cols-3">
      <FamilyRecipeCard
        v-for="recipe in recipes"
        :key="recipe.title"
        :recipe="recipe"
      />
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'
import FamilyRecipeCard from '@/components/FamilyRecipeCard.vue'

const recipes = reactive([
  {
    title: "Mom's Meat Balls",
    image: '/assets/Meatballs.jpg',
    occasion: 'Friday Dinner',
    originator_name: 'Mom Rachel',
    instructions: `Preheat oven to 180°C\nMix ground beef with breadcrumbs, eggs, and spices\nShape into balls and place in a baking dish\nBake for 30–35 minutes until browned`,
    ingredients: `500g ground beef\n1/2 cup breadcrumbs\n2 eggs\n1 tsp salt\n1/2 tsp pepper\n1 tbsp ketchup`
  },
  {
    title: "Tal's Pizza",
    image: 'assets/Pizza.jpg',
    occasion: 'Movie Night',
    originator_name: 'Tal',
    instructions: `Prepare pizza dough and let it rise\nSpread tomato sauce evenly\nAdd mozzarella and toppings\nBake in preheated oven at 220°C for 12–15 minutes`,
    ingredients: `2 cups flour\n1 tsp yeast\n1 cup warm water\n1/2 cup tomato sauce\n1 cup mozzarella\nToppings of choice`
  },
  {
    title: "Grandma's Chocolate Balls",
    image: 'assets/Choco.jpg',
    occasion: 'Birthday Parties',
    originator_name: 'Grandma Leah',
    instructions: `Crush biscuits into crumbs\nMix with cocoa, sugar, and condensed milk\nForm into small balls\nRoll in coconut or sprinkles and refrigerate`,
    ingredients: `200g tea biscuits\n3 tbsp cocoa\n1/2 cup sugar\n1/2 can sweetened condensed milk\nCoconut or sprinkles`
  }
])
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-img {
  width: 100%;
  height: 10rem; /* 40 * 0.25rem */
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-meta {
  font-size: 0.875rem;
  color: #4b5563; /* Tailwind's gray-600 */
}

.card-sub {
  margin-top: 0.5rem;
  font-weight: 500;
}
</style>

