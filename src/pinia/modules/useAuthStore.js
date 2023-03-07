import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    token:localStorage.getItem('token'),
    returnUrl:'home',
  }),
  getters:{
    getToken:(state)=>state.token,
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
    logout () {
      this.token=null;
      localStorage.removeItem('token');
    },
  },
})
