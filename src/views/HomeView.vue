<script>
  import { RouterLink } from 'vue-router'
  export default {
    data() {
      return {
        games: [],
        search: '',
        category: 'action',
        categories: [
          'mmorpg',
          'shooter',
          'strategy',
          'moba',
          'racing',
          'sports',
          'social',
          'sandbox',
          'open-world',
          'survival',
          'pvp',
          'pve',
          'pixel',
          'voxel',
          'zombie',
          'turn-based',
          'first-person',
          'third-Person',
          'top-down',
          'tank',
          'space',
          'sailing',
          'side-scroller',
          'superhero',
          'permadeath',
          'card',
          'battle-royale',
          'mmo',
          'mmofps',
          'mmotps',
          '3d',
          '2d',
          'anime',
          'fantasy',
          'sci-fi',
          'fighting',
          'action-rpg',
          'action',
          'military',
          'martial-arts',
          'flight',
          'low-spec',
          'tower-defense',
          'horror',
          'mmorts',
        ],
      }
    },
    mounted() {
      this.getGames()
    },
    watch: {
      category(newCategory, oldCategory) {
        this.getGames()
      },
      search(newSearch, oldSearch) {
        this.getGames(newSearch)
      }
    },
    components: {
      RouterLink,
    },
    methods: {
      async getGames(search = '') {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': this.key,
            'X-RapidAPI-Host': this.host
          }
        }
        const url = this.baseUrl + '/games?sort-by=release-date&category=' + this.category
        const response = await fetch(url, options)
        const result = await response.json()
        this.games = result.slice(0, 6).filter(function(game){
          return game.title.toLowerCase().includes(search.toLowerCase());
        })

        return result
      }
    }
  }
</script>

<template>
  <main>
    <div class="flex items-center justify-center mb-4">
      <input type="search" placeholder="Search ..." v-model.lazy="search" class="bg-transparent border-b border-gray-400 text-center outline-none focus:border-gray-200 duration-300">
    </div>
    <div class="flex items-center justify-between">
        <h2 class="text-white text-2xl">Latest Games</h2>
        <select v-model="category" class="bg-transparent appearance-none text-right">
          <option :value="category" v-for="category in categories" :key="'category-filter-' + category.toLowerCase" class="bg-black text-right">
            <span v-text="category.charAt(0).toUpperCase() + category.slice(1)" />
          </option>
        </select>
    </div>

    <div v-if="games.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 my-4">
          <RouterLink :to="'/' + game.id" v-for="game in games" :key="'all-' + game.id" class="bg-gray-800 rounded-lg">
            <img :src="game.thumbnail" :alt="game.title" class="w-full rounded-lg">
            <div class="px-4 py-2">
              <div class="flex items-center justify-between">
                <span v-text="game.genre" class="text-xs font-light text-gray-400"></span>
                <span v-text="game.platform" class="text-xs font-light text-gray-400"></span>
              </div>
              <h3 v-text="game.title" class="text-base md:text-lg text-white"></h3>
            </div>
          </RouterLink>
    </div>
  </main>
</template>
