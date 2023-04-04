<template>
   <div class="absolute z-[99991] px-[29px] py-[18px] w-[980px] h-[870px] bg-[#FFFFFF] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加用户</p>
      </div>
      <div class="mt-[53px] grid grid-cols-2 w-[900px] ">
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
   </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'registeronboarding',
  components: {
    SelectBox,
    IconMyButton
  },
  data:()=>({
  }),
  methods:{
  }
})
</script>