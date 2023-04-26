<template>
   <div class="ml-[103px] fixed z-[99991] px-[29px] py-[18px] w-[980px] h-[500px] bg-[#FFFFFF] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">
      <div class="flex items-center">
        <img src="/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加用户</p>
      </div>
      <div class="mt-[53px] grid grid-cols-2 w-[900px] ">
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">用户名</p>
            <input type="text" placeholder="输入用户名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">姓名</p>
            <input type="text" placeholder="输入姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">部门</p>
            <SelectBox placeholder="选择部门"  :groups="[]" :group="group" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">状态</p>
            <SelectBox placeholder="选择状态"  :groups="[]" :group="group" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">角色</p>
            <input type="text" placeholder="输入角色" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">IP地址</p>
            <input type="text" placeholder="输入IP地址" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">地区</p>
            <input type="text" placeholder="输入地区" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
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
  name: 'registeradmin',
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