<template>
   <div class="fixed z-[99991] px-[29px] py-[18px] w-[980px] h-[400px] bg-[#FFFFFF] fixed top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/2">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加用户</p>
      </div>
      <div class="mt-[53px] grid grid-cols-2 w-[900px] ">
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">部门</p>
            <SelectBox placeholder="选择部门"  :groups="departments" :group="department_id"  @onchange="(value)=>{department_id=value}" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">分组名称</p>
            <input type="text" placeholder="输入分组名称" v-model="name" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">组长</p>
            <SelectBox placeholder="选择组长"  :groups="users" :group="boss_id" @onchange="(value)=>{boss_id=value}"  class="w-[281px]"/>
        </div>
      </div>
      <div class="flex justify-center">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" @onclick="submit" ></IconMyButton>
      </div>
   </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'registergroup',
  components: {
    SelectBox,
    IconMyButton
  },
  props: {
    item: {
        type: Object,
        required: false,
        default: null
    }
  },
  watch: {
    item: function(newVal, oldVal) {
      this.password='';
      if(this.item){
        this.name=this.item.name;
        this.boss_id=this.item.boss_id?this.item.boss_id:'';
        this.department_id=this.item.department.id;
      }else{
        this.name='';
        this.boss_id='';
        this.department_id='';
        this.message='';
      }
    }
  },
  mounted(){
    this.getList();
      if(this.item){
        this.name=this.item.name;
        this.boss_id=this.item.boss_id?this.item.boss_id:'';
        this.department_id=this.item.department.id;
      }
  },
  data:()=>({
    departments:[],
    users:[],
    name:'',
    department_id:'',
    boss_id:'',
    message:'',
  }),
  methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getList() {
      try {
        const response = await axios.get(`/grouplist`);
        if(response.data.status==1){
          this.users = response.data.users;
          this.departments = response.data.departments;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
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
    async goEdit(id){
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post(`/editgroup/${id}`, {
            name:this.name,
            department_id:this.department_id,
            boss_id:this.boss_id,
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
        const response=await axios.post(`/creategroup`, {
            name:this.name,
            department_id:this.department_id,
            boss_id:this.boss_id,
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
        if(this.name==''){
            this.message='用户是必需的';
            return false;
        }
        else if(this.department_id==''){
          this.message='部门是必需的';
            return false;
        }
        return true;
    },
    submit(){
      if(this.item){
        this.goEdit(this.item.id);
      }else{
        this.goCreate();
      }
    },
  }
})
</script>