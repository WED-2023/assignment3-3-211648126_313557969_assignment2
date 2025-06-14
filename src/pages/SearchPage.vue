<template>
  <div class="search-page">
    <h1>Search Recipes</h1>

    <div class="controls">
      <input v-model="query" placeholder="Search recipes..." />

      <button @click="searchRecipes">Search</button>

      <select v-model="limit">
        <option disabled>Results per page</option>
        <option v-for="n in [5, 10, 15]" :key="n" :value="n">{{ n }}</option>
      </select>

      <select v-model="cuisine">
        <option value="">Cuisine: Any</option>
        <option v-for="c in cuisines" :key="c" :value="c">{{ c }}</option>
      </select>

      <select v-model="diet">
        <option value="">Diet: Any</option>
        <option v-for="d in diets" :key="d" :value="d">{{ d }}</option>
      </select>

      <select v-model="sortBy">
        <option value="">Sort: Relevance</option>
        <option value="duration">Duration</option>
      </select>
    </div>

    <div v-if="results.length" class="results">
      <div class="card" v-for="r in sortedResults" :key="r.id">
        <img :src="r.image" class="thumb" />
        <div class="info">
          <h2>{{ r.title }}</h2>
          <p>⏱ {{ r.duration }} min</p>
          <p>🔥 {{ r.calories }} kcal</p>
          <p>
            <span v-if="r.vegetarian">🥬 Vegetarian</span>
            <span v-if="r.glutenFree">🌾 Gluten Free</span>
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="searched">
      <p>No recipes found for "{{ query }}"</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const query = ref('')
const limit = ref(5)
const cuisine = ref('')
const diet = ref('')
const sortBy = ref('')
const results = ref([])
const searched = ref(false)

const cuisines = [
  'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
  'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
  'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
  'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
  'Spanish', 'Thai', 'Vietnamese'
]

const diets = [
  'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
  'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo'
]

const searchRecipes = async () => {
  try {
    searched.value = true
    const params = {
      query: query.value,
      cuisine: cuisine.value,
      diet: diet.value,
      limit: limit.value
    }
    console.log("Search parameters are: ", params)
    const { data } = await window.axios.get('/recipes/search', { params })
    results.value = data
    console.log("The search results: ", data)
  } catch (err) {
    console.error(err)
    results.value = []
  }
}

const sortedResults = computed(() => {
  if (sortBy.value === 'duration') {
    return [...results.value].sort((a, b) => a.duration - b.duration)
  }
  return results.value
})
</script>

<style scoped>
.search-page {
  max-width: 900px;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  justify-content: top;
  background: linear-gradient(to bottom right, #fefefe, #f0ece2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 250px;
}

select, button {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.results {
  display: grid;
  gap: 1.5rem;
}

.card {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  background: #fff;
}

.thumb {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
}

.info {
  text-align: left;
}

</style>
