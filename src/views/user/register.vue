<template>
   <div class="absolute z-[99991] px-[29px] py-[18px] w-[980px] h-[700px] bg-[#FFFFFF] top-[300px] left-1/2 -translate-x-1/2">
      <div class="flex items-center">
        <img src="../../../src/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加用户</p>
      </div>
      <div class="mt-[53px] grid grid-cols-2 w-[900px] ">
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">用户名</p>
            <input type="text" placeholder="输入用户名" v-model="name" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">密码</p>
            <input type="text" placeholder="输入密码" v-model="password" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">姓名</p>
            <input type="text" placeholder="输入姓名" v-model="realname" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">状态</p>
            <SelectBox placeholder="选择状态"  :groups="statuses" :group="status" class="w-[281px]" @onchange="(value)=>{status=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">部门</p>
            <SelectBox placeholder="选择部门"  :groups="departments" :group="department_id" @onchange="(value)=>{selectDepartment(value)}" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">分组</p>
            <SelectBox placeholder="选择分组"  :groups="groups" :group="group_id" @onchange="(value)=>{group_id=value}" class="w-[281px]"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">角色</p>
            <SelectBox placeholder="输入角色"  :groups="roles" :group="role_id" class="w-[281px]" @onchange="(value)=>{role_id=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">IP地址</p>
            <input type="text" placeholder="输入IP地址" v-model="ip_address" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">地区</p>
            <input type="text" placeholder="输入地区" v-model="region" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
      </div>
      <div class="flex justify-center">
        <IconMyButton icon="none" name="确定" class="ml-[37px] w-[153px]" @onclick="submit"></IconMyButton>
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
  name: 'registeruser',
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
        this.realname=this.item.realname;
        this.department_id=this.item.group.department.id;
        this.group_id=this.item.group_id;
        this.status=this.item.status;
        this.role_id=this.item.role.id;
        this.ip_address=this.item.ip_address;
        this.region=this.item.region;
        this.selectDepartment(this.department_id);
      }else{
        this.name='';
        this.realname='';
        this.department_id='';
        this.group_id='';
        this.status='';
        this.role_id='';
        this.ip_address='';
        this.region='';
        this.message='';
        this.groups=[];
      }
    },
    departments:function(newVal, oldVal) {
      this.selectDepartment(this.department_id);
    }
  },
  mounted(){
    this.getList();
    this.password='';
      if(this.item){
        this.name=this.item.name;
        this.realname=this.item.realname;
        this.department_id=this.item.group.department.id;
        this.group_id=this.item.group_id;
        this.status=this.item.status;
        this.role_id=this.item.role.id;
        this.ip_address=this.item.ip_address;
        this.region=this.item.region;
        this.selectDepartment(this.department_id);
      }
  },
  data:()=>({
    statuses:[
      {
        id:1,
        name:'正常'
      },
      {
        id:2,
        name:'冻结'
      },
    ],
    password:'',
    roles:[],
    departments:[],
    groups:[],
    name:'',
    realname:'',
    department_id:'',
    group_id:'',
    status:'',
    role_id:'',
    ip_address:'',
    region:'',
    message:'',
  }),
  methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getList() {
      try {
        const response = await axios.get(`/list`);
        if(response.data.status==1){
          this.roles = response.data.roles;
          this.departments = response.data.departments;
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
        }
      }
    },
    submit(){
      if(this.item){
        this.goEdit(this.item.id);
      }else{
        this.goCreate();
      }
    },
    async goEdit(id){
      if(!this.editValidation()){
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post(`/edituser/${id}`, {
            name:this.name,
            password:this.password,
            realname:this.realname,
            group_id:this.group_id,
            status:this.status,
            role_id:this.role_id,
            ip_address:this.ip_address,
            region:this.region,
        });
        if(response.status==422){
            if(response.data.errors.ip_address){
              this.message='无效的IP地址';
              this.showDialog();
            }else{
              this.message='名称已被使用';
              this.showDialog();
            }
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }else{
            this.message='名称已被使用';
            this.showDialog();
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
        if(this.password==''){
          this.message='密码是必需的';
          this.showDialog();
          return;
        }
        const response=await axios.post('/createuser', {
            name:this.name,
            password:this.password,
            realname:this.realname,
            group_id:this.group_id,
            status:this.status,
            role_id:this.role_id,
            ip_address:this.ip_address,
            region:this.region,
        });
        if(response.status==422){
            if(response.data.errors.ip_address){
              this.message='无效的IP地址';
              this.showDialog();
            }else{
              this.message='名称已被使用';
              this.showDialog();
            }
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.$emit('onSuccess', event);
        }
        else{
            this.message='名称已被使用';
            this.showDialog();
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
        else if(this.password==''){
          this.message='密码是必需的';
            return false;
        }
        else if(this.realname==''){
          this.message='姓名是必需的';
            return false;
        }
        else if(this.status==''){
          this.message='状态是必需的';
            return false;
        }
        else if(this.department_id==''){
          this.message='部门是必需的';
            return false;
        }
        else if(this.group_id==''){
          this.message='分组是必需的';
            return false;
        }
        else if(this.role_id==''){
          this.message='角色是必需的';
            return false;
        }
        else if(this.ip_address==''){
          this.message='IP地址是必需的';
            return false;
        }
        else if(this.region==''){
          this.message='地区是必需的';
            return false;
        }
        return true;
    },
    editValidation(){
        if(this.name==''){
            this.message='用户是必需的';
            return false;
        }
        else if(this.realname==''){
          this.message='姓名是必需的';
            return false;
        }
        else if(this.status==''){
          this.message='状态是必需的';
            return false;
        }
        else if(this.department_id==''){
          this.message='部门是必需的';
            return false;
        }
        else if(this.group_id==''){
          this.message='分组是必需的';
            return false;
        }
        else if(this.role_id==''){
          this.message='角色是必需的';
            return false;
        }
        else if(this.ip_address==''){
          this.message='IP地址是必需的';
            return false;
        }
        else if(this.region==''){
          this.message='地区是必需的';
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