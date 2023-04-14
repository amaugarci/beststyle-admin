<template>
  <template v-if="!getAdmin">
  </template>
  <Notfound v-else-if="!isAvailable()"/>
  <template v-else>
      <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
        <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
        <MyButton name="日志管理" :active="false"></MyButton>
        <MyButton name="系统白名单" :active="true"></MyButton>
      </div>
      <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
        <input v-model="ip" type="text" placeholder="IP地址" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
        <IconMyButton  icon="iconsearch" name="首页"  @onclick="getIps"></IconMyButton>
        <IconMyButton v-if="getAdmin.permissions[24]" @onclick="()=>{showAddCate()}" icon="circleplus" name="添加IP地址" ></IconMyButton>
      </div>
      <div class="w-[1000px]  px-[37px] mb-[106px]">
        <table class="w-full p-[1px]">
            <thead>
              <tr>
                <th class="w-[55px]">序号</th>
                <th>IP地址</th>
                <th>状态</th>
                <th v-if="getAdmin.permissions[24]" class="w-[170px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list" :key="index">
                <td >{{ index+1 }}</td>
                <td v-if="ips[index]">{{ ips[index].ip_address }}</td>
                <td v-else></td>
                <td v-if="ips[index]" :class="{'text-[#FF0044]':ips[index].status!=1}">{{ips[index].status==1?'允许':'冷冻'}}</td>
                <td v-else></td>
                <td v-if="getAdmin.permissions[24]&&ips[index]" class="flex justify-around items-center text-[#0B88F9]">
                  <button v-if="ips[index].status!=1"  @click="()=>{showChangeIps(ips[index].id,true)}">允许</button>
                  <button v-else class="text-[#FF0044]" @click="()=>{showChangeIps(ips[index].id,false)}">冷冻</button>
                  <button @click="()=>{showDeleteIp(ips[index].id)}">删除</button>
                  <button @click="()=>{showAddCate(index)}">编辑</button>
                </td>
                <td v-else-if="getAdmin.permissions[24]"></td>
              </tr>
            </tbody>
        </table>
        <Pagination v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
      </div>
      <div class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
      </div>
      <Register ref="dialog" :class="{'hidden':!showdialog}"/>
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
  name: 'ips',
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
    showdialog:false,
    list:Array(15).fill(0),
    ips:[],
    currentPage:1,
    totalPage:null,
    index:15,
    ip:''
  }),
  computed: {
      ...mapState(useAuthStore, ['getAdmin']),
  },
  mounted(){
    this.getIps();
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
    async getIps() {
      try {
        const response = await axios.get(`/ips?page=${this.currentPage}&count=${this.index}&ip=${this.ip}`);
        if(response.data.status==1){
          this.ips = response.data.ips.data;
          this.totalPage=response.data.ips.total;
        }else{
          this.fetchAdmin();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    showAddCate(index=null){
      layer.config({
        skin: ''
      })
      if(index==null){
        layer.open({
          title:`添加IP地址`,
          content: `
              <div class="flex justify-around">
                <div class="flex items-center mb-4">
                      <input type="radio" name='type' value="1" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" checked="">
                      <label class="text-sm font-medium text-gray-900 ml-2 block">
                        允许 
                      </label>
                  </div>
                  <div class="flex items-center mb-4">
                      <input type="radio" name='type'  value="2" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" >
                      <label class="text-sm font-medium text-gray-900 ml-2 block">
                        冷冻
                      </label>
                  </div>
              </div>
              <input type="text" placeholder='IP地址' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            const status=Number(document.querySelector('input[name="type"]:checked').value);
            const name = layero.find('input[type="text"]').val();
            this.goCreate(name, status);
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`编辑IP地址`,
          content: `
              <div class="flex justify-around">
                <div class="flex items-center mb-4">
                      <input type="radio" name='type' value="1" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" ${this.ips[index].status==1?'checked':''}>
                      <label class="text-sm font-medium text-gray-900 ml-2 block">
                        允许 
                      </label>
                  </div>
                  <div class="flex items-center mb-4">
                      <input type="radio" name='type'  value="2" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" ${this.ips[index].status!=1?'checked':''} >
                      <label class="text-sm font-medium text-gray-900 ml-2 block">
                        冷冻
                      </label>
                  </div>
              </div>
              <input type="text" placeholder='IP地址' value='${this.ips[index].ip_address}' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            const status=Number(document.querySelector('input[name="type"]:checked').value);
            const name = layero.find('input[type="text"]').val();
            this.goEdit(name,this.ips[index].id,status);
            layer.close(i);
          },
        });
      }
    },
    async goCreate(name,status){
      try{
        const response=await axios.post('/createip', {
            name:name,
            status:status
        });
        if(response.status==422){
            this.message='IP地址不正确';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='IP地址不正确';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async goEdit(name,id,status){
      try{
        const response=await axios.post(`/editip/${id}`, {
            name:name,
            status:status
        });
        if(response.status==422){
            this.message='请输部门名';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.refresh();
        }
        else{
            this.message='请输部门名';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    showChangeIps(index, flag){
      layer.config({
        skin: ''
      })
      if(flag){
        layer.open({
          title:`允许IP地址`,
          content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>真的很想允许?</span>`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.changeStatus(index, 1);
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`冷冻IP地址`,
          content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>真的很想冷冻?</span>`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            this.changeStatus(index, 2);
            layer.close(i);
          },
        });
      }
    },
    async changeStatus(id,status) {
      try {
        const response = await axios.get(`/changeip/${id}?status=${status}`);
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
    showDeleteIp(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除IP地址`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deleteIp(index);
          layer.close(i);
        },
      });
    },
    async deleteIp(id) {
      try {
        const response = await axios.get(`/deleteip/${id}`);
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
      this.getIps();
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
        this.list=Array(Number(value)).fill(0);
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
      this.getIps();
    }
  }
})
</script>