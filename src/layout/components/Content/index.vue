<template>
  <router-view v-slot="{ Component }">
      <component :is="Component" :key="key" />
  </router-view>
</template>
<script>

import { computed, defineComponent } from 'vue'
export default defineComponent({
})
</script>
