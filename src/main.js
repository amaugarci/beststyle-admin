import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
import pinia from './pinia'
import { layer } from 'vue3-layer';
import 'vue3-layer/dist/s3Layer.css';
import axios from 'axios';
import '@/plugins';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_USHER_APP_CLUSTER,
    forceTLS: true
});
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const app = createApp(App)
app.use(router)
   .use(i18n)
   .use(pinia)
   .mount('#app')
