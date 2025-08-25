import { reactive } from 'vue';

const store = reactive({
  username: localStorage.getItem('username'),
  server_domain: "http://localhost:3000",
  randomRecipes:[],

  lastSearchResults: JSON.parse(localStorage.getItem('last_search_results') || '[]'),

  setLastSearchResults(results) {
    this.lastSearchResults = results
    localStorage.setItem('last_search_results', JSON.stringify(results))
  },

  login(username) {
    localStorage.setItem('username', username);
    this.username = username;
    console.log("login", this.username);
  },

  logout() {
    console.log("logout");
    localStorage.removeItem('username');
    this.username = undefined;
    localStorage.removeItem('last_search_results')
    this.lastSearchResults = undefined;
  }
});

export default store;
