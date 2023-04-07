<template>
  <div class="w-full py-[9px] flex items-center gap-[17px] pl-[17px] bg-[#F9F9F9] shadow-md">
    <MyButton @onclick="()=>$router.push({ name: 'home' })" name="首页" :active="false"></MyButton>
     <MyButton name="人物包装" :active="false"></MyButton>
     <MyButton name="包装分类" :active="true"></MyButton>
  </div>
  <div class="flex flex-row gap-[6px] my-[30px] ml-[37px] ">
    <input type="text" placeholder="标题" class="border solid border-gray-300 p-2 rounded-[12px] w-[200px] h-[41px]">
    <IconMyButton icon="iconsearch" name="首页" ></IconMyButton>
    <IconMyButton ref="addbutton"  @onclick="()=>this.showdialog=true" icon="circleplus" name="添加包装" ></IconMyButton>
  </div>
  <div class="w-full px-[37px] mb-[106px]">
    <table class="w-full p-[1px]">
        <thead>
          <tr>
            <th class="w-[55px]">序号</th>
            <th class="w-[150px]">图片</th>
            <th>标题</th>
            <th>描述</th>
            <th>包装人数</th>
            <th>建组时间</th>
            <th class="w-[172px]">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td >{{ index+1 }}</td>
            <td class="flex justify-center" v-if="Itemlist[index]">
              <img class="w-[140px] h-[200px]" :src="Itemlist[index].photo">
            </td>
            <td v-else></td>
            <td v-if="Itemlist[index]">
            {{ Itemlist[index].title }}
            </td>
            <td v-else></td>
            <td class="" v-if="Itemlist[index]" v-html="Itemlist[index].description">
            </td>
            <td v-else></td>
            <td v-if="Itemlist[index]">{{Itemlist[index].viewers}}</td>
            <td v-else></td>
            <td v-if="Itemlist[index]">
              {{moment().utc(new Date()).local().format("yyyy-MM-DD") }}
            </td>
            <td v-else></td>
            <td v-if="Itemlist[index]" >
              <div class="flex justify-around items-center text-[#0B88F9]">
                <button ref="useredit"  @click="editUser(1)">编辑</button>
                <button @click="()=>{showDeleteGroup(1)}" >删除</button>
              </div>
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
name: 'characters',
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
  currentPage:1,
  totalPage:50,
  index:15,
  Itemlist:[
    {
      photo:'https://i.ibb.co/Xjwh9Rv/3.png',
      title:'最新养号方法',
      description:'<p style="color: blue;">上号前要把定位关闭，IG份额我还哦IG何物很尬iu额好哇</p>',
      viewers:159,
    },
    {
      photo:'https://i.ibb.co/Xjwh9Rv/3.png',
      title:'最新养号方法',
      description:'<p style="color: black;">上号前要把定位关闭，IG份额我还哦IG何物很尬iu额好哇</p>',
      viewers:159,
    },
    {
      photo:'https://i.ibb.co/Xjwh9Rv/3.png',
      title:'最新养号方法',
      description:'<p style="font-weight: bold;">上号前要把定位关闭，IG份额我还哦IG何物很尬iu额好哇</p>',
      viewers:159,
    }
  ],
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
  moment: function () {
      return moment;
  },
  handleClickOutside(event) {
    if(this.showdialog){
      if((this.$refs.useredit && `${this.$refs.useredit[0]}`==`${event.target}`) || this.$refs.addbutton.$el.contains(event.target) ||this.$refs.dialog.$el.contains(event.target)){
      }else{
        this.showdialog=false;
      }
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
  },
  editUser(value){
    this.showdialog=true
  },
}
})
</script>