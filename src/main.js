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

axios.defaults.baseURL = 'http://localhost:8000/api/player/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const app = createApp(App)
app.use(router)
   .use(i18n)
   .use(pinia)
   .mount('#app')
