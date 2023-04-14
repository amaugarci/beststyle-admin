<template v-if="true">
    <div class="flex items-center justify-center mt-[100px] flex-col">
    <p class="text-[80px] mb-[80px]">404</p>
    <IconMyButton ref="addbutton"  @onclick="()=>$router.push({name:'home'})" icon="home" name="回首页" class="text-[#B2B2B2]" ></IconMyButton>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import IconMyButton from '@/components/IconButton.vue'
export default defineComponent({
  name: 'notfound',
  components: {
    IconMyButton,
  },
})
</script>