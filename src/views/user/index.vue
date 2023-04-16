<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="账号管理" :active="false"></MyButton>
        <MyButton name="用户管理" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" v-model="search.name" placeholder="用户ID" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <input type="text" v-model="search.realname" placeholder="用户姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <!-- <SelectBox placeholder="分组"  :groups="groups" :group="group"/> -->
        <IconMyButton  @onclick="getUsers" icon="iconsearch" name="首页" ></IconMyButton>
        <IconMyButton v-if="getAdmin.permissions[2]" ref="addbutton"  @onclick="()=>showAddUser()" icon="circleplus" name="添加用户" ></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>用户名</th>
                <th>姓名</th>
                <th>部门</th>
                <th>分组</th>
                <th>状态</th>
                <th>角色</th>
                <th>管理员</th>
                <th>IP地址</th>
                <th>地区</th>
                <th  v-if="getAdmin.permissions[2]" class="w-[170px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in users" :key="index">
                <td >{{ index+1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.realname }}</td>
                <td>{{ item.group.department.name }}</td>
                <td>{{item.group.name}}</td>
                <td>{{ item.status!=1?'冻结':'正常' }}</td>
                <td>{{ item.role.name }}</td>
                <td>{{ item.admin?item.admin.name:'-' }}</td>
                <td>{{  item.ip_address }}</td>
                <td>{{ item.region }}</td>                
                <td  v-if="getAdmin.permissions[2]" class="flex justify-around items-center text-[#0B88F9]">
                  <button @click="()=>showChangeUser( item.id, true)" >冻结</button>
                  <button @click="()=>showChangeUser( item.id, false)">正常</button>
                  <button ref="useredit"  @click="showEditUser(index)">编辑</button>
                </td>
                <td v-else-if="getAdmin.permissions[2]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>

      <div ref="dialog" class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
      </div>
      <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="users[itemid]" />
      <Register @onSuccess="refresh" v-else :class="{'hidden':!showdialog}"  />
  </template>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import IconMyButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import Register from './register.vue'
import { mapState, mapActions } from 'pinia'
import Notfound from '@/views/notfound/index.vue'
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'user',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
    Register,
    Notfound
  },
  data:()=>({
    search:{
      name:'',
      realname:'',
    },
    itemid:null,
    message:'',
    showdialog:false,
    list:Array(15).fill(0),
    users:[],
    currentPage:1,
    totalPage:null,
    index:15,
    group:'',
    groups:[],
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted() {
    this.getUsers();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods:{
    showAddUser(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditUser(index){
      this.itemid=index;
      this.showdialog=true;
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getUsers() {
      try {
        const response = await axios.get(`/users?page=${this.currentPage}&count=${this.index}&name=${this.search.name}&realname=${this.search.realname}`);
        if(response.data.status==1){
          this.users = response.data.users.data;
          this.totalPage=response.data.users.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    isAvailable(){
        if(this.getAdmin.permissions[2]!=null){
            return true;
        }
        return false;
    },
    handleClickOutside(event) {
      if(this.showdialog){
        if(this.$refs.dialog.contains(event.target)){
          this.showdialog=false;
        }
      }
    },
    showChangeUser(index, flag){
      layer.config({
        skin: ''
      })
      if(flag){
        layer.open({
          title:`冻结用户`,
          content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>真的很想冻结?</span>`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.changeStatus(index, 2);
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`正常用户`,
          content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>真的很想正常?</span>`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.changeStatus(index, 1);
            layer.close(i);
          },
        });
      }
    },
    async changeStatus(id,status) {
      try {
        const response = await axios.get(`/changeuser/${id}?status=${status}`);
        if(response.data.status==1){
          layer.config({
            skin: ''
          })
          layer.msg("操作成功");
          this.refresh();
        }else{
          this.message='网络错误';
          this.showDialog();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    changepage(value){
      this.currentPage=value;
      this.getUsers();
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getUsers();
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
  }
})
</script>