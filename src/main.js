import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
import pinia from './pinia'
import { layer } from 'vue3-layer';
import 'vue3-layer/dist/s3Layer.css';
import axios from 'axios';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import RichText from '@/components/RichText.vue'


import '@/plugins';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const app = createApp(App)
app.component('RichText', RichText)
app.use(router)
   .use(VueAwesomePaginate)
   .use(i18n)
   .use(pinia)
   .mount('#app')
