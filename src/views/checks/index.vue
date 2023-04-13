<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="查重管理" :active="false"></MyButton>
        <MyButton name="查重列表" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" placeholder="账号" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <SelectBox @onchange="changegroup" placeholder=" 选择平台"  :groups="groups" :group="group" class="w-[200px]"/>
        <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
        <IconMyButton v-if="getAdmin.permissions[13]" ref="addbutton"  @onclick="()=>{showAddCheck()}" icon="circleplus" name="添加培训" ></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>业务组</th>
                <th>业务员</th>
                <th>平台</th>
                <th>平台账号</th>
                <th>客户姓名</th>
                <th>客户性别</th>
                <th>客户年龄</th>
                <!-- <th>平台账号</th> -->
                <th>客户状态</th>
                <th>新增日期</th>
                <th class="w-[172px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <td >{{ index+1 }}</td>
                <td v-if="checks[index]">{{ checks[index].group.name}}</td>
                <td v-else></td>
                <td v-if="checks[index]">{{ checks[index].sale_man }}</td>
                <td v-else></td>
                <td v-if="checks[index]">{{ checks[index].platform.name }}</td>
                <td v-else></td>
                <td v-if="checks[index]">{{ checks[index].platform_nickname }}</td>
                <td v-else></td>
                <td v-if="checks[index]">{{ checks[index].client_name }}</td>
                <td v-else></td>
                <td v-if="checks[index]">{{ checks[index].client_sex==1?'男':'女' }}</td>
                <td v-else></td>
                <td v-if="checks[index]">{{ checks[index].client_age }}</td>
                <td v-else></td>
                <!-- <td v-if="checks[index]">{{ checks[index].platform_nickname }}</td>
                <td v-else></td> -->
                <td v-if="checks[index]">{{ checks[index].client_status.name }}</td>
                <td v-else></td>
                <td v-if="checks[index]">
                 {{moment().utc(new Date(checks[index].added_date)).local().format("yyyy-MM-DD") }}
                </td>
                <td v-else></td>
                <td v-if="checks[index]" class="flex justify-around items-center text-[#0B88F9]">
                  <button ref="useredit"  @click="()=>goComment(checks[index].id)">评论</button>
                  <button ref="useredit"  @click="showEditCheck(index)">编辑</button>
                  <button @click="()=>showDeleteCheck(checks[index].id)">删除</button>
                </td>
                <td v-else></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>
      <div ref="dialog" class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
      </div>
      <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="checks[itemid]" />
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
  name: 'checks',
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
    showdialog:false,
    list:Array(15).fill(0),
    checks:[],
    itemid:null,
    currentPage:1,
    totalPage:null,
    index:15,
    group:'',
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
    itemid:null,
  }),
  mounted() {
    this.getChecks();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  methods:{
    moment: function () {
        return moment;
    },
    ...mapActions(useAuthStore, ['fetchAdmin']),
    showAddCheck(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditCheck(index){
      this.itemid=index;
      this.showdialog=true;
    },
    async getChecks() {
      try {
        const response = await axios.get(`/checks?page=${this.currentPage}&count=${this.index}`);
        if(response.data.status==1){
          this.checks = response.data.checks.data;
          this.totalPage=response.data.checks.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    isAvailable(){
        if(this.getAdmin.permissions[13]!=null){
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
    goComment(value){
      this.$router.push({ name: 'checkcomments', params: { id:value, }});
    },
    showDeleteCheck(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除查重`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deletecheck(index);
          layer.close(i);
        },
      });
    },
    async deletecheck(id) {
      try {
        const response = await axios.get(`/deletecheck/${id}`);
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
      this.getChecks();
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getChecks();
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