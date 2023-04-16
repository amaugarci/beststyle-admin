<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
    <div class="max-w-[1200px]">
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="账号管理" :active="false"></MyButton>
        <MyButton name="角色管理" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" v-model="searchrole" placeholder="角色名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <IconMyButton icon="iconsearch" name="首页" @onclick="getRoles" ></IconMyButton>
        <IconMyButton v-if="getAdmin.permissions[3]" ref="addbutton"  @onclick="()=>showAddRole()" icon="circleplus" name="添加角色" ></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>角色名称</th>
                <th>建组时间</th>
                <th v-if="getAdmin.permissions[3]" class="w-[172px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in roles" :key="index">
                <td >{{ index+1 }}</td>
                <td>{{item.name}}</td>
                <td>
                  {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}
                </td>
                <td  v-if="getAdmin.permissions[3]&&item" class="flex justify-around items-center text-[#0B88F9]">
                  <button ref="useredit"  @click="showEditRole(index)">编辑</button>
                  <button @click="()=>{showDeleteRole(item.id)}" >删除</button>
                </td>
                <td v-else-if="getAdmin.permissions[3]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>
    </div>
  </template>
  <div ref="dialog" class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
  </div>
  <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="roles[itemid]" />
  <Register @onSuccess="refresh" v-else :class="{'hidden':!showdialog}"  />
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
  name: 'roles',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
    Notfound,
    Register
  },
  data:()=>({
    list:Array(15).fill(0),
    message:'',
    showdialog:false,
    itemid:null,
    roles:[],
    currentPage:1,
    totalPage:null,
    index:15,
    group:'',
    searchrole:'',
    groups:[
      {
        id:1,
        name:'first'
      },
      {
        id:2,
        name:'twice'
      },
      {
        id:3,
        name:'third'
      }
    ],
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted(){
    this.getRoles();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods:{
    handleClickOutside(event) {
      if(this.showdialog){
        if(this.$refs.dialog.contains(event.target)){
          this.showdialog=false;
        }
      }
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    moment: function () {
      return moment;
    },
    showAddRole(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditRole(index){
      this.itemid=index;
      this.showdialog=true;
    },
    changepage(value){
      this.currentPage=value;
      this.getRoles();
    },
    showDeleteRole(id){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除角色`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteRole(id);
          layer.close(i);
        },
      });
    },
    async deleteRole(id) {
      try {
        const response = await axios.get(`/deleterole/${id}`);
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
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    async getRoles() {
      try {
        const response = await axios.get(`/roles?page=${this.currentPage}&count=${this.index}&role=${this.searchrole}`);
        if(response.data.status==1){
          this.roles = response.data.roles.data;
          this.totalPage=response.data.roles.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    isAvailable(){
        if(this.getAdmin.permissions[3]!=null){
            return true;
        }
        return false;
    },
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getRoles();
    }
  }
})
</script>