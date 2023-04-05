<template>
    <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
      <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
       <MyButton name="分组管理" :active="false"></MyButton>
       <MyButton name="分组列表" :active="true"></MyButton>
    </div>
    <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
      <input type="text" placeholder="账号" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
      <SelectBox @onchange="changegroup" placeholder=" 选择平台"  :groups="groups" :group="group" class="w-[200px]"/>
      <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
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
              <th>客户简介</th>
              <th>客户状态</th>
              <th>客户电话</th>
              <th class="w-[172px]">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index">
              <td >{{ index+1 }}</td>
              <td v-if="Itemlist[index]">业务组</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">业务员</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">平台</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">平台账号</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">客户姓名</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">客户简介</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">客户状态</td>
              <td v-else></td>
              <td v-if="Itemlist[index]">客户电话</td>
              <td v-else></td>
              <td v-if="Itemlist[index]" class="flex justify-around items-center text-[#0B88F9]">
                <button @click="()=>showDeleteCheck(1)">删除</button>
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
  name: 'checks',
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
        if((this.$refs.useredit && `${this.$refs.useredit[0]}`==`${event.target}`) || this.$refs.dialog.$el.contains(event.target)){
        }else{
          this.showdialog=false;
        }
      }
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
          layer.close(i);
        },
      });
    },
    changepage(value){
      this.currentPage=value;
    },
    changegroup(value){
      console.log(value);
      this.group=value;
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