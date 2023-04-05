<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
       <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="日志管理" :active="false"></MyButton>
       <MyButton name="系统白名单" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <input type="text" placeholder="IP地址" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <IconMyButton  icon="iconsearch" name="首页" ></IconMyButton>
      <IconMyButton @onclick="()=>{showAddCate()}" icon="circleplus" name="添加IP地址" ></IconMyButton>
    </div>
    <div class="w-[1000px]  px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[55px]">序号</th>
              <th>IP地址</th>
              <th class="w-[170px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td >{{ index+1 }}</td>
              <td v-if="Itemlist[index]">127.0.0.1</td>
              <td v-else></td>
              <td v-if="Itemlist[index]" class="flex justify-around items-center text-[#0B88F9]">
                <button @click="()=>{showDeleteIp(1)}">删除</button>
                <button @click="()=>{showAddCate(1)}">编辑</button>
              </td>
              <td v-else></td>
            </tr>
          </tbody>
      </table>
      <Pagination :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
    </div>
    <div class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#000] opacity-[0.3]" v-if="showdialog">
    </div>
    <Register ref="dialog" :class="{'hidden':!showdialog}"/>
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
  name: 'ips',
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
  methods:{
    showAddCate(index=null){
      layer.config({
        skin: ''
      })
      if(index==null){
        layer.open({
          title:`添加IP地址`,
          content: `
              <input type="text" placeholder='IP地址' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            console.log(layero.find('input').val());
            layer.close(i);
          },
        });
      }else{
        layer.open({
          title:`编辑IP地址`,
          content: `
              <input type="text" placeholder='IP地址' class='inputPayment' >`,
          btn:['确定','取消'],
          closeBtn: 0,
          shadeClose: 1,
          yes: (i, layero) => {
            console.log(layero.find('input').val());
            layer.close(i);
          },
        });
      }
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
          layer.close(i);
        },
      });
    },
    changepage(value){
      this.currentPage=value;
    },
    onchangePage(value){
        this.index=value;
        this.list=Array(Number(value)).fill(0);
    },
  }
})
</script>