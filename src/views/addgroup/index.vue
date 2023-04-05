<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
       <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="分组管理" :active="false"></MyButton>
       <MyButton @onclick="()=>addgroup=false"  name="添加分组" :active="!addgroup"></MyButton>
       <MyButton v-if="addgroup" name="添加部门" :active="true"></MyButton>
    </div>
    <div v-if="!addgroup">
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">部门</p>
        <SelectBox placeholder="选择部门"  :groups="[]" :group="group" class="w-[281px]"/>
        <IconMyButton @onclick="(event)=>addgroup=!addgroup" icon="circleplus" name="添加用户" ></IconMyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">分组</p>
        <input type="text" placeholder="分组名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px]">
      </div>
      <!-- <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">分组</p>
        <SelectBox placeholder="选择分组"  :groups="[]" :group="group" class="w-[281px]"/>
      </div> -->
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">组长</p>
        <SelectBox placeholder="选择组长"  :groups="[]" :group="group" class="w-[281px]"/>
      </div>
      <!-- 
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">组长</p>
        <input type="text" placeholder="组长姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px]">
      </div> -->
    </div>
    <div v-else>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">部门</p>
        <input type="text" placeholder="部门名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px]">
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">主管</p>
        <input type="text" placeholder="主管姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px]">
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
  name: 'addgroup',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox
  },
  data:()=>({
    addgroup:false,
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