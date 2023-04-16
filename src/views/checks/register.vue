<template>
   <div class="absolute z-[99991] px-[29px] py-[18px] w-[980px] h-[800px] bg-[#FFFFFF] top-[150px] left-1/2 -translate-x-1/2">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加查重</p>
      </div>
      <p class="font-black mr-[17px] top-[50px] right-[180px] absolute">头像：</p>
      <div @click="selectImage" class="w-[100px] h-[130px] mt-[25px] top-[0px] right-[80px] absolute">
        <div v-if="image" class=" relative">
          <img :src="VITE_BACKEND_URL+image" class="w-[100px] h-[130px] mt-[10px]"/>
        </div>
        <div v-else  class="flex items-center justify-center  flex-shrink-0 bg-[#F0F0F0] w-[100px] h-[130px]">
          <BIconPlus class="text-[30px]"/>
        </div>
        <input type="file" accept="image/*" style="display:none" ref="imageInput" @change="uploadImage">
      </div>
      <div class="mt-[100px] grid grid-cols-2 w-[900px] ">
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">平台</p>
            <SelectBox placeholder="选择平台"  :groups="platforms" :group="platform_id" class="w-[281px]"  @onchange="(value)=>{platform_id=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">新增日期</p>
            <input type="date" placeholder="输入新增日期" v-model="added_date" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">部门</p>
            <SelectBox placeholder="选择部门"  :groups="departments" :group="department_id" class="w-[281px]" @onchange="(value)=>{selectDepartment(value)}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">业务室/组</p>
            <SelectBox placeholder="选择业务室/组"  :groups="groups" :group="group_id" class="w-[281px]" @onchange="(value)=>{group_id=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">业务员</p>
            <input type="text" v-model="sale_man" placeholder="输入业务员" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">客户状态</p>
            <SelectBox placeholder="选择客户状态"  :groups="statuses" :group="client_status_id" class="w-[281px]" @onchange="(value)=>{client_status_id=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">客户姓名</p>
            <input type="text" v-model="client_name" placeholder="输入客户姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">客户性别</p>
            <SelectBox placeholder="选择客户性别"  :groups="sexes" :group="client_sex" class="w-[281px]" @onchange="(value)=>{client_sex=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">客户年龄</p>
            <input type="number" v-model="client_age" placeholder="输入客户年龄" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">平台账号</p>
            <input type="text" v-model="platform_nickname" placeholder="输入平台账号" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
      </div>
      <div class="flex justify-center mt-[50px]">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" :class="{'bg-[#F0F0F0]':loading}" @onclick="submit"></IconMyButton>
      </div>
   </div>
</template>

<script>
import { defineComponent } from 'vue'
import {BIconArrowRepeat, BIconPlus, BIconTrash } from 'bootstrap-icons-vue';
import IconMyButton from '@/components/IconButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import moment from 'moment'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;
export default defineComponent({
  name: 'registercheck',
  components: {
    SelectBox,
    IconMyButton,
    BIconPlus,
    BIconTrash
  },
  props: {
    item: {
        type: Object,
        required: false,
        default: null
    }
  },
  data:()=>({
    VITE_BACKEND_URL,
    sexes:[
      {
        id:1,
        name:'男'
      },
      {
        id:2,
        name:'女'
      },
    ],
    platform_id:'',
    added_date:new Date(),
    department_id:'',
    group_id:'',
    sale_man:'',
    client_status_id:'',
    client_name:'',
    client_sex:'',
    client_age:'',
    platform_nickname:'',
    platforms:[],
    departments:[],
    statuses:[],
    groups:[],
    image:null,
    loading:false,
  }),
  watch: {
    item: function(newVal, oldVal) {
      if(this.item){
        this.platform_id=this.item.platform_id;
        this.added_date=this.item.added_date;
        this.group_id=this.item.group_id;
        this.department_id=this.item.group.department.id;
        this.sale_man=this.item.sale_man;
        this.client_status_id=this.item.client_status_id;
        this.client_name=this.item.client_name;
        this.client_sex=this.item.client_sex;
        this.client_age=this.item.client_age;
        this.platform_nickname=this.item.platform_nickname;
        this.image=this.item.photo;
        this.loading=false;
        this.selectDepartment(this.department_id);
      }else{
        this.platform_id='';
        this.department_id='',
        this.added_date=new Date();
        this.group_id='';
        this.sale_man='';
        this.client_status_id='';
        this.client_name='';
        this.client_sex='';
        this.client_age='';
        this.platform_nickname='';
        this.image=null;
        this.loading=false;
      }
    },
    departments:function(newVal, oldVal) {
      this.selectDepartment(this.department_id);
    },
  },
  mounted(){
    this.getList();
      if(this.item){
        this.platform_id=this.item.platform_id;
        this.added_date=this.item.added_date;
        this.group_id=this.item.group_id;
        this.department_id=this.item.group.department.id;
        this.sale_man=this.item.sale_man;
        this.client_status_id=this.item.client_status_id;
        this.client_name=this.item.client_name;
        this.client_sex=this.item.client_sex;
        this.client_age=this.item.client_age;
        this.platform_nickname=this.item.platform_nickname;
        this.image=this.item.photo;
        this.loading=false;
        this.selectDepartment(this.department_id);
      }
  },
  methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getList() {
      try {
        const response = await axios.get(`/checklist`);
        if(response.data.status==1){
          this.roles = response.data.roles;
          this.departments = response.data.departments;
          this.platforms = response.data.platforms;
          this.statuses = response.data.statuses;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    selectDepartment(value){
      this.department_id=value;
      for(let i=0;i<this.departments.length;i++){
        if(this.departments[i].id==value){
          this.groups=this.departments[i].group;
          return;
        }else if(i==this.departments.length-1){
          this.group_id='';
        }
      }
    },
    selectImage() {
      this.$refs.imageInput.click()
    },
    async uploadImage() {
      this.loading=true;
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
          this.image=response.data.image;
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      }
      finally{
        this.loading=false;
      };
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
        const response=await axios.post(`/editcheck/${id}`, {
            platform_id:this.platform_id,
            added_date:this.added_date,
            group_id:this.group_id,
            sale_man:this.sale_man,
            client_status_id:this.client_status_id,
            client_name:this.client_name,
            client_sex:this.client_sex,
            client_age:this.client_age,
            platform_nickname:this.platform_nickname,
            photo:this.image,
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
        const response=await axios.post('/createcheck', {
            platform_id:this.platform_id,
            added_date:this.added_date,
            group_id:this.group_id,
            sale_man:this.sale_man,
            client_status_id:this.client_status_id,
            client_name:this.client_name,
            client_sex:this.client_sex,
            client_age:this.client_age,
            platform_nickname:this.platform_nickname,
            photo:this.image,
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
        if(this.platform_id==''){
            this.message='平台是必需的';
            return false;
        }
        else if(this.added_date==''){
          this.message='新增日期是必需的';
            return false;
        }
        else if(this.department_id==''){
          this.message='部门是必需的';
            return false;
        }
        else if(this.group_id==''){
          this.message='业务室/组是必需的';
            return false;
        }
        else if(this.sale_man==''){
          this.message='业务员是必需的';
            return false;
        }
        else if(this.client_status_id==''){
          this.message='客户状态员是必需的';
            return false;
        }
        else if(this.client_name==''){
          this.message='客户姓名是必需的';
            return false;
        }
        else if(this.client_sex==''){
          this.message='客户性别是必需的';
            return false;
        }
        else if(this.client_age==''){
          this.message='客户年龄';
            return false;
        }

        else if(this.platform_nickname==''){
          this.message='平台账号';
            return false;
        }
        else if(this.image==''){
          this.message='头像';
            return false;
        }
        return true;
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