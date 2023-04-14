<template v-if="true">
    <div class="flex items-center justify-center mt-[100px] flex-col">
    <p class="text-[80px] mb-[80px]">{{ getIp }}不允许</p>
    <IconMyButton ref="addbutton"  @onclick="()=>$router.push({name:'login'})" icon="home" name="回登录" class="text-[#B2B2B2]" ></IconMyButton>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import IconMyButton from '@/components/IconButton.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'

export default defineComponent({
  name: 'blocked',
  components: {
    IconMyButton,
  },
  computed: {
      ...mapState(useAuthStore, ['getIp']),
  },
})
</script>