import { reactive } from 'vue';

const store = reactive({
  username: localStorage.getItem('username'),
  server_domain: "http://localhost:3000",
  recipes: JSON.parse(localStorage.getItem('recipes') || '{}'),

  login(username) {
    localStorage.setItem('username', username);
    this.username = username;
    console.log("login", this.username);
    localStorage.setItem("recipes", JSON.stringify({}));
  },

  logout() {
    console.log("logout");
    localStorage.removeItem('username');
    this.username = undefined;
    localStorage.removeItem('recipes');
    this.recipes = undefined;
  }
});

export default store;
