<template>
  <div class="max-w-[1200px]">
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="查重管理" :active="false"></MyButton>
       <MyButton name="类目列表" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <input type="text" placeholder="类目名称" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
      <IconMyButton ref="addbutton"  @onclick="()=>showAddDepartment()" icon="circleplus" name="添加类目" ></IconMyButton>
    </div>
    <div class="w-full px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[55px]">序号</th>
              <th>类目名称</th>
              <th>建组时间</th>
              <th class="w-[172px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td >{{ index+1 }}</td>
              <td v-if="Itemlist[index]">类目名称</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">建组时间</td>
              <td v-else></td>
              <td v-if="Itemlist[index]" class="flex justify-around items-center text-[#0B88F9]">
                <button ref="useredit"  @click="showAddDepartment(1)">编辑</button>
                <button @click="()=>{showDeleteGroup(1)}" >删除</button>
              </td>
              <td v-else></td>
            </tr>
          </tbody>
      </table>
      <Pagination :index="index" :currentPage="currentPage" :totalItems="totalPage" @onClick="changepage" @onchangePage="onchangePage"/>
    </div>
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
  name: 'departments',
  components: {
    BIconArrowRepeat,
    IEcharts,
    MyButton,
    IconMyButton,
    Pagination,
    SelectBox,
  },
  data:()=>({
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
    showAddDepartment(index=null){
      layer.config({
        skin: ''
      })
      if(index==null){
        layer.open({
          title:`添加类目`,
          content: `
              <input type="text" placeholder='类目名称' class='inputPayment' >`,
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
          title:`编辑类目`,
          content: `
              <input type="text" placeholder='类目名称' class='inputPayment' >`,
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
        },
      });
    },
    changepage(value){
      this.currentPage=value;
    },
    onchangePage(value){
        this.index=value;
        this.list=Array(Number(value)).fill(0);
    }
  }
})
</script>