<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
    <div class="max-w-[1200px]">
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="查重管理" :active="false"></MyButton>
        <MyButton name="状态列表" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input type="text" placeholder="状态名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
        <IconMyButton  v-if="getAdmin.permissions[14]" ref="addbutton"  @onclick="()=>showAddDepartment()" icon="circleplus" name="添加状态" ></IconMyButton>
      </div>
      <div class="w-full px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>状态名称</th>
                <th>建组时间</th>
                <th  v-if="getAdmin.permissions[14]" class="w-[172px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <td >{{ index+1 }}</td>
                <td v-if="states[index]">{{ states[index].name }}</td>
                <td v-else></td>
                <td v-if="states[index]">
                  {{moment().utc(new Date(states[index].created_at)).local().format("yyyy-MM-DD") }}
                </td>
                <td v-else></td>
                <td v-if="getAdmin.permissions[14]&&states[index]" class="flex justify-around items-center text-[#0B88F9]">
                  <button ref="useredit"  @click="showAddDepartment(index)">编辑</button>
                  <button @click="()=>{showDeleteGroup(states[index].id)}" >删除</button>
                </td>
                <td v-else-if="getAdmin.permissions[14]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>
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
  name: 'departments',
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
    list:Array(15).fill(0),
    states:[],
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
  mounted(){
    this.getStates();
  },
  methods:{
    moment: function () {
        return moment;
    },
    isAvailable(){
        if(this.getAdmin.permissions[14]!=null){
            return true;
        }
        return false;
    },
    async getStates() {
      try {
        const response = await axios.get(`/states?page=${this.currentPage}&count=${this.index}`);
        if(response.data.status==1){
          this.states = response.data.states.data;
          this.totalPage=response.data.states.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    showAddDepartment(index=null){
      layer.config({
        skin: ''
      })
      if(index==null){
        layer.open({
          title:`添加状态`,
          content: `
              <input type="text" placeholder='状态名称' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.goCreate(layero.find('input').val());
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`编辑状态`,
          content: `
              <input type="text" placeholder='状态名称'  value='${this.states[index].name}' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.goEdit(layero.find('input').val(),this.states[index].id);
            layer.close(i);
          },
        });
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
          layer.close(i);
          this.deleteDepartment(index);
        },
      });
    },
    async goCreate(name){
      try{
        const response=await axios.post('/createstate', {
            name:name,
        });
        if(response.status==422){
            this.message='请输状态名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='请输状态名';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async goEdit(name,id){
      try{
        const response=await axios.post(`/editstate/${id}`, {
            name:name,
        });
        if(response.status==422){
            this.message='请输状态名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='请输状态名';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
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
    changepage(value){
      this.currentPage=value;
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
    },
    async deleteStates(id) {
      try {
        const response = await axios.get(`/deletestate/${id}`);
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
    refresh(){
      this.currentPage=1;
      this.getStates();
    }
  }
})
</script>