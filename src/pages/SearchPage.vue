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

    <div v-if="store.lastSearchResults.length && results.length == 0">
      <RecipePreviewList :recipes="store.lastSearchResults" title="Last Search" />
    </div>

    <RecipePreviewList
      v-else-if="results.length"
      :title="`Results (${sortedResults.length})`"
      :recipes="sortedResults"
    />
    
    

    <div v-else>
      <p>No recipes found for "{{ query }}"</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed} from 'vue'
import RecipePreviewList from '@/components/RecipePreviewList.vue'
import store from '@/store'

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

// onBeforeMount()(() => {
//   if (store.lastSearchResults.length > 0) {
//     results.value = store.lastSearchResults
//   }
// })

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
    store.setLastSearchResults(results.value)
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

</style>
