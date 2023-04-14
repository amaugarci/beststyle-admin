import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    token:localStorage.getItem('token'),
    ip_address:'',
    admin:null,
    returnUrl:'home',
  }),
  getters:{
    getToken:(state)=>state.token,
    getIp:(state)=>state.ip_address,
    getAdmin:(state)=>state.admin,
    getReturnUrl:(state)=>state.returnUrl,
  },
  actions: {
    setToken(value) {
      this.token=value;
      localStorage.setItem('token',value);
    },
    setIp(value) {
      this.ip_address=value;
      this.logout();
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
