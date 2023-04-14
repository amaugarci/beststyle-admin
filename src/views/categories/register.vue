<template>
   <div class="fixed z-[99991] px-[29px] py-[18px] w-[980px] h-[400px] bg-[#FFFFFF] fixed top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/2">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加用户</p>
      </div>
      <div class="flex items-center">
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">分组名称</p>
            <input type="text" placeholder="输入分组名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
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
  name: 'registergroup',
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