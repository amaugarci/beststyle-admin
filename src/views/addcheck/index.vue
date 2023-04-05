<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
       <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="查重管理" :active="false"></MyButton>
       <MyButton name="查重列表" :active="true"></MyButton>
    </div>
    <div >
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">添加平台</p>
        <input type="text" placeholder="输入标题" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px]">
      </div>
    </div>
  
    <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" ></IconMyButton>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import IconMyButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import SelectBox from '@/components/SelectBox.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'addcheck',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox
  },
  data:()=>({
  }),
  methods:{
    changepage(value){
      this.currentPage=value;
    },
    onchangePage(value){
        this.index=value;
        this.list=Array(Number(value)).fill(0);
    },
  }
})
</script>