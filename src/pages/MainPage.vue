<template>
  <div class="container">
    <h1 class="title">Main Page</h1>

    <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />

    <div v-if="!store.username" class="text-center mt-4">
      <router-link :to="{ name: 'login' }">
        <button class="btn btn-primary">You need to Login to view this</button>
      </router-link>
    </div>

    <RecipePreviewList
     v-if="!loading && results.length "
       title="Last Viewed Recipes"
      :recipes="results"
    />
    <p v-if="loading">Loading watched recipes…</p>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;
    
    const results = ref([])
    const loading = ref(true)
    const error = ref("")

    const fetchLastViewed = async () => {
     try {
        const { data } = await axios.get('/users/watched', { params: { limit: 3 } })
        console.log("The watched recipe IDs are: ", data)

        // 1) Parse localStorage cache
        const cached = JSON.parse(localStorage.getItem("recipes") || "{}")

        // 2) Separate into cached recipes + missing IDs
        const watchedRecipes = []
        const missingIds = []

        for (const id of (Array.isArray(data) ? data : [])) {
          if (cached[id]) {
            watchedRecipes.push(cached[id])
          } else {
            missingIds.push(id)
          }
        }

        // 3) Fetch missing ones in parallel
        const fetched = await Promise.all(
          missingIds.map(async (id) => {
            try {
              const { data } = await axios.get(`/recipes/${id}`)
              // save in localStorage cache for future
              cached[id] = data
              return data
            } catch (err) {
              console.error(`Failed to fetch recipe ${id}`, err)
              return null
            }
          })
        )

        // 4) Merge results (cached first, then fetched)
        const fullRecipes = [...watchedRecipes, ...fetched.filter(Boolean)]
        results.value = fullRecipes

        // 5) Save updated cache
        localStorage.setItem("recipes", JSON.stringify(cached))

      } catch (e) {
        error.value = e?.response?.data?.message || e.message || 'Failed to load recipes'
        alert(error.value)
      } finally {
        loading.value = false
      }
    }

  onMounted(fetchLastViewed);
 
  return { store, results, loading, error };
}};

</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
