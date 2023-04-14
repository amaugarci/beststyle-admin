import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    token:localStorage.getItem('token'),
    admin:null,
    returnUrl:'home',
  }),
  getters:{
    getToken:(state)=>state.token,
    getAdmin:(state)=>state.admin,
    getReturnUrl:(state)=>state.returnUrl,
  },
  actions: {
    setToken(value) {
      this.token=value;
      localStorage.setItem('token',value);
    },
    async fetchAdmin () {
      try {
        const { data } = await axios.get('/admin');
        this.admin=data.admin;
      }catch (e) {
      }
    },
    logout () {
      this.token=null;
      localStorage.removeItem('token');
    },
  },
})
