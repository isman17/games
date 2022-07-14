import { createApp } from 'vue'
import App from './layouts/App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.config.globalProperties.baseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api'
app.config.globalProperties.host = 'free-to-play-games-database.p.rapidapi.com'
app.config.globalProperties.key = '9857aeeb50msh7b923a8cc985e8ap1708e0jsn9ef85cd2d4a1'

app.use(router)
app.mount('#app')
