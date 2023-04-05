<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
       <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="日志管理" :active="false"></MyButton>
       <MyButton name="登录日志" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <input type="text" placeholder="用户ID" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <SelectBox  @onchange="changegroup" placeholder="分组"  :groups="groups" :group="group" class="w-[200px]"/>
      <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
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
              <th>预览权限</th>
              <th class="w-[170px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td >{{ index+1 }}</td>
              <td v-if="Itemlist[index]">用户ID</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">用户昵称</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">分组</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">IP地址</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">登录时间</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">预览权限</td>
              <td v-else></td>
              <td v-if="Itemlist[index]" class="flex justify-around items-center text-[#0B88F9]">
                <button @click="()=>{showDeleteLog(1)}">删除</button>
                <!-- <button ref="useredit"  @click="editUser(1)">编辑</button> -->
              </td>
              <td v-else></td>
            </tr>
          </tbody>
      </table>
      <Pagination :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconArrowRepeat } from 'bootstrap-icons-vue';
import IEcharts from 'vue3-echarts-v3/src/full.js';
import MyButton from '@/components/Button.vue'
import IconMyButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import SelectBox from '@/components/SelectBox.vue'
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
  },
  data:()=>({
    showdialog:false,
    list:Array(15).fill(0),
    Itemlist:Array(4).fill(1),
    currentPage:1,
    totalPage:50,
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
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },

  methods:{
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
          layer.close(i);
        },
      });
    },
    handleClickOutside(event) {
      if(this.showdialog){
        if((this.$refs.useredit && `${this.$refs.useredit[0]}`==`${event.target}`) || this.$refs.dialog.$el.contains(event.target)){
        }else{
          this.showdialog=false;
        }
      }
    },
    changepage(value){
      this.currentPage=value;
    },
    onchangePage(value){
        this.index=value;
        this.list=Array(Number(value)).fill(0);
    },
    changegroup(value){
      console.log(value);
      this.group=value;
    },
    editUser(value){
      this.showdialog=true
    }
  }
})
</script>