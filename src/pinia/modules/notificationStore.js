import { defineStore } from 'pinia'

export const notifyStore = defineStore('layoutSettings', {
  state: () => ({
    order:0,
    payment:0,
  }),
  getters:{
    getOrder:(state)=>state.order,
    getPayment:(state)=>state.payment,
  },
  actions: {
    addOrder() {
      this.order+=1;
    },
    addPayment(value) {
      this.payment+=1;
    },
    deleteOrder(){
      this.order=0;
    },
    deletePayments(){
      this.payment=0;
    }
  },
})
