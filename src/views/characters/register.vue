<template>
  <div class="absolute z-[99991] px-[29px] py-[18px] w-[980px] h-[600px] bg-[#FFFFFF] fixed top-[300px] left-1/2  -translate-x-1/2">
   <div class="relative">
     <div class="flex items-center">
       <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
       <p class="font-black text-[#0B88F9]">添加包装</p>
     </div>
     <div class="flex flex-row gap-[6px] my-[30px]  items-center ">
       <p class="font-black mr-[17px]">标题</p>
       <input type="text" placeholder="输入标题" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
     </div>
     <p class="font-black mr-[17px]">分类</p>
     <div class="mb-[30px] mt-[10px] flex">
         <SelectBox placeholder="一级分类"  :groups="[]" :group="group" class="w-[200px]"/>
         <SelectBox placeholder="二级分类"  :groups="[]" :group="group" class="w-[200px]"/>
         <!-- <SelectBox placeholder="三级分类"  :groups="[]" :group="group" class="w-[200px]"/> -->
     </div>
     <div class="w-full flex">
       <div class="relative w-[660px] h-[200px]">
         <QuillEditor theme="snow" />
       </div>
     </div>
     <div @click="selectImage" class="w-[150px] h-[200px] mt-[25px] top-[0px] right-[10px] absolute">
       <div v-if="images" class=" relative">
         <img :src="images" class="w-[150px] h-[200px] mt-[10px]"/>
       </div>
       <div v-else  class="flex items-center justify-center flex-shrink-0 flex-shrink-0 bg-[#F0F0F0] w-[150px] h-[200px]">
         <BIconPlus class="text-[30px]"/>
       </div>
       <input type="file" accept="image/*" style="display:none" ref="imageInput" @change="uploadImage">
     </div>
     <div class="flex justify-center mt-[70px]">
       <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" ></IconMyButton>
     </div>
   </div>
 </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat,BIconPlus,BIconXCircle } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
 name: 'registertraning',
 components: {
   SelectBox,
   IconMyButton,
   BIconPlus,
   BIconXCircle,
 },
 data:()=>({
   images:'',
 }),
 methods:{
   selectImage() {
     this.$refs.imageInput.click()
   },
   removeImage(){
     this.images='';
   },
   uploadImage() {
     let file = this.$refs.imageInput.file;
     this.images=('https://i.ibb.co/Xjwh9Rv/3.png');
   }
 }
})
</script>