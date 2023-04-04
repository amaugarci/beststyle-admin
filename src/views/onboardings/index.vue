<template>
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
    </div>
    <div class="w-full px-[37px] mb-[106px]">
      <table class="w-full p-[1px]">
          <thead>
            <tr>
              <th class="w-[55px]">序号</th>
              <th>姓名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>国籍</th>
              <th>婚否</th>
              <th>入职时间</th>
              <th>岗位</th>
              <th>电话</th>
              <th>介绍人</th>
              <th>介绍人电话</th>
              <th>合同时间</th>
              <th>状态</th>
              <th class="w-[170px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td >{{ index+1 }}</td>
              <td v-if="Itemlist[index]">姓名</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">性别</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">年龄</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">国籍</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">婚否</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">入职时间</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">岗位</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">电话</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">介绍人</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">介绍人电话</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">合同时间</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">状态</td>
              <td v-else></td>
              <td v-if="Itemlist[index]" class="flex justify-around items-center text-[#0B88F9]">
                <button >冻结</button>
                <button >正常</button>
                <button ref="useredit"  @click="editUser(1)">编辑</button>
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
import Register from './register.vue'
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
    Register
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
    handleClickOutside(event) {
      if(this.showdialog){
        if((this.$refs.useredit && this.$refs.useredit[0].contains(event.target))|| this.$refs.dialog.$el.contains(event.target)){
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
    editUser(value){
      this.showdialog=true
    }
  }
})
</script>