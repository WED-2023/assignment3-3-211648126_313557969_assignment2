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
     v-if="results"
       title="Last Viewed Recipes"
      :recipes="results"
    />
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
    const error = ref("")
    const fetchLastViewed = async () => {
      try {
        const { data } = await axios.get('/recipes', {
          params: { limit: 3 }
        })

        // Normalize payload shape safely
        results.value = data;
      } catch (e) {
        error.value = e?.response?.data?.message || e.message || 'Failed to load recipes'
        alert(error.value)
    }

    return { store };
  }
  onMounted(fetchLastViewed);
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
