import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    user:null,
    token:localStorage.getItem('token'),
    returnUrl:'me',
  }),
  getters:{
    getUser:(state)=>state.user,
    getToken:(state)=>state.token,
    getReturnUrl:(state)=>state.returnUrl,
  },
  actions: {
    setUser(value) {
      this.user=value;
    },
    setToken(value) {
      this.token=value;
      localStorage.setItem('token',value);
    },
    setReturnUrl(value) {
      this.returnUrl=value;
    },
    async fetchUser () {
      try {
        const { data } = await axios.get('/user');
        this.user=data.user;
      }catch (e) {
      }
    },
    logout () {
      this.token=null;
      localStorage.removeItem('token');
    },
  },
})
