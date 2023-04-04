<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
       <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="入职管理" :active="false"></MyButton>
       <MyButton name="添加分组" :active="true"></MyButton>
    </div>
    <div class="grid grid-cols-2 w-[980px] mx-auto">
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">部门</p>
        <SelectBox placeholder="选择部门"  :groups="[]" :group="group" class="w-[281px]"/>
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">分组</p>
        <SelectBox placeholder="分组名称"  :groups="[]" :group="group" class="w-[281px]"/>
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">姓名</p>
        <input type="text" placeholder="输入姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">性别</p>
        <SelectBox placeholder="选择性别"  :groups="[]" :group="group" class="w-[281px]"/>
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">年龄</p>
        <input type="text" placeholder="输入年龄" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">国籍</p>
        <input type="text" placeholder="输入国籍名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">婚否</p>
        <input type="text" placeholder="未选择" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">岗位</p>
        <input type="text" placeholder="输入职位名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">电话</p>
        <input type="text" placeholder="输入推荐人姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
        <p class="font-black mr-[17px]">入职时间</p>
        <SelectBox placeholder="2023/3/27"  :groups="[]" :group="group" class="w-[281px]"/>
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">介绍人</p>
        <input type="text" placeholder="输入推荐人姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">介绍人电话</p>
        <input type="text" placeholder="输入推荐人姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
      <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
        <p class="font-black mr-[17px]">合同时长</p>
        <input type="text" placeholder="输入合同时长" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
      </div>
    </div>
    <div class="flex justify-center">
      <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" ></IconMyButton>
    </div>
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
  name: 'addonboarding',
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