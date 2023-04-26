<template>
  <div class="ml-[103px] fixed z-[99991] px-[29px] py-[18px] w-[980px] h-[500px] bg-[#FFFFFF] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">
      <div class="flex items-center">
        <img src="/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加用户</p>
      </div>
      <div class="mt-[53px] grid grid-cols-2 w-[900px] ">
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">姓名</p>
            <input type="text" placeholder="输入姓名" v-model="name" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">性别</p>
            <SelectBox placeholder="选择性别"  :groups="sexes" :group="sex" class="w-[281px]"  @onchange="(value)=>{sex=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">部门</p>
            <SelectBox placeholder="选择部门"  :groups="departments" :group="department_id" class="w-[281px]" @onchange="(value)=>{selectDepartment(value)}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">分组</p>
            <SelectBox placeholder="选择分组"  :groups="groups" :group="group_id" class="w-[281px]" @onchange="(value)=>{group_id=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">年龄</p>
            <input type="number" placeholder="输入年龄" v-model="age" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">国籍</p>
            <input type="text" placeholder="输入国籍" v-model="country" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">婚否	</p>
            <SelectBox placeholder="选择婚否"  :groups="marries" :group="married" class="w-[281px]" @onchange="(value)=>{married=value}"/>
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">岗位</p>
            <input type="text" placeholder="输入岗位" v-model="mail" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">电话</p>
            <input type="text" placeholder="输入电话" v-model="phone" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">介绍人</p>
            <input type="text" placeholder="输入介绍人" v-model="refername" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">介绍人电话</p>
            <input type="text" placeholder="输入介绍人电话" v-model="referphone" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center ">
            <p class="font-black mr-[17px]">合同时间</p>
            <input type="text" placeholder="输入合同时间" v-model="period" class="border solid border-gray-300 p-2 rounded-[12px] w-[281px] h-[41px] mr-[28px]">
        </div>
        <div class="flex flex-row gap-[6px] justify-end my-[30px] ml-[37px] items-center">
            <p class="font-black mr-[17px]">状态	</p>
            <SelectBox placeholder="选择状态"  :groups="statuses" :group="status" class="w-[281px]" @onchange="(value)=>{status=value}"/>
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
  name: 'registeronboarding',
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
      if(this.item){
        this.name=this.item.name;
        this.sex=this.item.sex;
        this.department_id=this.item.group.department.id;
        this.group_id=this.item.group.id;
        this.age=this.item.age;
        this.country=this.item.country;
        this.married=this.item.married;
        this.mail=this.item.mail;
        this.phone=this.item.phone;
        this.refername=this.item.refername;
        this.referphone=this.item.referphone;
        this.period=this.item.period;
        this.status=this.item.status;
        this.selectDepartment(this.department_id);
      }else{
        this.name='';
        this.sex='';
        this.department_id='';
        this.group_id='';
        this.age='';
        this.country='';
        this.married='';
        this.mail='';
        this.phone='';
        this.refername='';
        this.referphone='';
        this.period='';
        this.status='';
        this.groups=[];
      }
    },
    departments:function(newVal, oldVal) {
      this.selectDepartment(this.department_id);
    }
  },
  mounted(){
    this.getList();
      if(this.item){
        this.name=this.item.name;
        this.sex=this.item.sex;
        this.department_id=this.item.group.department.id;
        this.group_id=this.item.group.id;
        this.age=this.item.age;
        this.country=this.item.country;
        this.married=this.item.married;
        this.mail=this.item.mail;
        this.phone=this.item.phone;
        this.refername=this.item.refername;
        this.referphone=this.item.referphone;
        this.period=this.item.period;
        this.status=this.item.status;
        this.selectDepartment(this.department_id);
      }
  },
  data:()=>({
    statuses:[
      {
        id:1,
        name:'在职'
      },
      {
        id:2,
        name:'离职'
      },
    ],
    marries:[
      {
        id:1,
        name:'已婚'
      },
      {
        id:2,
        name:'未婚'
      },
    ],
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
    departments:[],
    groups:[],
    name:'',
    sex:'',
    department_id:'',
    group_id:'',
    age:'',
    country:'',
    married:'',
    mail:'',
    phone:'',
    refername:'',
    referphone:'',
    period:'',
  }),
  methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getList() {
      try {
        const response = await axios.get(`/stafflist`);
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
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post(`/editstaff/${id}`, {
            name:this.name,
            sex:this.sex,
            group_id:this.group_id,
            age:this.age,
            country:this.country,
            status:this.status,
            married:this.married,
            mail:this.mail,
            phone:this.phone,
            refername:this.refername,
            referphone:this.referphone,
            period:this.period,
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
        const response=await axios.post('/createstaff', {
            name:this.name,
            sex:this.sex,
            group_id:this.group_id,
            age:this.age,
            country:this.country,
            status:this.status,
            married:this.married,
            mail:this.mail,
            phone:this.phone,
            refername:this.refername,
            referphone:this.referphone,
            period:this.period,
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
        else if(this.sex==''){
          this.message='性别是必需的';
            return false;
        }
        else if(this.age==''){
          this.message='年龄是必需的';
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
        else if(this.country==''){
          this.message='国籍是必需的';
            return false;
        }
        else if(this.married==''){
          this.message='婚否是必需的';
            return false;
        }
        else if(this.mail==''){
          this.message='岗位是必需的';
            return false;
        }

        else if(this.phone==''){
          this.message='电话是必需的';
            return false;
        }
        else if(this.refername==''){
          this.message='介绍人是必需的';
            return false;
        }
        else if(this.referphone==''){
          this.message='介绍人电话是必需的';
            return false;
        }
        else if(this.period==''){
          this.message='合同时间是必需的';
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