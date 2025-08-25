<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Recipes</router-link> |
      <router-link :to="{ name: 'search' }">Search</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <span v-if="!store.username">
        Hello Guest:
        <router-link :to="{ name: 'register' }">Register</router-link> |
        <router-link :to="{ name: 'login' }">Login</router-link> |
      </span>
      <span v-else>
      {{ store.username }}:

      <!-- Personal Dropdown -->
      <div class="dropdown d-inline">
        <button class="btn btn-link dropdown-toggle p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Personal
        </button>
        <ul class="dropdown-menu">
          <li><router-link class="dropdown-item" :to="{ name: 'favorites' }">Favorites</router-link></li>
          <li><router-link class="dropdown-item" :to="{ name: 'myRecipes' }">My Recipes</router-link></li>
          <li><router-link class="dropdown-item" :to="{ name: 'familyRecipes' }">Family Recipes</router-link></li>
          <!-- <li><router-link class="dropdown-item" :to="{ name: 'createRecipe' }">Create Recipe</router-link></li> -->
        </ul>
      </div> |

      <router-link class="btn btn-link p-0 ms-3 logout-btn" :to="{ name: 'createRecipe' }">Create Recipe</router-link> |

      <button @click="logout" class="btn btn-link p-0 ms-3">Logout</button> |
    </span>

  </div>
    <div id="page-wrapper" :class="{ 'top-align': $route.name === 'search' }">  
        <router-view />
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { onMounted } from 'vue';
import * as bootstrap from 'bootstrap';

export default {
  name: "App",
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;
    const toast = internalInstance.appContext.config.globalProperties.toast;
    const router = internalInstance.appContext.config.globalProperties.$router;

    const logout = () => {
      store.logout();
      toast("Logout", "User logged out successfully", "success");
      router.push("/").catch(() => {});
    };

    onMounted(() => {
      // Initialize all dropdowns manually
      const dropdownElements = document.querySelectorAll('.dropdown-toggle');
      dropdownElements.forEach((el) => {
        new bootstrap.Dropdown(el);
      });
    });

    return { store, logout };
  }
}
</script>

<style lang="scss">
@import "@/scss/form-style.scss";



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url('../public/assets/Recipe.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

#nav {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: 'Segoe UI', sans-serif;
  border-bottom: 1px solid #eaeaea;
}

#nav a {
  font-weight: 500;
  color: #2c3e50;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s ease, border-bottom 0.2s ease;
  padding-bottom: 4px;
  position: relative;
  flex: 1;
  text-align: center;
}

#nav a::after {
  content: "";
  display: block;
  width: 0%;
  height: 2px;
  background: #42b983;
  transition: width 0.3s;
  position: absolute;
  bottom: 0;
  left: 0;
}

#nav a:hover {
  color: #42b983;
}

#nav a:hover::after {
  width: 100%;
}

#nav a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
#nav span{
  flex-grow: 1;
  text-align: center;
}
#page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* full height to center vertically */
  
}

#page-wrapper.top-align {
  align-items: flex-start;
  padding-top: 20px; /* optional spacing */
}

.dropdown-menu .router-link-active {
  background-color: #f8f9fa;
}

.logout-btn {
  font-weight: bold;
  color: #dc3545; // Bootstrap danger color (red)

  &:hover {
    color: #a71d2a;
    text-decoration: underline;
  }
}

</style>
