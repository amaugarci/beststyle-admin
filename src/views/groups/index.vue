<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="分组管理" :active="false"></MyButton>
        <MyButton name="分组列表" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" v-model="name" placeholder="分组名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <IconMyButton icon="iconsearch" name="首页" @onclick="getGroups" ></IconMyButton>
        <IconMyButton v-if="getAdmin.permissions[6]" ref="addbutton"  @onclick="()=>{this.showAddGroup()}" icon="circleplus" name="添加部门" ></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>部门名称</th>
                <th>分组名称</th>
                <th>组长</th>
                <th>组内人数</th>
                <th>建组时间</th>
                <th v-if="getAdmin.permissions[6]" class="w-[172px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in groups" :key="item.id">
                <td >{{ index+1 }}</td>
                <td>{{item.department.name}}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.boss?item.boss.name:'-' }}</td>
                <td>{{ item.user.length }}</td>
                <td>
                  {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}
                </td>
                
                <td v-if="getAdmin.permissions[6]" class="flex justify-around items-center text-[#0B88F9]">
                  <button ref="useredit"  @click="showEditGroup(index)">编辑</button>
                  <button @click="()=>{showDeleteGroup(item.id)}" >删除</button>
                </td>
                <td v-else-if="getAdmin.permissions[6]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>

      <div ref="dialog" class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
      </div>
      <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="groups[itemid]" />
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
  name: 'groups',
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
    name:'',
    showdialog:false,
    list:Array(15).fill(0),
    groups:[],
    currentPage:1,
    totalPage:null,
    index:15,
    group:'',
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted() {
    this.getGroups();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },

  methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    moment: function () {
      return moment;
    },
    handleClickOutside(event) {
      if(this.showdialog){
        if(this.$refs.dialog.contains(event.target)){
          this.showdialog=false;
        }
      }
    },
    showDeleteGroup(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除分组`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteGroup(index);
          layer.close(i);
        },
      });
    },
    async deleteGroup(id) {
      try {
        const response = await axios.get(`/deletegroup/${id}`);
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
      this.getGroups();
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    showAddGroup(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditGroup(index){
      this.itemid=index;
      this.showdialog=true;
    },
    async getRoles() {
      try {
        const response = await axios.get(`/roles?page=${this.currentPage}&count=${this.index}`);
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
    async getGroups() {
      try {
        const response = await axios.get(`/groups?page=${this.currentPage}&count=${this.index}&name=${this.name}`);
        if(response.data.status==1){
          this.groups = response.data.groups.data;
          this.totalPage=response.data.groups.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    isAvailable(){
        if(this.getAdmin.permissions[6]!=null){
            return true;
        }
        return false;
    },
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getGroups();
    }
  }
})
</script>