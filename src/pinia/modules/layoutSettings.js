import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage' //getItem和setItem是封装的操作localStorage的方法
import defaultSettings from '@/default-settings'

export const useLayoutsettings = defineStore('layoutSettings', {
  state: () => getItem('defaultSettings') || defaultSettings,
  actions: {
    saveSettings(data) {
      Object.entries(data).forEach(([key, value]) => {
        this[key] = value
      })
      setItem('defaultSettings', data)
    },
  },
})
