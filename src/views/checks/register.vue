<template>
   <div class="absolute z-[99991] px-[29px] py-[18px] w-[980px] h-[1100px] bg-[#FFFFFF] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加用户</p>
      </div>
      <div class="mt-[53px] grid grid-cols-2 w-[900px] ">
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">平台</p>
            <SelectBox placeholder="选择平台"  :groups="[]" :group="group" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">新增日期</p>
            <input type="text" placeholder="输入新增日期" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">业务室/组</p>
            <SelectBox placeholder="选择业务室/组"  :groups="[]" :group="group" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">业务员</p>
            <input type="text" placeholder="输入业务员" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">客户状态</p>
            <SelectBox placeholder="选择客户状态"  :groups="[]" :group="group" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">客户姓名</p>
            <input type="text" placeholder="输入客户姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">客户性别</p>
            <SelectBox placeholder="选择客户性别"  :groups="[]" :group="group" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">客户年龄</p>
            <input type="text" placeholder="输入客户年龄" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">平台账号</p>
            <input type="text" placeholder="输入平台账号" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">职业描述</p>
            <input type="text" placeholder="输入职业描述" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
      </div>
      <div class="w-full flex justify-center">
        <div class="relative w-[825px]">
          <textarea
          v-model="career"
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
            placeholder=" "
            :class="{'border-t-transparent':career!=''}"
          ></textarea>
          <label class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 ">
            Message
          </label>
        </div>
      </div>
      <div class="w-full flex justify-center mt-[50px]">
        <div class="w-[825px] flex items-center gap-1 overflow-x-auto">
          <img v-for="(item,index) in images" :src="item" class=" w-[150px] h-[200px]"/>
          <div @click="selectImage" class="flex items-center justify-center flex-shrink-0 flex-shrink-0 bg-[#F0F0F0] w-[150px] h-[200px]">
            <BIconPlus class="text-[30px]"/>
          </div>
        </div>
        <input multiple  type="file" accept="image/*" style="display:none" ref="imageInput" @change="uploadImage">
      </div>
      <div class="flex justify-center mt-[50px]">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" ></IconMyButton>
      </div>
   </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat, BIconPlus } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'registercheck',
  components: {
    SelectBox,
    IconMyButton,
    BIconPlus
  },
  data:()=>({
    career:'',
    images:[],
  }),
  methods:{
    selectImage() {
      this.$refs.imageInput.click()
    },
    uploadImage() {
      let files = this.$refs.imageInput.files;
      for(let i=0;i<files.length; i++){
        console.log('aaa');
        this.images.push('https://i.ibb.co/Xjwh9Rv/3.png');
      }
    }
  }
})
</script>