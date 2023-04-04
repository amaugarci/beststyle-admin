<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
       <MyButton name="首页" :active="true"></MyButton>
    </div>
</template>


<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import axios from 'axios'
import moment from 'moment'
layer.config({
  skin: 'login-class'
})
export default defineComponent({
  name: 'home',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton
  },
  data:()=>({
    }),
  mounted() {
   
  },

  methods:{
   
  }
})
</script>