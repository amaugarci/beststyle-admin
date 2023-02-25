import { defineStore } from 'pinia'

export const useLayoutsettings = defineStore('layoutSettings', {
  state: () => ({
    index:5,
  }),
  getters:{
    getIndex:(state)=>state.index,
  },
  actions: {
    change(value) {
      this.index=value;
    },
  },
})
