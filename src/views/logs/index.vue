<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="日志管理" :active="false"></MyButton>
        <MyButton name="登录日志" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" v-model="name"  placeholder="用户ID" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <!-- <SelectBox  @onchange="changegroup" placeholder="分组"  :groups="groups" :group="group" class="w-[200px]"/> -->
        <IconMyButton icon="iconsearch" name="首页" @onclick="getLogs"></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>用户ID</th>
                <th>用户昵称</th>
                <th>分组</th>
                <th>IP地址</th>
                <th>登录时间</th>
                <th v-if="getAdmin.permissions[23]" class="w-[170px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in logs" :key="index">
                <td >{{ index+1 }}</td>
                <td v-if="item">{{ item.user.name }}</td>
                
                <td v-if="item">{{ item.user.realname }}</td>
                
                <td v-if="item">{{ item.user.group.name }}</td>
                
                <td v-if="item">{{ item.ip_address }}</td>
                
                <td v-if="item">
                  {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}
                </td>
                
                
                <td v-if="getAdmin.permissions[23]&&item" class="flex justify-around items-center text-[#0B88F9]">
                  <button @click="()=>{showDeleteLog(item.id)}">删除</button>
                  <!-- <button ref="useredit"  @click="editUser(1)">编辑</button> -->
                </td>
                <td v-else-if="getAdmin.permissions[23]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>
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
import Notfound from '@/views/notfound/index.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import moment from 'moment' 
export default defineComponent({
  name: 'logs',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
    Notfound
  },
  data:()=>({
    message:'',
    showdialog:false,
    list:Array(15).fill(0),
    logs:[],
    currentPage:1,
    totalPage:50,
    index:15,
    name:'',
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted(){
    this.getLogs();
  },
  methods:{
    moment: function () {
        return moment;
    },
    isAvailable(){
        if(this.getAdmin.permissions[24]!=null){
            return true;
        }
        return false;
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    async getLogs() {
      try {
        const response = await axios.get(`/logs?page=${this.currentPage}&count=${this.index}&name=${this.name}`);
        if(response.data.status==1){
          this.logs = response.data.logs.data;
          this.totalPage=response.data.logs.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    showDeleteLog(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除日志`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteLog(index);
          layer.close(i);
        },
      });
    },
    async deleteLog(id) {
      try {
        const response = await axios.get(`/deletelog/${id}`);
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
      this.getLogs();
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    changegroup(value){
      console.log(value);
      this.group=value;
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
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getLogs();
    }
  }
})
</script>