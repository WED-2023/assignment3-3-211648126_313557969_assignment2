import { reactive } from 'vue';

const store = reactive({
  username: localStorage.getItem('username'),
  server_domain: "http://localhost:3000",
  recipes: JSON.parse(localStorage.getItem('recipes') || '{}'),
  myRecipes: JSON.parse(localStorage.getItem('myRecipes') || '{}'),

  login(username) {
    localStorage.setItem('username', username);
    this.username = username;
    console.log("login", this.username);
    localStorage.setItem("recipes", JSON.stringify({}));
    localStorage.setItem("myRecipes", JSON.stringify({}));
  },

  logout() {
    console.log("logout");

    localStorage.removeItem('username');
    this.username = undefined;

    localStorage.removeItem('recipes');
    this.recipes = undefined;

    localStorage.removeItem('myRecipes');
    this.myRecipes = undefined;
  }
});

export default store;
