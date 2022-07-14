<script>
    import { ExternalLink } from 'lucide-vue-next'
    import moment from 'moment'

    export default {
        data() {
            return {
                game: {},
                tab: 'short',
            }
        },
        components: {
            ExternalLink,
        },
        mounted() {
            this.getGame()
        },
        computed: {
            release() {
                return moment(this.game.release_date).format('DD MMMM YYYY')
            }
        },
        methods: {
            async getGame() {
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': this.key,
                        'X-RapidAPI-Host': this.host
                    }
                };

                const id = this.$route.params.id
                const response = await fetch(this.baseUrl + '/game?id=' + id, options)
                const result = await response.json()
                this.game = result
            }
        }
    }
</script>

<template>
    <main class="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
        <img :src="game.thumbnail" :alt="game.title" class="rounded-lg">
        <div class="space-y-2">
            <div class="flex items-center justify-between">
                <span v-text="game.genre" class="text-xs font-light text-gray-400" />
                <span v-text="game.platform" class="text-xs font-light text-gray-400" />
            </div>
            <h1 v-text="game.title" class="text-white text-xl md:text-3xl" />
            <div class="flex items-center justify-between">
                <div v-text="game.status" class="rounded bg-gray-700 text-gray-200 px-4 py-2 w-auto inline-block" />
                <a :href="game.game_url" target="_blank" class="flex items-center space-x-2">
                    <span v-text="'Go to ' + game.title"></span>
                    <ExternalLink
                        color="gray"
                        :size="20"
                    />
                </a>
            </div>
        </div>
        <div class="space-y-4">
            <div class="flex items-center space-x-4 overflow-x-auto w-full">
                <button @click="tab = 'short'" :class="{ 'bg-gray-400': tab == 'short' }" class="bg-gray-800 rounded-lg px-4 py-2 text-white">Short</button>
                <button @click="tab = 'description'" :class="{ 'bg-gray-400': tab == 'description' }" class="bg-gray-800 rounded-lg px-4 py-2 text-white">Description</button>
                <button v-if="game.minimum_system_requirements" @click="tab = 'min_spec'" :class="{ 'bg-gray-400': tab == 'min_spec' }" class="whitespace-nowrap bg-gray-800 rounded-lg px-4 py-2 text-white">Minimum Spec.</button>
                <button v-if="game.screenshots" @click="tab = 'screenshots'" :class="{ 'bg-gray-400': tab == 'screenshots' }" class="bg-gray-800 rounded-lg px-4 py-2 text-white">Screenshots</button>
            </div>
            <div v-if="tab == 'short'">
                <p v-text="game.short_description" class="text-sm text-gray-400 font-light" />
                <div class="divide-y divide-gray-400 mt-2">
                    <div class="flex items-center justify-between py-2">
                        <span>Developer</span>
                        <span v-text="game.developer" />
                    </div>
                    <div class="flex items-center justify-between py-2">
                        <span>Publisher</span>
                        <span v-text="game.publisher" />
                    </div>
                    <div class="flex items-center justify-between py-2">
                        <span>Release Date</span>
                        <span v-text="release" />
                    </div>
                </div>
            </div>
            <div v-if="tab == 'description'">
                <p v-text="game.description" class="text-sm text-gray-400 font-light" />
            </div>
            <div v-if="tab == 'min_spec' && game.minimum_system_requirements" class="divide-y divide-gray-200">
                <div v-for="(value, key) in game.minimum_system_requirements" class="md:flex items-center justify-between py-2">
                    <h6 v-text="key" class="text-sm text-gray-400 capitalize" />
                    <p v-text="value" class="text-gray-500" />
                </div>
            </div>
            <div v-if="tab == 'screenshots' && game.screenshots">
                <div v-for="ss in game.screenshots" class="flex items-center justify-between py-2">
                    <img :src="ss.image" :alt="game.title" class="rounded-lg" />
                </div>
            </div>
        </div>
    </main>
</template>