<template>
  <div class="ml-[103px] fixed z-[99991] px-[29px] py-[18px] w-[980px] h-[500px] bg-[#FFFFFF] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">
   <div class="relative">
     <div class="flex items-center">
       <img src="/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
       <p class="font-black text-[#0B88F9]">添加包装</p>
     </div>
     <div class="flex flex-row gap-[6px] my-[30px]  items-center ">
       <p class="font-black mr-[17px]">标题</p>
       <input type="text" placeholder="输入标题" v-model="title" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
     </div>
     <p class="font-black mr-[17px]">分类</p>
     <div class="mb-[30px] mt-[10px] flex">
         <SelectBox placeholder="一级分类"  :groups="categorys1" :group="category1_id" class="w-[200px]" @onchange="(value)=>{selectCategory1(value)}"/>
         <SelectBox placeholder="二级分类"  :groups="categorys2" :group="character_group_id" class="w-[200px]" @onchange="(value)=>{character_group_id=value}"/>
         <!-- <SelectBox placeholder="三级分类"  :groups="[]" :group="group" class="w-[200px]"/> -->
     </div>
     <div class="w-full flex">
        <div class="relative w-[700px] h-[200px]">
          <RichText :content="description" ref="myEditor" @saveHtml="(html)=>{this.description=html}"/>
          <!-- <QuillEditor theme="snow" contentType="html" :content="description" ref="myEditor"/> -->
        </div>
     </div>
     <div @click="selectImage" class="w-[150px] h-[200px] mt-[25px] top-[0px] right-[10px] absolute">
       <div v-if="images" class=" relative">
        <img :src="VITE_BACKEND_URL+images" class="w-[150px] h-[200px] mt-[10px]"/>
       </div>
       <div v-else  class="flex items-center justify-center flex-shrink-0 bg-[#F0F0F0] w-[150px] h-[200px]">
         <BIconPlus class="text-[30px]"/>
       </div>
       <input type="file" accept="image/*" style="display:none" ref="imageInput" @change="uploadImage">
     </div>
     <div class="flex justify-center mt-[70px]">
       <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" @onclick="submit" ></IconMyButton>
     </div>
   </div>
 </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat,BIconPlus,BIconXCircle } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import moment from 'moment'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;
export default defineComponent({
 name: 'registertraning',
 components: {
   SelectBox,
   IconMyButton,
   BIconPlus,
   BIconXCircle,
 },
props: {
  item: {
      type: Object,
      required: false,
      default: null
  }
},
data:()=>({
  title:'',
  images:'',
  description:'',
  character_group_id:'',
  category1_id:'',
  categorys1:[],
  categorys2:[],
  VITE_BACKEND_URL
}),
watch: {
  item: function(newVal, oldVal) {
    if(this.item){
      this.title=this.item.title;
      this.description=this.item.description;
      this.images=this.item.photo;
      this.character_group_id=this.item.character_group_id;
      this.category1_id=this.item.character_group.parent.id,
      this.selectCategory1(this.category1_id);
    }else{
      this.title='';
      this.images='';
      this.description='';
      this.training_group_id='';
      this.categorys2=[];
    }
  },
  categorys1:function(newVal, oldVal) {
    this.selectCategory1(this.category1_id);
  },
},
mounted(){
  this.getList();
    if(this.item){
      this.title=this.item.title;
      this.description=this.item.description;
      this.images=this.item.photo;
      this.character_group_id=this.item.character_group_id;
      this.category1_id=this.item.character_group.parent.id,
      this.selectCategory1(this.category1_id);
    }
},
 methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getList() {
      try {
        const response = await axios.get(`/characterlist`);
        if(response.data.status==1){
          this.categorys1 = response.data.charactergroups;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    selectCategory1(value){
      this.category1_id=value;
      for(let i=0;i<this.categorys1.length;i++){
        if(this.categorys1[i].id==value){
          this.categorys2=this.categorys1[i].children;
          return;
        }else if(i==this.categorys1.length-1){
          this.character_group_id='';
        }
      }
    },
   selectImage() {
     this.$refs.imageInput.click()
   },
   async uploadImage() {
    let file = this.$refs.imageInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try{
      const response=await axios.post(`/uploadfile`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if(response.status==422){
          this.message='网络错误';
          this.showDialog();
      }
      else if(response.status==200&&response.data.status==1){
        this.images=response.data.image;
      }
    }catch(error) {
        this.message='网络错误';
        this.showDialog();
    };
  },
  showDialog(){
        layer.config({
          skin: 'login-class'
        })
        layer.open({
            type:1,
            offset:'b',
            title:false,
            content: this.message,
            closeBtn: 0,
            shadeClose:1,
        });
    },
    showSucss(){
      layer.config({
        skin: 'success-class'
      })
      layer.open({
        title:false,
        content: '成功',
        btn:'确定',
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
      });
    },
    submit(){
      if(this.item){
        this.goEdit(this.item.id);
      }else{
        this.goCreate();
      }
    },
    async goEdit(id){
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post(`/editcharacter/${id}`, {
          title:this.title,
          photo:this.images,
          description:this.description,
          character_group_id:this.character_group_id,
        });
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async goCreate(){
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post('/createcharacter', {
            title:this.title,
            photo:this.images,
            description:this.description,
            character_group_id:this.character_group_id,
        });
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    createValidation(){
        if(this.title==''){
            this.message='标题是必需的';
            return false;
        }
        else if(this.images==''){
          this.message='照片是必需的';
            return false;
        }
        else if(this.description==''){
          this.message='描述是必需的';
            return false;
        }
        else if(this.character_group_id==''){
          this.message='分类是必需的';
            return false;
        }
        return true;
    },
 }
})
</script>