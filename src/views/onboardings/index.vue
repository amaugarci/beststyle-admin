<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="入职管理" :active="false"></MyButton>
        <MyButton name="职员列表" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" placeholder="姓名" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <SelectBox placeholder="部门"  :groups="groups" :group="group" class="w-[200px]"/>
        <SelectBox placeholder="分组"  :groups="groups" :group="group"/>
        <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
        <IconMyButton v-if="getAdmin.permissions[8]" ref="addbutton"  @onclick="()=>showAddStaff()" icon="circleplus" name="添加职员" ></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>姓名</th>
                <th>部门</th>
                <th>分组</th>
                <th>性别</th>
                <th>年龄</th>
                <th>国籍</th>
                <th>婚否</th>
                <th>岗位</th>
                <th>电话</th>
                <th>介绍人</th>
                <th>介绍人电话</th>
                <th>合同时间</th>
                <th>入职时间</th>
                <th>状态</th>
                <th v-if="getAdmin.permissions[8]" class="w-[170px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <td >{{ index+1 }}</td>
                <td v-if="staffs[index]">{{ staffs[index].name }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].group.department.name }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].group.name }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].sex==1?'男':'女' }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].age }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].country }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].married==1?'已婚':'未婚' }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].mail }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].phone }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].refername }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].referphone }}</td>
                <td v-else></td>
                <td v-if="staffs[index]">
                  {{staffs[index].period}}
                </td>
                <td v-else></td>
                <td v-if="staffs[index]">
                  {{moment().utc(new Date(staffs[index].created_at)).local().format("yyyy-MM-DD") }}
                </td>
                <td v-else></td>
                <td v-if="staffs[index]">{{ staffs[index].status==1?'在职':'离职' }}</td>
                <td v-else></td>
                <td v-if="getAdmin.permissions[8]&&staffs[index]" class="flex justify-around items-center text-[#0B88F9]">
                  <button @click="()=>{showDeleteStaff(staffs[index].id)}" >删除</button>
                  <button ref="useredit"  @click="showEditStaff(index)">编辑</button>
                </td>
                <td v-else-if="getAdmin.permissions[8]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>
      <div class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
      </div>
      <div ref="dialog" class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
        </div>
      <Register @onSuccess="refresh" v-if="itemid!=null" :class="{'hidden':!showdialog}" :item="staffs[itemid]" />
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
  name: 'onboardings',
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
    itemid:null,
    message:'',
    showdialog:false,
    list:Array(15).fill(0),
    staffs:[],
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
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted() {
    this.getStaffs();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },

  methods:{
    ...mapActions(useAuthStore, ['fetchAdmin']),
    handleClickOutside(event) {
      if(this.showdialog){
        if(this.$refs.dialog.contains(event.target)){
          this.showdialog=false;
        }
      }
    },
    moment: function () {
      return moment;
    },
    isAvailable(){
        if(this.getAdmin.permissions[8]!=null){
            return true;
        }
        return false;
    },
    showAddStaff(){
      this.showdialog=true;
      this.itemid=false;
    },
    showEditStaff(index){
      this.itemid=index;
      this.showdialog=true;
    },
    async getStaffs() {
      try {
        const response = await axios.get(`/staffs?page=${this.currentPage}&count=${this.index}`);
        if(response.data.status==1){
          this.staffs = response.data.staffs.data;
          this.totalPage=response.data.staffs.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    showDeleteStaff(id){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除职员`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteStaff(id);
          layer.close(i);
        },
      });
    },
    async deleteStaff(id) {
      try {
        const response = await axios.get(`/deletestaff/${id}`);
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
      this.getStaffs();
    },
    onchangePage(value){
        this.index=value;
        this.list=Array(Number(value)).fill(0);
    },
    editUser(value){
      this.showdialog=true
    },
    refresh(){
      this.showdialog=false;
      this.currentPage=1;
      this.getStaffs();
    },
  }
})
</script>