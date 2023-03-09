import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    token:localStorage.getItem('token'),
    system:null,
    returnUrl:'home',
  }),
  getters:{
    getToken:(state)=>state.token,
    getSystem:(state)=>state.system,
    getReturnUrl:(state)=>state.returnUrl,
  },
  actions: {
    setToken(value) {
      this.token=value;
      localStorage.setItem('token',value);
    },
    setReturnUrl(value) {
      this.returnUrl=value;
    },
    async fetchSystem () {
      try {
        const { data } = await axios.get('/system');
        this.system=data.system;
      }catch (e) {
      }
    },
    logout () {
      this.token=null;
      localStorage.removeItem('token');
    },
  },
})
