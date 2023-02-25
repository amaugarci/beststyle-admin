<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import useLang from '@/i18n/useLang'

export default defineComponent({
  setup() {
    const { lang } = useLang()
    return {
      lang,
    }
  }
})
</script>