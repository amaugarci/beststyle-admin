<template>
   <div class="fixed z-[99991] px-[29px] py-[18px] w-[680px] h-[330px] bg-[#FFFFFF] top-[300px] left-1/2  -translate-x-1/2">
    <div class="relative">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加评论</p>
      </div>
      <div class="w-full flex justify-center">
        <div class="relative w-[825px] mt-[30px]">
          <textarea
          v-model="comment"
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
            placeholder=" "
            :class="{'border-t-transparent':comment!=''}"
          ></textarea>
          <label class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 ">
            评论
          </label>
        </div>
      </div>
      <div class="flex justify-center mt-[70px]">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]"  @onclick="submit"></IconMyButton>
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
  props: {
    item: {
        type: Object,
        required: false,
        default: null
    }
  },
  data:()=>({
    comment:'',
  }),
  watch:{
    item: function(newVal, oldVal) {
      if(this.item){
        this.comment=this.item.comment;
      }else{
        this.comment='';
      }
    }
  },
  mounted(){
    if(this.item){
      this.comment=this.item.comment;
    }
  },
  methods:{
    submit(){
      if(this.item){
        this.goEdit(this.item.id);
      }else{
        this.goCreate();
      }
    },
    async goEdit(id){
      try{
        const response=await axios.post(`/training/${this.$route.params.id}/editcomment/${id}`, {
          comment:this.comment,
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
      try{
        const response=await axios.post(`/training/${this.$route.params.id}/createcomment`, {
            comment:this.comment,
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
  }
})
</script>